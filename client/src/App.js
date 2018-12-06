import React, { Component } from "react";
import "./App.css";
import { Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import { history } from "./actions/history";
import { Provider } from "react-redux";
import store from "./store";
import Register from "./components/Register";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import Header from "./components/header";
import authRoute from "./components/high order components/authRoute";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Header />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Register" component={Register} />
            <Route exact path="/Homepage" component={authRoute(Homepage)} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
