import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUser} from "../../../selectors/UserSelector";
import {getGameState} from "../../../actions/game-actions/game-state-actions";
import LevelsPage from "./LevelsPage";
// import {startNewGameFunc} from "../../../actions/game-actions/new-game-action";
import {setMosaicMatch} from "../../../actions/game-actions/mosaic-actions";

const mapStateToProps = (state) => {
    const user = getUser(state);
    return {user};
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getGameState, setMosaicMatch}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelsPage);
