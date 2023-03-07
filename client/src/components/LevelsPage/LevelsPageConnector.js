import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUser } from "../../selectors/userSelector";
import { initNewGame } from "../../actions/teamplay-actions/new-game-action";
import LevelsPage from "./LevelsPage";

const mapStateToProps = (state) => {
  const user = getUser(state);
  return { user };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ initNewGame }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelsPage);
