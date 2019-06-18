
import { connect } from "react-redux";
import QuizPage from "./QuizPage";

import { currentUserSelector } from "../../selectors/user";
import { gameSelector } from '../../selectors/game'
import { initGame } from '../../actions/gameActions';

const mapStateToProps = (state) => {
  return {
    currentUser: currentUserSelector(state),
    game: gameSelector(state)
  }
}

const mapDispatchToProps = { initGame };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizPage);
