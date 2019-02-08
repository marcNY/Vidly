import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberinstock: 0, rate: 0 },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberinstock: Joi.required()
      .number()
      .integer()
      .min(0)
      .max(99)
      .label("Number In Stock"),
    rate: Joi.required()
      .number()
      .min(0)
      .max(5)
      .label("Rate")
  };

  render() {
    const { match, history } = this.props;
    return (
      <div>
        <h1>Movie Form {match.params.id} </h1>
        {this.renderInput("title", "Title")}
        {this.renderInput("genre", "Genre")}
        {this.renderInput("numberinstock", "Number In Stock", "number")}
        {this.renderInput("rate", "Rate", "number")}
        {this.renderButton("Save")}
      </div>
    );
  }
}

// export default MovieForm;
// const MovieForm = ({ match, history }) => {
//   return (

//   );
// };

export default MovieForm;
