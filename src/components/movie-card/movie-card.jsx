import { PropTypes } from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.title}
        </div>
            
    );
};

// Here is where we define all the props constraints
MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      genre: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string
      }),
      director: PropTypes.shape({
        name: PropTypes.string,
        bio: PropTypes.string,
        birth: PropTypes.string,
        death: PropTypes.string
      }),
      imagePath: PropTypes.string,
      featured: PropTypes.bool
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };