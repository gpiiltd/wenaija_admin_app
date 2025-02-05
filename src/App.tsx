import React from "react";
import Router from "./Navigation/Router";
import store from "./state";
import { Provider } from "react-redux";

function App() {
  return (
      <Provider store={store}>
        <Router />
      </Provider>
  );
}

export default App;
