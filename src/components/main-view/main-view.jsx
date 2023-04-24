import { NavigationBar } from "../navigation-bar/navigation-bar";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";


import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies ] = useState([]);
  const [users, setUsers ] = useState([]);
  
  useEffect(() => {
    if (!token) {
      return;
    }

    /* Fetch list of movies from API */
    fetch("https://cinenotesmovieapp.herokuapp.com/movies", {
      method: "GET",
      headers: { 
        Authorization: ('Bearer ' + token) 
      },
    })
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

    /* Fetch list of users from API */
    fetch("https://cinenotesmovieapp.herokuapp.com/users", {
      method: "GET",
      headers: { 
        Authorization: ('Bearer ' + token) 
      },
    }).then((response) => response.json())
    .then((data) => {    
      const usersFromApi = data.map((doc) => {
        return {
          id: doc._id,
          username: doc.Username,
          email: doc.Email,
          birthday: doc.Birthday,
          favorites: doc.Favorites
        };
      });     
      setUsers(usersFromApi);      
    });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar 
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row>
        <Routes>
          {/* Displays signup page when clicked in navigation bar */}
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          {/* Displays login by default, or when user logs out */}
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}/>
                  </Col>
                )}
              </>
            }
          />
          {/* Profile View: View user info and allow changes */}
          <Route
            path="/users/:userId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" />
                ) : (
                  <Col>
                    <ProfileView users={users} movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          {/* MovieView: Displays movie details */}
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>Error finding movies!</Col>
                ) : (
                  <Col>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          {/* Home Page, displays lists of movies when user is logged in */}
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};