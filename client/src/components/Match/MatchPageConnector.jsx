import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getMatchStatus} from "../../actions/game-actions/match-actions";
import MatchPage from "./MatchPage";

// Connect MatchPage component to Redux store and dispatch actions
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getMatchStatus}, dispatch);
};

// Connect MatchPage component to Redux store
export default connect(null, mapDispatchToProps)(MatchPage);
