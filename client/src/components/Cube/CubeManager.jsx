import React, {Component} from "react";
import "./CubeManager.css";
import "babel-polyfill";
import Puzzle from "./Puzzle";
import {Provider, connect} from "react-redux";
import reducers from "../../reducers/CubeReducers";
import actionCreators from "../../actions/cube-actions";
import {createStore, bindActionCreators, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";

class CubeManager extends Component {
    constructor(props) {
        super(props);

        // Create a saga middleware for handling asynchronous actions
        const sagaMiddleware = createSagaMiddleware();

        // Create the Redux store with the combined reducers and apply the saga middleware
        this.CubeStore = createStore(reducers, applyMiddleware(sagaMiddleware));

        // Connect the Puzzle component to the Redux store and bind action creators
        this.Connected = connect(
            reducers,
            (dispatch) => ({
                actions: bindActionCreators(actionCreators, dispatch),
                controlsStatus: this.props.controlsStatus,
                isMatch: this.props.isMatch,
                user: this.props.user,
                id: this.props.id,
            })
        )(Puzzle);
    }

    render() {
        return (
            <div className="App">
                {/* Provide the Redux store to the connected components */}
                <Provider store={this.CubeStore}>
                    <this.Connected/>
                </Provider>
            </div>
        );
    }
}

export default CubeManager;
