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
  //const [userFavs, setUserFavorites] = useState([]);

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
      console.log(user.Favorites);
    });
  }, [token]);

  const updateUser = user => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const addFavorite = (movId) => {
    if(user.Favorites.includes(movId)) {
        console.log("Favorite already exists.")
    } else {
        fetch(`https://cinenotesmovieapp.herokuapp.com/users/${user.Username}/favorites/${movId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`, "Content-Type": "application/json"
            },
        }).then((res) => res.json())
        .then((res) => {
            console.log("Response: ", res);
            if (res) {
                updateUser(res);
                console.log("Movie added successfully to favorites.");
            } else {
                alert("Error adding movie to favorites!");
            } 
        }).catch((e) => {
            alert("Something went wrong");
        });
    }
  }

  const delFavorite = (movId) => {  
    if(!user.Favorites.includes(movId)) {
        console.log("Movie does not exist in favorites.")
    } else {
        
        fetch(`https://cinenotesmovieapp.herokuapp.com/users/${user.Username}/favorites/${movId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`, "Content-Type": "application/json"
            },
        }).then((res) => res.json())
        .then((res) => {
            console.log("Response: ", res);
            if (res) {                       
                updateUser(res);
                console.log("Movie deleted successfully from favorites.");
            } else {
                alert("Error deleting movie from favorites!");
            } 
        }).catch((e) => {
            alert("Something went wrong");
        });
    }
  }

  
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
                  <Col md={6}>
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
                    <ProfileView 
                      user={user} token={token} movies={movies}
                      addFavorite={addFavorite} delFavorite={delFavorite} 
                      updateUser={updateUser}/>
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
                        <MovieCard                          
                          user={user} movie={movie}
                          addFavorite={addFavorite} delFavorite={delFavorite}  />
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