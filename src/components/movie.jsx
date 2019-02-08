import React, { Component } from "react";

class Movie extends Component {
  state = { value: this.props.value };
  render() {
    console.log("state", this.state.value);
    const { title, genre, numberInStock, dailyRentalRate } = this.state.value;
    return (
      <tr>
        <td>{title}</td>
        <td>{genre.name}</td>
        <td>{numberInStock}</td>
        <td>{dailyRentalRate}</td>
        <button className="btn btn-danger m-*-auto">Delete</button>
      </tr>
    );
  }
}

export default Movie;
