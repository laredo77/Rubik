import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUser } from "../../selectors/UserSelector";
import { setGameLevel } from "../../actions/single-competiton-actions/comp-actions";
import CompetitionMode from "./CompetitionMode";

const mapStateToProps = (state) => {
  const user = getUser(state);
  return { user };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setGameLevel }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompetitionMode);
