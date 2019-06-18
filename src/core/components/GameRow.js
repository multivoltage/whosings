import React from 'react';

const GameRow = ({ date, points, maxSong, name }) => {

  const d = new Date(date);
  const hours = d.getHours() < 10 ? "0"+d.getHours() : d.getHours();
  const minutes = d.getMinutes() < 10 ? "0"+d.getMinutes() : d.getMinutes();
  const dateString = `${d.getUTCDate()}/${d.getMonth()+1} ${hours}:${minutes}`;

  return (
    <li className="gameRow">
      <span className="value value-name">{name}</span>
      <span className="value value-date">{dateString}</span>
      <span className="value value-points">{points}</span>
      <span className="value value-maxSong">{maxSong}</span>
      <span className="value value-perc">{Math.round(points*100/maxSong)}%</span>
    </li>
  )
}

export default GameRow
