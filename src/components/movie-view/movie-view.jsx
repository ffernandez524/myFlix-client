export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director.Name}</span>
        </div>
        <div>
          <span>Director Bio: </span>
          <span>{movie.director.Bio}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.genre.Name}</span>
        </div>
        <div>
          <span>Genre Description: </span>
          <span>{movie.genre.Description}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };