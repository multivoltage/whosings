import React from 'react';
import './style.scss';
import GameRow from '../GameRow';

const ProfilePage = ({ mygames }) => {

  return (
    <div className="profilePage">

      {mygames.length>0 &&
        <React.Fragment>
        <h2 className="profilePage--title">MY GAMES</h2>

        <ul className="gamesList">
          <li className="gameRow legend">
            <span className="value legend--item">Date</span>
            <span className="value legend--item">Points</span>
            <span className="value legend--item">Tracks number</span>
            <span className="value legend--item">%</span>
          </li>
          {mygames
            .sort((prec,succ) => succ.date - prec.date)
            .map(game => <GameRow key={game.date} {...game} />)}
        </ul>
      </React.Fragment>
      }

      {mygames.length===0 &&
        <h2 className="profilePage--title">NO GAMES FOUND</h2>
      }

    </div>
  )
}


export default ProfilePage;
