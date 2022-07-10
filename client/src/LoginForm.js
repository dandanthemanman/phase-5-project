import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [revealSignup, setRevealSignup] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  console.log(revealSignup);

  let history = useHistory();

  function handleSignup(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      //   sets loading state
      setIsLoading(false);
      //   if data is good, convert to json and set the user state
      if (r.ok) {
        r.json().then((userData) => setUser(userData));
        //  if data is bad, convert to json and set the error state
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  function handleLogin(e) {
    e.preventDefault();
    // connects to login in backend
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      // if userdata is good, set user state
      if (r.ok) {
        r.json()
          .then((userData) => setUser(userData))
          .then(() => {
            history.push("/home");
          });
      } else {
        // if userdata is bad, set error state
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  // conditionally render login/signup form
  if (!revealSignup) {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            onChange={(e) => {
              e.preventDefault();
              setUsername(e.target.value);
              console.log(username);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
              console.log(password);
            }}
          />
        </Form.Group>
        <Button onClick={handleLogin} variant="primary" type="submit">
          Submit
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setRevealSignup(!revealSignup);
          }}
        >
          Signup
        </Button>
        <Form.Group>
          <h2>login errors: {errors}</h2>
        </Form.Group>
      </Form>
    );
  }
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="username"
          placeholder="Enter username"
          onChange={(e) => {
            e.preventDefault();
            setUsername(e.target.value);
            console.log(username);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
            console.log(password);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm password"
          onChange={(e) => {
            e.preventDefault();
            setPasswordConfirmation(e.target.value);
          }}
        />
      </Form.Group>
      <Button
        variant="primary"
        onClick={() => {
          setRevealSignup(!revealSignup);
        }}
      >
        Sign In
      </Button>
      <Button onClick={handleSignup} variant="primary" type="submit">
        Done
      </Button>
      <Form.Group>
        <h2>login errors: {errors}</h2>
      </Form.Group>
    </Form>
  );
}

export default LoginForm;
