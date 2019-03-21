import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: ""
  };
  componentDidMount() {
    const genres = [{ _id: 0, name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }
  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };
  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = this.state.movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = genre => {
    if (this.state.selectedGenre._id !== genre._id)
      this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedGenre: { _id: 0, name: "All Genres" },
      currentPage: 1
    });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn,
      searchQuery
    } = this.state;
    //filter data
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id !== 0)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    //Sort data
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    //Pagination
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, selectedGenre, searchQuery } = this.state;
    //filtering the movies based on genre selected
    const { totalCount, data } = this.getPageData();
    if (count === 0) return <p>There are no movies in the database</p>;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <Link
              to="/movies/new"
              className="btn btn-primary btn-block"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          </div>
          <div className="col-7">
            <p>Showing {totalCount} movies in the table</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={this.state.genres}
              textProperty="name"
              valueProperty="_id"
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreChange}
            />
          </div>
          <div className="col-7">
            <MoviesTable
              movies={data}
              onDelete={this.handleDelete}
              onClick={this.handleLike}
              onSort={this.handleSort}
              sortColumn={this.state.sortColumn}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
