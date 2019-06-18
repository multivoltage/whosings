import React, { useState, useEffect } from "react";

const Track = ({ track, answer, bomber, }) => {

  const [clicked, setClicked] = useState(false)

  // enable buttons when render new track
  useEffect(() => {
    setClicked(false)
  }, [track])

  return (
    <div className={`track track#${track.track_id}`}>
      <p className="track--lyrics">{track.lyrics}</p>
      <div className="separator" />

      <div className="actions">
        {track.choices.map(artist => {
          const isCorrect = track.artist_name === artist;
          const classes = (isCorrect && bomber) ? "bomber" : "";

          return (<button disabled={clicked} className={classes} key={artist} onClick={() => {
            if (!clicked) {
              setClicked(true)
              answer(isCorrect)
            }
          }} >{artist}</button>)
        })}
      </div>

    </div>
  )
}

export default Track
