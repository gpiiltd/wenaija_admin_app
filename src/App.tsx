import React from "react";
import Router from "./Navigation/Router";
import store from "./state";
import { Provider } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer />
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  );
}

export default App;
