import React from 'react'; 
import { Layer, Circle } from 'react-konva'; 
import { jointChildren, pivotMap } from '../data/bodyPartsJointsMap';

class JointLayer extends React.Component {
  // shouldComponentUpdate(nextProps, nextState) { // CAN UNCOMMENT AND ADD CONDITIONS TO PREVENT 
  //   return false;                               // RERENDERING JOINTS IF PERFORMANCE NEEDED
  // }

  state = {
    dragStartDist: {}
  }

  renderJoints = () => {
    const joints = this.props.joints;
    const jointElements = [];
    let i = 0; 
    
    for(let jointName in joints) {
      jointElements.push(this.buildJoint(++i, {name: jointName, ...joints[jointName]}))
    }
    return jointElements;
  }

  buildJoint = (key, {name, x, y}) => {
    return <Circle
      key={key}
      name={name}
      ref={name}
      x={x}
      y={y}
      radius={6}
      stroke='#666666'
      fill='#dddddd'
      strokeWidth={2}
      draggable={true}
      findPivot={this.findPivot}
      dragBoundFunc={this.dragBound}
      onDragMove={this.onDragMove}
      onDragStart={this.onDragStart}
      onDragEnd={this.onDragEnd}
      onMouseOver={this.onMouseOver}
      onMouseOut={this.onMouseOut}
    />;
  }
  
  onMouseOver = () => {
    document.body.style.cursor = 'pointer';
  }

  onMouseOut = () => {
    document.body.style.cursor = 'default';
  }

  onDragStart = (e) => {
    const {name, x, y} = e.target.attrs;
    if (name === 'footLeft' || name === 'footRight' || name === 'handLeft' || name === 'handRight' || name === 'headTop') {
      return false; 
    }

    const newState = {};
    jointChildren[name].forEach (child => {
      const distX = this.props.joints[child].x - x;
      const distY = this.props.joints[child].y - y;
      newState[child] = {x: distX, y: distY}; 
    });

    this.setState({
      dragStartDist: newState
    });
  }

  onDragEnd = () => {
    this.setState({
      dragStartDist: {}
    });
  }

  onDragMove = (e) => {
    const {name, x, y} = e.target.attrs;
    const dist = this.state.dragStartDist;

    jointChildren[name].forEach(child => {
      this.props.moveJoint(child, dist[child].x + this.props.joints[name].x, dist[child].y + this.props.joints[name].y);
    });

    this.props.moveJoint(name, x, y); 
  }

  findPivot = (jointName) => {
    if (jointName === 'pelvis') return false; 
    const pivot = pivotMap[jointName].pivot; 
    const pivotX = this.props.joints[pivot].x;
    const pivotY = this.props.joints[pivot].y;
    const radius = pivotMap[jointName].radius; 

    return {x: pivotX, y: pivotY, radius: radius}
  }

  dragBound = function(pos) {
    let newX, newY; 
    const pivot = this.attrs.findPivot(this.attrs.name);
    const scale = pivot.radius / Math.sqrt(Math.pow(pos.x - pivot.x, 2) + Math.pow(pos.y - pivot.y, 2));

    if(scale !== 1 && this.attrs.name !== 'pelvis') {
      return {
        y: Math.round((pos.y - pivot.y) * scale + pivot.y),
        x: Math.round((pos.x - pivot.x) * scale + pivot.x)
      }
    } else {

      if (pos.x < 5) {
        newX = 5;
      } else if (pos.x > 295) {
        newX = 295; 
      } else {
        newX = pos.x;
      }

      if (pos.y < 5) {
        newY = 5;
      } else if (pos.y > 295) {
        newY = 295;
      } else {
        newY = pos.y;
      }

      return {
        x: newX, 
        y: newY  
      }
    }
  }

  render() {
    return (
      <Layer>
        {this.renderJoints()}
      </Layer> 
    );
  }
}; 

export default JointLayer;