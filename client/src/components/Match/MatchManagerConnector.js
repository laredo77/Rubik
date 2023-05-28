import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUser} from "../../selectors/UserSelector";
import {setMatch, joinMatch} from "../../actions/game-actions/match-actions";
import MatchManager from "./MatchManager";

// Map state to props
const mapStateToProps = (state) => {
    const user = getUser(state);
    return {user};
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setMatch, joinMatch}, dispatch);
};

// Connect the MatchManager component with Redux using mapStateToProps and mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(MatchManager);
