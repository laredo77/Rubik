import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addNewUser} from "../../actions/add-user-actions";
import LoginPage from "./LoginPage";

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({addNewUser}, dispatch);
};

export default connect(null, mapDispatchToProps)(LoginPage);
