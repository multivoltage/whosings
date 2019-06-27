import React from 'react'
import './style.scss'
import { withRouter } from 'react-router'
import Track from './Track'
import Progress from '../../components/Progress'

const Game = ({ game, location, answer }) => {
  const { songs, currentSongIndex, maxSong } = game
  const isBomber = location.search.includes('bomber=true')
  console.log('xxx', game)
  if (!game.songs) {
    return <section className="game" />
  }

  const track = songs[currentSongIndex]

  return (
    <div className="game">
      <header>
        track number <span className="track-number current">{currentSongIndex + 1}</span> of{' '}
        <span className="track-number max">{maxSong}</span>
        <div className="progress">
          <Progress maxTime={game.trackMs} intervalTime={200} track_id={track.track_id} />
        </div>
      </header>
      <div className="separator" />
      <Track track={track} bomber={isBomber} answer={answer} />
    </div>
  )
}

export default withRouter(Game)
