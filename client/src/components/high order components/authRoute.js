import React, { Component } from "react";
import { connect } from "react-redux";

export default OriginalComponent => {
  class MixedComponent extends Component {
    componentDidMount() {
      if (!this.props.isAuthenticated && !this.props.jwtToken) {
        this.props.history.push("/login");
      }
    }
    componentDidUpdate() {
      if (!this.props.isAuthenticated && !this.props.jwtToken) {
        this.props.history.push("/login");
      }
    }
    render() {
      return <OriginalComponent />;
    }
  }
  const mapStateToProps = state => {
    return {
      isAuthenticated: state.userReducer.isAuthenticated
    };
  };

  return connect(mapStateToProps)(MixedComponent);
};
