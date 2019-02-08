import React, { Component } from "react";

const refdict = { true: "fa fa-heart", false: "fa fa-heart-o" };

class Like extends Component {
  state = {
    active: false
  };

  switch = () => {
    const active = !this.state.active;
    this.setState({ active });
  };

  render() {
    return (
      <i
        onClick={this.props.onLike}
        className={refdict[this.props.liked] || refdict[false]}
      />
    );
  }
}

export default Like;
