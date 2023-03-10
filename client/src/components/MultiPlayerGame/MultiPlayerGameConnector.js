import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUser } from "../../selectors/userSelector";
import { modeListener } from "../../actions/add-user-actions";
import { joinGame } from "../../actions/multiplayer-actions/join-game-action";
import MultiPlayerGame from "./MultiPlayerGame";

const mapStateToProps = (state) => {
  const user = getUser(state);
  return { user };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ modeListener, joinGame }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiPlayerGame);
