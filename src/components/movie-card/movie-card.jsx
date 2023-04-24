import React from "react";
import PropTypes from "prop-types";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>        
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">More Information</Button>
        </Link>
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