// this is not for localstorage but fot redux only
import {
  INIT_GAME,
  NEXT_SONG,
  END_GAME,
  STOP_GAME,
  ANSWER_OK,
} from "../actions/gameActions";

export const GAMES_STATE = ['stopped','running','ended'];

const game = (
  game = {
    state: GAMES_STATE[0],
    songs: [],
    currentSongIndex: 0,
    points: 0
  },
  action
) => {
  switch (action.type) {
    case INIT_GAME:
      return {
        ...action.payload,
        state: GAMES_STATE[1],
        currentSongIndex: 0,
        points: 0,
        date: Date.now()
      };
    case NEXT_SONG:
      return {
        ...game,
        currentSongIndex: action.payload.nextIndex,
        timerId: action.payload.timerId
      }
    case END_GAME:
      return {
        ...game,
        state: GAMES_STATE[2],
        saved: action.payload
      }
    case STOP_GAME:
      return {
        ...game,
        state: GAMES_STATE[0]
      }
    case ANSWER_OK:
      return {
        ...game,
        points: (game.points)+1
      }
    default:
      return game;
  }
};

export default game;
