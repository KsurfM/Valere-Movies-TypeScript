import { Fragment, useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import AppContext from "./store/app-context";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { BsBookmarkStarFill } from "react-icons/bs";

function Navigation() {
  const appCtx = useContext(AppContext);
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  let favouritesArray;
  const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";

  const fetchFavouritesDetailsHandler = async () => {
    favouritesArray = [];
    for (const favourite of appCtx.favourites) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${favourite}?api_key=d76141fc516005c4b21c33a7c4f13e2f&language=en-US`
      );
      const data = await response.json();
      favouritesArray.push(data);
      console.log(favouritesArray);
    }
    setFavouriteMovies(favouritesArray);
  };

  useEffect(() => {
    fetchFavouritesDetailsHandler();
  }, [appCtx.favourites]);

  return (
    <Fragment>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <h2>Valere Movies</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <form className="d-flex " role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-primary" type="submit">
                  Search
                </button>
              </form>

              <NavDropdown
                title={
                  <strong>
                    <BsBookmarkStarFill size={20} /> Favourites
                  </strong>
                }
                id="basic-nav-dropdown"
              >
                {favouriteMovies &&
                  favouriteMovies.map((favouriteMovie) => (
                    <NavDropdown.Item
                      key={favouriteMovie.id}
                      href={`${favouriteMovie.id}`}
                    >
                      <img
                        className="thumbnail-image"
                        style={{ width: "50px" }}
                        src={`${BASE_IMG_URL}${favouriteMovie.poster_path}`}
                        alt="movie thumbnail"
                      />
                      &nbsp;&nbsp;
                      <strong>{favouriteMovie.title}</strong>
                    </NavDropdown.Item>
                  ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
}

export default Navigation;
