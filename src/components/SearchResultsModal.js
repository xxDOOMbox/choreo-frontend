import React from 'react'
import ModalWrapper from './ModalWrapper'
import { getAudioFeatures } from '../services/spotifyApi'
import { refreshToken } from '../services/choreoApi'
import '../style/SearchResultsModal.css'

class SearchResultsModal extends React.Component {

  getSong = (e) => {
    const songId = e.target.getAttribute('songid')
    const songTitle = e.target.getAttribute('songtitle')

    getAudioFeatures(songId, this.props.tokens.access)
    .then(json => {
      if (json.tempo) {
        this.props.setCurrentSong(songId, songTitle, json.tempo)
      } else {
        refreshToken(this.props.tokens.refresh).then(json => {
          if (json.access_token) {
            this.props.setAccessTokens(json.access_token, this.props.tokens.refresh)
          }
        })
      }
    })
    
    this.props.hideModal()
  }

  render() {
    const songs = this.props.songs.map((song,i) => {
      const artists = song.artists.slice(0,3).map(artist => artist.name).join(', ')
      return (
        <div key={i} className='tracks'>
          <p>{artists} - </p><h4>{song.name}</h4>
          <button onClick={this.getSong} songid={song.id} songtitle={song.name}>Play Song</button>
        </div>
      )
    })

    return (
      <ModalWrapper title='Search Results' width={800} showOk={false} {...this.props}>
        {songs}
      </ModalWrapper>
    )
  }
}

export default SearchResultsModal