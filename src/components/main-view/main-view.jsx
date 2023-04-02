import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies ] = useState([
    { 
      id: 1, 
      title: "Silence of the Lambs",
      genre: "Thriller",
      description: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer.',
      director: "Jonathan Demme",
    },
    { 
      id: 2, 
      title: "Guardians of the Galaxy",
      genre: "Action",
      description: "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.",
      director: "James Gunn"      
    },
    { 
      id: 3, 
      title: "Glass Onion",
      genre: "Thriller",
      description: "Famed Southern detective Benoit Blanc travels to Greece for his latest case.",
      director: "Rian Johnson"      
    },
    { 
      id: 4, 
      title: "Star Trek",
      genre: "Action",
      description: "The brash James T. Kirk tries to live up to his father's legacy with Mr. Spock keeping him in check as a vengeful Romulan from the future creates black holes to destroy the Federation one planet at a time.",
      director: "J.J. Abrams"      
    },
    { 
      id: 5, 
      title: "Rush Hour",
      genre: "Action",
      description: "A loyal and dedicated Hong Kong Inspector teams up with a reckless and loudmouthed L.A.P.D. detective to rescue the Chinese Consul's kidnapped daughter, while trying to arrest a dangerous crime lord along the way.",
      director: "Brett Ratner"      
    }
  ]);
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
            key={movie.id} 
            movie={movie} 
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
          }}/>
        ))}
      </div>
    );
  }  
};