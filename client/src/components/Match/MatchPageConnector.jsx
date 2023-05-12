import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUser} from "../../selectors/UserSelector";
import {getMatchStatus} from "../../actions/game-actions/one-vs-one-actions";
import MatchPage from "./MatchPage";

const mapStateToProps = (state) => {
    const user = getUser(state);
    return {user};
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getMatchStatus}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchPage);
