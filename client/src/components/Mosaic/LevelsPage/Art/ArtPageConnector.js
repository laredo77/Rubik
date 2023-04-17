import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { uploadImagesFunc } from "../../../../actions/game-actions/upload-image-action";
import { getUser } from "../../../../selectors/UserSelector";
import ArtPage from "./ArtPage";

const mapStateToProps = (state) => {
    const user = getUser(state);
    return { user };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ uploadImagesFunc }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtPage);
