import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../actions/userActions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    this.props.logOut();
  }

  //logout function

  render() {
    return (
      <nav className="teal accent-4">
        <div className="nav-wrapper">
          {/* <a href="#" className="brand-logo">
            Logo
          </a> */}
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {!this.props.isAuthenticated
              ? [
                  <li key="login">
                    <Link to={"/Login"}>Login</Link>
                  </li>,
                  <li key="register">
                    <Link to={"/Register"}>Register</Link>
                  </li>
                ]
              : null}
            {this.props.isAuthenticated ? (
              <li>
                <a onClick={this.logOut}>Logout</a>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.userReducer.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  { logOut }
)(Header);
