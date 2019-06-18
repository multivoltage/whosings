
import { connect } from "react-redux";
import Header from "./Header";

import { gameSelector } from "../../selectors/game";
import { currentUserSelector } from "../../selectors/user";

import { showLoginLayer, signOut } from "../../actions/userActions";
import { requestEndGame, requestStopGame } from "../../actions/gameActions";

const mapStateToProps = (state) => {
  return {
    game: gameSelector(state),
    user: currentUserSelector(state)
  }
}

const mapDispatchToProps = { showLoginLayer, signOut, requestEndGame, requestStopGame };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
