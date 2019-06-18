import React, { useState, useEffect } from "react";
import './style.scss';
import { Line } from 'rc-progress';
import { withRouter } from "react-router";
import Track from './Track';
import Progress from '../../components/Progress';

const Game = ({ game, location, answer }) => {

  const { songs, availableArtist, currentSongIndex, maxSong } = game;
  const isBomber = location.search.includes('bomber=true')

  if(!game.songs){
    return (
      <section className="game">

      </section>
    )
  }

  const track = songs[currentSongIndex];

  return (
    <div className="game">
      <header>track number <span className="track-number current">{currentSongIndex+1}</span> of <span className="track-number max">{maxSong}</span>
        <div className="progress">
          <Progress maxTime={game.trackMs} intervalTime={200} track_id={track.track_id}/>
        </div>
      </header>
      <div className="separator" />
      <Track track={track} bomber={isBomber} answer={answer}/>
    </div>
  )
}

export default withRouter(Game);

