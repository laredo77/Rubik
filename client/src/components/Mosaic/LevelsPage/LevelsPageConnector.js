import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUser} from "../../../selectors/UserSelector";
import LevelsPage from "./LevelsPage";
import {setMosaicMatch} from "../../../actions/game-actions/mosaic-actions";

const mapStateToProps = (state) => {
    const user = getUser(state);
    return {user};
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setMosaicMatch}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelsPage);
