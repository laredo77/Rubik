import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUser } from "../../selectors/UserSelector";
import { joinGame } from "../../actions/game-actions/join-game-action";
import Mosaic from "./Mosaic";

const mapStateToProps = (state) => {
  const user = getUser(state);
  return { user };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({joinGame }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Mosaic);
