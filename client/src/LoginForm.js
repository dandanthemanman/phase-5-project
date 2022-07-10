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

  let history = useHistory();

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
      <Link to="/signup">
        <Button variant="primary">Signup</Button>
      </Link>
      <Form.Group>
        <h2>login errors{errors}</h2>
      </Form.Group>
    </Form>
  );
}

export default LoginForm;
