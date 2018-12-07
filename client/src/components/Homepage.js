import React, { Component } from "react";
import { connect } from "react-redux";

class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  render() {
    return <div> WELCOME {this.props.user.email} </div>;
  }
}
const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};
export default connect(
  mapStateToProps,
  {}
)(Homepage);
