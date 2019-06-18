
import { connect } from "react-redux";
import ProfilePage from "./ProfilePage";
import { GetGamesPlayer } from '../../../ls';
import { currentUserSelector } from "../../selectors/user";

const mapStateToProps = (state) => {

  const currentUser = currentUserSelector(state);

  return {
    mygames: GetGamesPlayer(currentUser.name)
  }
}

export default connect(
  mapStateToProps,
  null
)(ProfilePage);
