import {
  AUTH_DO_LOGIN,
  AUTH_LOGGED_OK,
  AUTH_SIGN_OUT,
  SHOW_LOGIN_LAYER
} from "../actions/userActions";

const user = (
  currentUser = {
    name: "",
    loginLayerActive: false
  },
  action
) => {
  switch (action.type) {
    case AUTH_DO_LOGIN:
      return {
        ...currentUser,
        isLoadingLogin: true,
      };
    case SHOW_LOGIN_LAYER:
      return {
        ...currentUser,
        isLoadingLogin: false,
        loginLayerActive: action.payload
      }
    case AUTH_LOGGED_OK:
      return {
        ...action.payload
      }
    case AUTH_SIGN_OUT:
      return { name: "" }
    default:
      return currentUser;
  }
};

export default user;
