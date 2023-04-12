import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { uploadImagesFunc } from "../../../../actions/game-actions/upload-image-action";
import Art1 from "./Art1";

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ uploadImagesFunc }, dispatch);
};

export default connect(null, mapDispatchToProps)(Art1);
