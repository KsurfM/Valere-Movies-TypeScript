import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import AppContext from "../store/app-context";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BASE_IMG_URL, BASE_URL, API_KEY } from "../store/constants";

import { BsBookmarkStarFill } from "react-icons/bs";

function Navigation() {
  const [searchInput, setSearchInput] = useState();
  const [searchResults, setSearchResults] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const appCtx = useContext(AppContext);
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const navigate = useNavigate();
  const searchBarRef = useRef(null);
  let favouritesArray;

  const focusHandler = () => {
    setIsVisible(true);
  };
  // const blurHandler = () => {
  //   setIsVisible(false);
  // };

  const redirectToDetailsPageHandler = (id) => {
    navigate(`/${id}?`);
  };

  const searchHandler = async (event) => {
    setSearchInput(encodeURIComponent(event.target.value.trim()));

    if (searchInput) {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=1&include_adult=false`
      );
      const data = await response.json();
      setSearchResults(data);
    }
  };

  const fetchFavouritesDetailsHandler = useCallback(async () => {
    favouritesArray = [];
    for (const favourite of appCtx.favourites) {
      const response = await fetch(
        `${BASE_URL}/movie/${favourite}?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      favouritesArray.push(data);
    }
    setFavouriteMovies(favouritesArray);
  }, []);

  useEffect(() => {
    fetchFavouritesDetailsHandler();
  }, [appCtx.favourites, fetchFavouritesDetailsHandler]);

  return (
    <Fragment>
      <Navbar sticky="top" style={{ zIndex: "2" }} bg="light" expand="lg">
        <Container position="relative">
          <Navbar.Brand href="/">
            <h2>Valere Movies</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <div style={{ width: "150px" }}></div>
              <form className="d-flex m-auto" role="search">
                <input
                  onChange={searchHandler}
                  onFocus={focusHandler}
                  // onBlur={blurHandler}
                  className="form-control "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div ref={searchBarRef} style={{ width: "400px" }}></div>
                {searchResults && searchInput !== "" && isVisible && (
                  <div
                    className="position-absolute top-100  border rounded bg-light"
                    style={{
                      width: "600px",
                      maxHeight: "225px",
                      overflow: "scroll",
                    }}
                  >
                    {searchResults.results?.map((result) => (
                      <div className="border rounded" key={result.id}>
                        <img
                          className="thumbnail-image "
                          style={{ width: "50px" }}
                          src={`${BASE_IMG_URL}${result.poster_path}`}
                          alt="movie thumbnail"
                        />
                        &nbsp;&nbsp;
                        <button
                          className="btn btn-link text-dark text-decoration-none"
                          onClick={redirectToDetailsPageHandler.bind(
                            null,
                            result.id
                          )}
                        >
                          <strong>{result.title}</strong>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* <button className="btn btn-primary" type="submit">
                  Search
                </button> */}
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
