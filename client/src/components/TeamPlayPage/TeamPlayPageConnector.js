import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUser } from "../../selectors/userSelector";
import { modeListener } from "../../actions/add-user-actions";
import TeamPlayPage from "./TeamPlayPage";

const mapStateToProps = (state) => {
  const user = getUser(state);
  return { user };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ modeListener }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamPlayPage);
