
import { connect } from "react-redux";
import StatsPage from "./StatsPage";
import { AllGames } from '../../../ls';

const mapStateToProps = (state) => ({ games: AllGames() })

export default connect(
  mapStateToProps,
  null
)(StatsPage);
