
import { connect } from "react-redux";
import LoginLayer from "./LoginLayer";

import { currentUserSelector, loginLayerActiveSelector } from "../../selectors/user";
import { signIn, hideLoginLayer } from "../../actions/userActions";

const mapStateToProps = (state) => {
  return {
    currentUser: currentUserSelector(state),
    loginLayerActive: loginLayerActiveSelector(state)
  }
}

const mapDispatchToProps = { signIn, hideLoginLayer };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginLayer);
