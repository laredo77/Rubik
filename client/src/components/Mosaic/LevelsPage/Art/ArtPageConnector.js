import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {uploadImagesFunc} from "../../../../actions/game-actions/upload-image-action";
import {getUser} from "../../../../selectors/UserSelector";
import ArtPage from "./ArtPage";
import {markSolved} from "../../../../actions/game-actions/mark-solved-action";
import {getGameState} from "../../../../actions/game-actions/game-state-actions";


const mapStateToProps = (state) => {
    const user = getUser(state);
    return {user};
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({uploadImagesFunc, markSolved, getGameState}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtPage);
