import { Fragment } from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BsBookmarkStarFill } from "react-icons/bs";
import classes from "./Navigaion.module.css";

function Navigation() {
  return (
    <Fragment>
      <Navbar bg="light" expand="lg">
        <Container>
          <Nav.Link href="/">Valere Movies</Nav.Link>
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

              <Nav.Link href="#Favourites">
                <strong>
                  <BsBookmarkStarFill size={20} /> Favourites
                </strong>
              </Nav.Link>
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
}

export default Navigation;
