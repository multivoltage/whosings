import { SetUser, GetGame, GetUser } from "../../ls";
import { requestEndGame } from './gameActions';
export const AUTH_DO_LOGIN = "AUTH_DO_LOGIN";
export const AUTH_LOGGED_OK = "AUTH_LOGGED_OK";
export const AUTH_SIGN_OUT = "AUTH_SIGN_OUT";
export const SHOW_LOGIN_LAYER = "SHOW_LOGIN_LAYER";

const authDoLogin = () => ({
  type: AUTH_DO_LOGIN
});

const authLoggedOk = (user) => ({
  type: AUTH_LOGGED_OK,
  payload: user
});


export const signIn = (name) => dispatch => {
  SetUser(name);

  // close login layer
  dispatch({
    type: SHOW_LOGIN_LAYER,
    payload: false
  })

  // dispatch user logged
  dispatch(authLoggedOk({ name, loginLayerActive: false }));
}

export const checkSelfLogin = () => dispatch => {
  const user = GetUser();
  if(user && user.name && user.name.length){
    // c'è un utente salvato
    dispatch(signIn(user.name));
  }

}

export const signOut = () => dispatch => {
  SetUser(null);
  dispatch({
    type: AUTH_SIGN_OUT
  })
  dispatch(requestEndGame());
}

export const showLoginLayer = () => dispatch => {
  dispatch({
    type: SHOW_LOGIN_LAYER,
    payload: true
  });
}

export const hideLoginLayer = () => dispatch => {
  dispatch({
    type: SHOW_LOGIN_LAYER,
    payload: false
  });
}
