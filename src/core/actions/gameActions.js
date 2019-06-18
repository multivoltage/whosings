/***************************************************************/
import { UpdateMatches } from '../../ls';
import { buildSchema } from '../../api';

export const INIT_GAME = 'INIT_GAME';
export const NEXT_SONG = 'NEXT_SONG';
export const END_GAME = 'END_GAME';
export const STOP_GAME = 'STOP_GAME';
export const ANSWER_OK = "ANSWER_OK";

const nextSong = (timerId, nextIndex) => ({
  type: NEXT_SONG,
  payload: {
    timerId,
    nextIndex
  }
});

const startTimer = (trackMs) => async (dispatch, getState) => {

  var id = setTimeout(() => {
    const { game, user } = getState()

    if (game.currentSongIndex >= (game.maxSong - 1)) {

      dispatch({
        type: END_GAME,
        payload: true
      })
      // save to ls
      UpdateMatches(user.name, game)
    } else {

      dispatch(nextSong(window._whoTimedId, (game.currentSongIndex + 1)))
      dispatch(startTimer(trackMs))
    }
  }, trackMs)
  window._whoTimedId = id
}

export const initGame = (maxSong,trackMs) => async (dispatch, getState) => {

  var initialGame = {
    ...await buildSchema(),
    maxSong,
    currentSongIndex: 0,
    trackMs
  }

  dispatch({
    type: INIT_GAME,
    payload: initialGame,
  })

  dispatch(startTimer(window.ciccio === true ? 1000*60*60 : trackMs))
}

export const requestEndGame = () => async (dispatch, getState) => {

  const { game } = getState();

  if (game) {
    clearTimeout(window._whoTimedId)
    dispatch({
      type: END_GAME,
      payload: false
    })
  }
}

export const requestStopGame = () => async (dispatch,getState) => {
  dispatch({
    type: STOP_GAME
  })
}

export const answer = (correct = false) => async (dispatch, getState) => {

  //clearTimer()
  correct && dispatch({
    type: ANSWER_OK
  })

  const { game, user } = getState()

  if (game.currentSongIndex >= game.maxSong - 1) {
    // game da finire
    clearTimeout(window._whoTimedId)
    dispatch({
      type: END_GAME,
      payload: true
    })
    // save to ls
    UpdateMatches(user.name, game)
  } else {
    clearTimeout(window._whoTimedId)
    dispatch(nextSong(window._whoTimedId, game.currentSongIndex + 1))
    dispatch(startTimer(game.trackMs))
  }

}
