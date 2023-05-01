import {Row, Col, Container, Button} from "react-bootstrap";
import { useParams } from  "react-router";
import { Link } from "react-router-dom"

export const MovieView = ({ movies, updateUser }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  updateUser={updateUser}
    return (
      <Container className="bg-light text-center">
        <Row className="mb-4 border w-100">
          <Col>Title: {movie.title}</Col>
          <Col>Description: {movie.description}</Col>
        </Row>
        <Row className="mb-4 border">
          <Col>Director: {movie.director.Name} </Col>
          <Col>Director Bio: {movie.director.Bio}</Col>
        </Row>
        <Row className="mb-4 border">
          <Col>Genre: {movie.genre.Name}</Col>
          <Col>Genre Description: {movie.genre.Description}</Col>
        </Row>
        <Link to={`/`}>
          <button className="back-button">Back</button>
        </Link>
      </Container>
    );
  };