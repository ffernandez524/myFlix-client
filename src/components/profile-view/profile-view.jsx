import { useState } from "react";
import {Row, Col, Container, Button, Form} from "react-bootstrap";
import { Link } from "react-router-dom"
import { MovieCard } from "../movie-card/movie-card";
import { useNavigate } from 'react-router-dom';

export const ProfileView = ({user, token, movies, addFavorite, delFavorite, updateUser, onLoggedOut }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();
  let userFavs = movies.filter(m => user.Favorites.includes(m.id))

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();
    
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };
    
    fetch(`https://cinenotesmovieapp.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`, "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Update response: ", res);
        if (res) {
          updateUser(res);
          alert("User profile successfully updated");
        } else {
          alert("Error updating user.");
        }
      })      
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  const deleteAccount = () => {

    if (!window.confirm("Really delete account?")) {
      return;
    }
    
    fetch(`https://cinenotesmovieapp.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.text())
      .then((res) => {
        console.log("Delete response: ", res);
        if (res) {
          updateUser([]);
          onLoggedOut();
          navigate("/login");
        } else {
          alert("Error deleting user.");
        }
      })      
      .catch((e) => {
        alert("Something went wrong");
      });
  }

  return (
    <Container>
      <Row className="mb-4 w-100">
        <Col md={6}>
          <h4>User Profile</h4>
          <b>Username:</b> {user.Username} <br/>
          <b>Email:</b> {user.Email} <br/>
          <b>Birthday:</b> {user.Birthday.substring(0, user.Birthday.indexOf('T'))} <br/>
          <Button variant="danger" className="ml-50" onClick={deleteAccount}>Delete Account</Button>
        </Col>
        <Col md={6}>
          <h4>Update Profile</h4>
          <form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    className="bg-light"
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                    required
                    minLength="3"
                    pattern="[a-zA-Z0-9]+"
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>New/Current Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    className="bg-light"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="3"
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    className="bg-light"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    minLength="3"
                />
            </Form.Group>
            <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    className="bg-light"
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                    minLength="3"
                />
            </Form.Group>          
            <Button variant="primary" type="submit">Submit</Button>
          </form>
        </Col>
      </Row>
      <Row className="mb-4 text-center">
          <h4>Favorites List</h4>
          {userFavs.length === 0 ? (
            <Col>No favorite movies!</Col>
          ) : (
            <>
              {userFavs.map((fav) => (
                <Col className="mb-4" key={fav.id} md={3}>
                  <MovieCard 
                    user={user} movie={fav}
                    addFavorite={addFavorite} delFavorite={delFavorite}  />
                </Col>
              ))}
            </>
          )}
      </Row>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </Container>
  );
};