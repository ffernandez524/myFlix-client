import {Row, Col, Container, Button} from "react-bootstrap";
import { useParams } from  "react-router";
import { Link } from "react-router-dom"
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({users, movies}) => {
    const { userId } = useParams();
    const user = users.find((u) => u.id === userId);
    const favorites = movies.filter(m => user.favorites.includes(m.id));
 
    return (
      <Container className="bg-light text-center">
        <Row className="mb-4 border w-100">
          <Col>Username: {user.username}</Col>
        </Row>
        <Row className="mb-4 border">
            <Col>Email: {user.email}</Col>
        </Row>
        <Row className="mb-4 border">
            <Col>Birthday: {user.birthday}</Col>
        </Row>
        <Row className="mb-4 border">
            <Col>Change Password</Col>
        </Row>
        <Row className="mb-4 border">
            <span>Favorites List</span>
            {favorites.map((fav) => (
                <Col className="mb-4" key={fav.id} md={3}>
                <MovieCard movie={fav} />
                </Col>
            ))}
        </Row>
        <Link to={`/`}>
          <button className="back-button">Back</button>
        </Link>
      </Container>
    );
};