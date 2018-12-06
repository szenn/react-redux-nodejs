import React, { Component } from "react";
import { connect } from "react-redux";
import { signUpUser } from "../../actions/userActions";
import { history } from "../../actions/history";

class SignUp extends Component {
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
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signUpUser(this.state);

    // history.push("/login");

    // this.props.dispatch(addItem(this.state))
    //
    // const { dispatch } = this.props;
    // if (user.firstName && user.lastName && user.username && user.password) {
    //     dispatch(userActions.register(user));
    // }
  }

  render() {
    return (
      <div className="container" style={{ height: "100vh" }}>
        <div className="row h-100 justify-content-center align-items-center">
          <form className="col-sm-6">
            <div className="form-group">
              <input
                className="form-control"
                value={this.state.firstname}
                onChange={this.handleChange}
                type="text"
                name="firstname"
                placeholder="firstname"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                value={this.state.lastname}
                onChange={this.handleChange}
                type="text"
                name="lastname"
                placeholder="lastname"
              />
            </div>
            <div className="form-group ">
              <input
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                className="form-control"
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="text-center">
              <button
                className="btn btn-primary"
                style={{ width: "14rem" }}
                onClick={this.handleSubmit}
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// export default SignUp;

export default connect(
  null,
  { signUpUser }
)(SignUp);
