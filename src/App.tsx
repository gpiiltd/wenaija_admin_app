import React from "react";
import Router from "./Navigation/Router";
import store from "./state";
import { Provider } from "react-redux";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
      <Provider store={store}>
        <Router />
      </Provider>
  );
}

export default App;
