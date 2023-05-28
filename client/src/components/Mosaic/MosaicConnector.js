import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUser} from "../../selectors/UserSelector";
import Mosaic from "./Mosaic";
import {joinMosaicMatch} from "../../actions/game-actions/mosaic-actions";

const mapStateToProps = (state) => {
    const user = getUser(state);
    return {user};
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({joinMosaicMatch}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Mosaic);
