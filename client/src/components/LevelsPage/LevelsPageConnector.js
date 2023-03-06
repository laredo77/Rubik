import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { getUser } from "../../selectors/user-selector";
// import { smLoginUser } from "../../actions/sm-login-user-action";
// import LoginPage from "./LoginPage";
import LevelsPage from "./LevelsPage";

const mapStateToProps = (state) => {
  // const user = getUser(state);
  // return { user };
};

const mapDispatchToProps = (dispatch) => {
  // return bindActionCreators({ smLoginUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelsPage);
