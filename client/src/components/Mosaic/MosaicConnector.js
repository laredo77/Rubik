import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUser} from "../../selectors/UserSelector";
import Mosaic from "./Mosaic";
import {joinMosaicMatch} from "../../actions/game-actions/mosaic-actions";

// Map state to props
const mapStateToProps = (state) => {
    // Retrieve the user from the state using the getUser selector
    const user = getUser(state);
    return {user};
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({joinMosaicMatch}, dispatch);
};

// Connect the Mosaic component with Redux using mapStateToProps and mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(Mosaic);