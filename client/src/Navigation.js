import React, { useState, useEffect } from "react";
import {
  Navbar,
  Button,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Navigation({ user, setUser, setSearch, setFilterParameter }) {
  let history = useHistory();

  // logout fn
  function handleLogout() {
    fetch("/logout", {
      // request to delete session[:user_id]
      method: "DELETE",
    }).then((r) => {
      // resets the user state
      if (r.ok) {
        setUser(null);
        history.push("/home");
      }
    });
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Welcome {user.username}</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavDropdown title="Sort tutors by...">
                <NavDropdown.Item onClick={() => setFilterParameter("rating")}>
                  Rating
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => setFilterParameter("hourly_rate")}
                >
                  Hourly Rate (low to high)
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => setFilterParameter("number_of_reviews")}
                >
                  Number of Reviews
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Button onClick={handleLogout}>Logout</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
