import {connect} from "react-redux";
import {getUser} from "../../selectors/UserSelector";
import MainPage from "./MainPage";

// mapStateToProps function
const mapStateToProps = (state) => {
    // Retrieve the user from the state using the UserSelector
    const user = getUser(state);
    return {user};
};

// Connect the MainPage component with the Redux store
export default connect(mapStateToProps, null)(MainPage);
