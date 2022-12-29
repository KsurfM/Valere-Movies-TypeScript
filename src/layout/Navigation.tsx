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

interface searchResultsInterface {
  page: number;
  results?: {
    adult: boolean;
    backdrop_path?: string;
    genre_ids?: number[];
    id: number;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path?: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
}
interface Favourites {
  adult: false;
  backdrop_path: string;
  belongs_to_collection?: any;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Navigation: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>();
  const [searchResults, setSearchResults] = useState<searchResultsInterface>();
  const [isVisible, setIsVisible] = useState(false);
  const appCtx = useContext(AppContext);
  const [favouriteMovies, setFavouriteMovies] = useState<Favourites[]>([]);
  const navigate = useNavigate();
  const searchBarRef = useRef(null);
  let favouritesArray: Favourites[] = [];

  const focusHandler = () => {
    setIsVisible(true);
  };
  const blurHandler = () => {
    setIsVisible(false);
  };

  const redirectToDetailsPageHandler = (id: number) => {
    navigate(`/${id}?`);
  };

  const searchHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
    if (appCtx.favourites !== null) {
      for (const favourite of appCtx.favourites) {
        const response = await fetch(
          `${BASE_URL}/movie/${favourite}?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        favouritesArray.push(data);
      }
    }
    setFavouriteMovies(favouritesArray);
  }, [appCtx.favourites]);

  useEffect(() => {
    fetchFavouritesDetailsHandler();
  }, [appCtx.favourites, fetchFavouritesDetailsHandler]);

  return (
    <Fragment>
      <Navbar sticky="top" style={{ zIndex: "2" }} bg="light" expand="lg">
        <Container>
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
                  onBlur={blurHandler}
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
                          onMouseDown={redirectToDetailsPageHandler.bind(
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
                {!favouriteMovies ||
                  (favouriteMovies.length === 0 && (
                    <div className="px-3">
                      Favorite a movie to see something here!
                    </div>
                  ))}
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
};

export default Navigation;
