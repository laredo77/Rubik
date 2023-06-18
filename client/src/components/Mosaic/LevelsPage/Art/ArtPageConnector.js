import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUser} from "../../../../selectors/UserSelector";
import ArtPage from "./ArtPage";
import {markSolved} from "../../../../actions/game-actions/mark-solved-action";
import {getGameState} from "../../../../actions/game-actions/game-state-actions";

// Map state to props
const mapStateToProps = (state) => {
    // Get the user from the state using the getUser selector
    const user = getUser(state);
    return {user};
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            markSolved,
            getGameState,
        },
        dispatch
    );
};

// Connect the ArtPage component with Redux using mapStateToProps and mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(ArtPage);