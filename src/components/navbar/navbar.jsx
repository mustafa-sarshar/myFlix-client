// Import Libs
import React from "react";

// Import Custom Styles
import "./navbar.scss";

// Import Bootstrap Components
import { Navbar, Container, Nav, Button } from "react-bootstrap";

const MenuBar = ({ user }) => {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };
  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar
      className="main-nav"
      sticky="top"
      bg="dark"
      expand="lg"
      variant="dark"
    >
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">
          Musto Flix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Nav.Link href={`/users/${user}`}>
                Signed in as: <span className="navbar__username">{user}</span>{" "}
              </Nav.Link>
            )}
            {isAuth() && (
              <Button
                variant="link"
                onClick={() => {
                  onLoggedOut();
                }}
              >
                Logout
              </Button>
            )}
            {!isAuth() && <Nav.Link href="/">Sign-in</Nav.Link>}
            {!isAuth() && <Nav.Link href="/register">Sign-up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MenuBar;
