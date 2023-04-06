import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUser } from "../../selectors/UserSelector";
import { setMatch } from "../../actions/game-actions/one-vs-one-actions";
import MatchManager from "./MatchManager";

const mapStateToProps = (state) => {
  const user = getUser(state);
  return { user };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setMatch }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchManager);
