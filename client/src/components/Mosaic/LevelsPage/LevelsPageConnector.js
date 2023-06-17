import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUser} from "../../../selectors/UserSelector";
import LevelsPage from "./LevelsPage";
import {setMosaicMatch} from "../../../actions/game-actions/mosaic-actions";

// Map state to props
const mapStateToProps = (state) => {
    const user = getUser(state);
    return {user};
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setMosaicMatch}, dispatch);
};

// Connect the LevelsPage component with Redux using mapStateToProps and mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(LevelsPage);
