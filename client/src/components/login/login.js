import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/userActions";
import Errormessage from '../errormessage';

import "./login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    e.preventDefault();

      this.props.loginUser(this.state);


  }

  render() {

    return (
      
      <div className="form-container">
      <Errormessage />
        <div className="wrapper">
          <form action="">
            <h1> Welcome </h1> <p> Please log in </p>
            <input
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              name="password"
              placeholder="Password"
            />
            <button type="submit" onClick={this.handleSubmit}>
              Login{" "}
            </button>{" "}
          </form>{" "}
        </div>{" "}
      </div>
    );
  }
}



export default connect(
  null,
  { loginUser }
)(Login);
