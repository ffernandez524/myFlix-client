import Container from "react-bootstrap/Container";
import {Row, Col, Button} from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
    return (
      <Container fluid className="bg-light text-center">
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
        <Button onClick={onBackClick} className="back-button">Back</Button>
      </Container>
    );
  };