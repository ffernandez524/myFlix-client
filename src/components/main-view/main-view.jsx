import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies ] = useState([]);
  
  useEffect(() => {
    fetch("https://cinenotesmovieapp.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            description: doc.Description,
            genre: doc.Genre,
            director: doc.Director,
            imagePath: doc.ImagePath,
            featured: doc.Featured
          };
        });
        
        setMovies(moviesFromApi);
      });
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}/>
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>
  } else {
    return (
      <div>
        {movies.map((movie) => (
          <MovieCard 
            key={movie._id} 
            movie={movie} 
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
          }}/>
        ))}
      </div>
    );
  }  
};