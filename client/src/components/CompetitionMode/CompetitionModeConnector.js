import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUser } from "../../selectors/UserSelector";
import { modeListener } from "../../actions/add-user-actions";
import { setGameLevel } from "../../actions/single-competiton-actions/comp-actions";
import CompetitionMode from "./CompetitionMode";

const mapStateToProps = (state) => {
  const user = getUser(state);
  return { user };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ modeListener, setGameLevel }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompetitionMode);
