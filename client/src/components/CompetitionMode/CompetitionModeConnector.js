import {connect} from "react-redux";
import {getUser} from "../../selectors/UserSelector";
import CompetitionMode from "./CompetitionMode";

const mapStateToProps = (state) => {
    const user = getUser(state);
    return {user};
};

export default connect(mapStateToProps, null)(CompetitionMode);
