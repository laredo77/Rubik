import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUser } from "../../selectors/userSelector";
import MainPage from "./MainPage";

const mapStateToProps = (state) => {
  const user = getUser(state);
  return { user };
};

// const mapDispatchToProps = dispatch => {
//     return bindActionCreators({ func }, dispatch);
// };

export default connect(mapStateToProps, null)(MainPage);
