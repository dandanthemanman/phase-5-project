import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

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

  console.log(errors);

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
            console.log(passwordConfirmation);
          }}
        />
      </Form.Group>
      <Button onClick={handleSignup} variant="primary" type="submit">
        Done
      </Button>
      <Form.Group>
        <h2>login errors{errors}</h2>
      </Form.Group>
    </Form>
  );
}

export default SignupForm;
