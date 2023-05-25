import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUser} from "../../selectors/UserSelector";
import {setMatch, joinMatch} from "../../actions/game-actions/match-actions";
import MatchManager from "./MatchManager";

const mapStateToProps = (state) => {
    const user = getUser(state);
    return {user};
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setMatch, joinMatch}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchManager);
