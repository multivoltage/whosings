import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import './style.scss';
import GameWrapper from '../../components/Game/GameWrapper';
import ReactLoading from 'react-loading';
import { DEFAULT_TIME_FOR_TRACK } from '../../../api';

const QuizPage = ({ currentUser, game, initGame }) => {

  const defaultMaxSong = 3; // this is only for fallback
  const [maxSong, setMaxSong] = useState(defaultMaxSong)
  const [trackMs, setTrackMs] = useState(DEFAULT_TIME_FOR_TRACK)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(game.state === 'running' && loading){
      setLoading(false)
    }
  },[game])


  if(!currentUser.name.length)
    return <Redirect to="/"/>

  return (
    <div className="quizPage">

      {loading &&
        <div className="loadingview">
          <h2 className="quizPage--title">Loading game...</h2>
          <ReactLoading type="bars" color="#009688" height={150} width={200} />
        </div>
      }

      {game.state === 'stopped' &&
        <React.Fragment>
          <h2 className="quizPage--title">INSTRUCTIONS</h2>
          <p className="quizPage--desc">You will have N questions and for each question you have to click on the correct artist according to the proposed song</p>

          <div className="quizPage--content">
            <span className="contentItem">Tracks: Min 1 max 20</span>
            <span className="contentItem contentItem-input">
              <span className={`input-error ${(maxSong > 0 && maxSong <= 20) ? '' : 'visible'}`}>check tracks number</span>
              <input type="number" min="1" max="20" placeholder={defaultMaxSong} onChange={({ target }) => {
                const value = Number(target.value);
                setMaxSong(value);
              }} />
            </span>
            <span className="contentItem">Seconds track: Min 2 max 10</span>
            <span className="contentItem contentItem-input">
              <span className={`input-error ${(trackMs >= 2000 && trackMs <= 10000) ? '' : 'visible'}`}>check tracks second</span>
              <input type="number" min="2" max="10" placeholder={Math.round(DEFAULT_TIME_FOR_TRACK/1000)} onChange={({ target }) => {
                const value = Number(target.value);
                setTrackMs(value*1000);
              }} />
            </span>
            <button className="contentItem contentItem--fw" onClick={() => {
              if(maxSong > 0 && maxSong <= 20 && trackMs >= 2000 && trackMs <= 10000){
                setLoading(true);
                initGame(maxSong,trackMs)
              }}}>START</button>
          </div>
        </React.Fragment>
      }

      {game.state === 'running' &&
        <div className="quizPage--content">
          <GameWrapper />
        </div>
      }

      {game.state === 'ended' &&
        <React.Fragment>
          {game.saved && <h2 className="quizPage--title">Game ended with {game.points} points on {game.maxSong} tracks</h2>}
          {!game.saved && <h2 className="quizPage--title">Game ended without save any points</h2>}
          {game.saved && <button className="btn-restart" onClick={() => {
            if(maxSong > 0 && maxSong){
              setLoading(true);
              initGame(maxSong,game.trackMs)
            }
          }}>START AGAIN</button>}
        </React.Fragment>
      }
    </div>
  )
}


export default QuizPage;
