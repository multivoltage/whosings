
import { connect } from "react-redux";
import Game from "./Game";

import { gameSelector } from "../../selectors/game";
import { answer } from "../../actions/gameActions";

const mapStateToProps = (state) => {
  return {
    game: gameSelector(state),
  }
}

const mapDispatchToProps = { answer };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
