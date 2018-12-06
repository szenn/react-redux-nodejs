import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions/userActions";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.isAuthenticated) this.props.history.push("/homepage");
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.registerUser(this.state);
  }

  render() {
    return (
      <div className="container valign-wrapper">
        <div className="row center-align center">
          <form className="card hoverable">
            <div className="card-content">
              {" "}
              {this.props.errorMessage ? (
                <div className="card-panel red-text">
                  {" "}
                  {this.props.errorMessage}{" "}
                </div>
              ) : null}{" "}
              <div className="input-field col s12">
                <input
                  value={this.state.firstname}
                  onChange={this.handleChange}
                  type="text"
                  name="firstname"
                />
                <label className="active"> Firstname </label>{" "}
              </div>{" "}
              <div className="input-field col s12">
                <input
                  value={this.state.lastname}
                  onChange={this.handleChange}
                  type="text"
                  name="lastname"
                />
                <label className="active"> Lastname </label>{" "}
              </div>{" "}
              <div className="input-field col s12">
                <input
                  value={this.state.email}
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                />
                <label className="active"> Email </label>{" "}
              </div>{" "}
              <div className="input-field col s12">
                <input
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                />
                <label className="active"> Password </label>{" "}
              </div>{" "}
              <button
                className="btn waves-effect waves-light "
                onClick={this.handleSubmit}
                type="submit"
              >
                Register{" "}
              </button>{" "}
            </div>{" "}
          </form>{" "}
        </div>{" "}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.userReducer.isAuthenticated,
    errorMessage: state.userReducer.errorMessage
  };
};

export default connect(
  mapStateToProps,
  {
    registerUser
  }
)(Register);
