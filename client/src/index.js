import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import ReactDOM from "react-dom";
import "./index.css";

// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
//
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//     <BrowserRouter>
//         <Provider store={store}>
//             <App />
//         </Provider>
//     </BrowserRouter>
// );

ReactDOM.render(
  <div>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </div>,
  document.getElementById("root")
);
