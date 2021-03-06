import React from 'react';

const ModalWrapper = props => {
  const handleBackgroundClick = e => {
    if (e.target === e.currentTarget) props.hideModal();
  };

  const onOk = () => {
    props.onOk();
    props.hideModal();
  };

  const okButton = props.showOk
    ? (
      <button
        onClick={onOk}
        disabled={props.okDisabled}
      >
        {props.okText}
      </button>
    ) : null;

  return (
    <div className='modal' onClick={handleBackgroundClick}>
      <div className='modal-content' style={{width: props.width}}>
        <header>
          <h1>{props.title}</h1>

          {/*<button className='close' onClick={props.hideModal}>x</button>*/}
        </header>

        {props.children}

        {okButton}
      </div>
    </div>
  );
};

ModalWrapper.defaultProps = {
  title: '',
  showOk: true,
  okText: 'OK',
  okDisabled: false,
  width: 400,
  onOk: () => {}
};

export default ModalWrapper;