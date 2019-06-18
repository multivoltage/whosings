import React from 'react';
import './style.scss';
import GameRow from '../GameRow';


const getTopGameForName = (name, allgames) => {
  var games = allgames.filter(game => game.name === name);

  return games.reduce((prev, curr) => {
    const pPrev = Math.round(prev.points * 100 / prev.maxSong);
    const pSucc = Math.round(curr.points * 100 / curr.maxSong);
    return pPrev > pSucc ? prev : curr
  })
}

const StatsPage = ({ games = [] }) => {

  const names = Array.from(new Set(games.map(g => g.name)));
  const topGames = names.map(n => getTopGameForName(n, games))
    .sort((p, s) => (s.points * 100 / s.maxSong) - p.points * 100 / p.maxSong);

  const showGame = topGames.length > 0;

  return (
    <div className="statsPage">
      <h2 className="statsPage--title">{showGame ? 'TOP GAMES' : 'NO GAMES FOUND'}</h2>

      {showGame &&
        <ul className="gamesList">
          <li className="gameRow legend">
            <span className="value legend--item">Name</span>
            <span className="value legend--item">Date</span>
            <span className="value legend--item">Points</span>
            <span className="value legend--item">Tracks number</span>
            <span className="value legend--item">%</span>
          </li>
          {topGames
            .map(game => <GameRow key={game.date} {...game} />)}
        </ul>
      }
    </div>
  )
}


export default StatsPage;
