import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUser } from "../../selectors/UserSelector";
import { initNewGame } from "../../actions/game-actions";
import LevelsPage from "./LevelsPage";

const mapStateToProps = (state) => {
  const user = getUser(state);
  return { user };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ initNewGame }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelsPage);
