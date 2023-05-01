import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ user, addFavorite, delFavorite, movie }) => {
  return (
    <Card className="h-100 text-center">
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>        
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">More Information</Button>
        </Link>
        { user.Favorites.find((fav) => fav === movie.id) ? (
          <Button variant="primary"
            onClick={() => delFavorite(movie.id)}>
              Remove from Favorites
          </Button>
        ) : (
          <Button 
            variant="primary"
            onClick={() => addFavorite(movie.id)}>
              Add to Favorites
          </Button>
        )}        
      </Card.Body>
      <Card.Body>
        <ListGroup className="position-relative bottom-0"> 
          <ListGroupItem>Genre: {movie.genre.Name}</ListGroupItem>
          <ListGroupItem>Director: {movie.director.Name}</ListGroupItem>
        </ListGroup>
      </Card.Body>      
    </Card>            
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
};