import React, { Component } from "react";
import "./CubeManager.css";
import "babel-polyfill";
import Puzzle from "./Puzzle";
import { Provider, connect } from "react-redux";
import reducers from "../../reducers/CubeReducers";
import actionCreators from "../../actions/cube-actions";
import { createStore, bindActionCreators, applyMiddleware } from "redux";

import createSagaMiddleware from "redux-saga";

class CubeManager extends Component {
  constructor(props) {
    super(props);
    const sagaMiddleware = createSagaMiddleware();
    this.CubeStore = createStore(reducers, applyMiddleware(sagaMiddleware));
    this.Connected = connect(reducers, (dispatch) => ({
      actions: bindActionCreators(actionCreators, dispatch), controlsStatus: this.props.controlsStatus,
      isMatch: this.props.isMatch, user: this.props.user
    }))(Puzzle);
  }


  render() {
    return (
      <div className="App">
        <Provider store={this.CubeStore}>
          <this.Connected />
        </Provider>
      </div>
    );
  }
}

export default CubeManager;
