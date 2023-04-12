import "./MainPage.css";
import * as React from "react";

function MainPageAnimation() {

    return (
        <div className='container'>
            <div className='rubiks-cube'>
                <div className='top-clone'>
                    <div className='column-face top clone-left'>
                        <div className='left-one'></div>
                        <div className='left-two'></div>
                        <div className='left-three'></div>
                    </div>
                    <div className='column-face top clone-middle'>
                        <div className='middle-one'></div>
                        <div className='middle-two'></div>
                        <div className='middle-three'></div>
                    </div>
                    <div className='column-face top clone-right'>
                        <div className='right-one'></div>
                        <div className='right-two'></div>
                        <div className='right-three'></div>
                    </div>
                </div>
                <div className='top-row'>
                    <div className='row-face front'>
                        <div className='front-one'></div>
                        <div className='front-two'></div>
                        <div className='front-three'></div>
                    </div>
                    <div className='row-face left'>
                        <div className='left-one'></div>
                        <div className='left-two'></div>
                        <div className='left-three'></div>
                    </div>
                    <div className='row-face back'>
                        <div className='back-one'></div>
                        <div className='back-two'></div>
                        <div className='back-three'></div>
                    </div>
                    <div className='row-face right'>
                        <div className='right-one'></div>
                        <div className='right-two'></div>
                        <div className='right-three'></div>
                    </div>
                </div>
                <div className='middle-row'>
                    <div className='row-face front'>
                        <div className='front-one'></div>
                        <div className='front-two'></div>
                        <div className='front-three'></div>
                    </div>
                    <div className='row-face left'>
                        <div className='left-one'></div>
                        <div className='left-two'></div>
                        <div className='left-three'></div>
                    </div>
                    <div className='row-face back'>
                        <div className='back-one'></div>
                        <div className='back-two'></div>
                        <div className='back-three'></div>
                    </div>
                    <div className='row-face right'>
                        <div className='right-one'></div>
                        <div className='right-two'></div>
                        <div className='right-three'></div>
                    </div>
                </div>
                <div className='bottom-row'>
                    <div className='row-face right'>
                        <div className='right-one'></div>
                        <div className='right-two'></div>
                        <div className='right-three'></div>
                    </div>
                    <div className='row-face left'>
                        <div className='left-one'></div>
                        <div className='left-two'></div>
                        <div className='left-three'></div>
                    </div>
                </div>
                <div className='left-column'>
                    <div className='column-face front'>
                        <div className='front-one'></div>
                        <div className='front-two'></div>
                        <div className='front-three'></div>
                    </div>
                    <div className='column-face back'>
                        <div className='back-one'></div>
                        <div className='back-two'></div>
                        <div className='back-three'></div>
                    </div>
                    <div className='column-face bottom'>
                        <div className='bottom-one'></div>
                        <div className='bottom-two'></div>
                        <div className='bottom-three'></div>
                    </div>
                </div>
                <div className='middle-column'>
                    <div className='column-face front'>
                        <div className='front-one'></div>
                        <div className='front-two'></div>
                        <div className='front-three'></div>
                    </div>
                    <div className='column-face top'>
                        <div className='top-one'></div>
                        <div className='top-two'></div>
                        <div className='top-three'></div>
                    </div>
                    <div className='column-face back'>
                        <div className='back-one'></div>
                        <div className='back-two'></div>
                        <div className='back-three'></div>
                    </div>
                    <div className='column-face bottom'>
                        <div className='bottom-one'></div>
                        <div className='bottom-two'></div>
                        <div className='bottom-three'></div>
                    </div>
                </div>
                <div className='right-column'>
                    <div className='column-face front'>
                        <div className='front-one'></div>
                        <div className='front-two'></div>
                        <div className='front-three'></div>
                    </div>
                    <div className='column-face back'>
                        <div className='back-one'></div>
                        <div className='back-two'></div>
                        <div className='back-three'></div>
                    </div>
                    <div className='column-face bottom'>
                        <div className='bottom-one'></div>
                        <div className='bottom-two'></div>
                        <div className='bottom-three'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPageAnimation;
