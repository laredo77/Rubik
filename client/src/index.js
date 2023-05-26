import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store";
import App from "./App";
import ReactDOM from "react-dom";
import "./index.css";

ReactDOM.render(
    <div>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </div>,
    document.getElementById("root")
);
