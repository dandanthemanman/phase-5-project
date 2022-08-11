import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./styles.css";

function LoginForm({ setUser, user }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [revealSignup, setRevealSignup] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  let [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  // console.log(revealSignup);

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
        r.json().then((userData) => {
          setUser(userData);
          history.push("/home");
        });
      } else {
        // if userdata is bad, set error state
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="username"
                className="form-control mt-1"
                placeholder="Enter username"
                onChange={(e) => {
                  setUsername(e.target.value);
                  console.log(username);
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log(password);
                }}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleLogin}
              >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
            <Form.Group>
              <h3>{errors}</h3>{" "}
            </Form.Group>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="username"
              className="form-control mt-1"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Confirm Password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSignup}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// conditionally render login/signup form
//   if (!revealSignup) {
//     return (
//       <Form className="Auth-form-container">
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             type="username"
//             placeholder="Enter username"
//             onChange={(e) => {
//               e.preventDefault();
//               setUsername(e.target.value);
//               console.log(username);
//             }}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Password"
//             onChange={(e) => {
//               e.preventDefault();
//               setPassword(e.target.value);
//               console.log(password);
//             }}
//           />
//         </Form.Group>
//         <Button onClick={handleLogin} variant="primary" type="submit">
//           Sign in
//         </Button>
//         <Button
//           variant="dark"
//           onClick={() => {
//             setRevealSignup(!revealSignup);
//           }}
//         >
//           No Account?
//         </Button>
//         <Form.Group>
//           <h3>{errors}</h3>
//         </Form.Group>
//       </Form>
//     );
//   }
//   return (
//     <Form>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Username</Form.Label>
//         <Form.Control
//           type="username"
//           placeholder="Enter username"
//           onChange={(e) => {
//             e.preventDefault();
//             setUsername(e.target.value);
//             console.log(username);
//           }}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           placeholder="Password"
//           onChange={(e) => {
//             e.preventDefault();
//             setPassword(e.target.value);
//             console.log(password);
//           }}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password Confirmation</Form.Label>
//         <Form.Control
//           type="password"
//           placeholder="Confirm password"
//           onChange={(e) => {
//             e.preventDefault();
//             setPasswordConfirmation(e.target.value);
//           }}
//         />
//       </Form.Group>
//       <Button
//         variant="dark"
//         onClick={() => {
//           setRevealSignup(!revealSignup);
//         }}
//       >
//         Go Back
//       </Button>
//       <Button onClick={handleSignup} variant="success" type="submit">
//         Signup
//       </Button>
//       <Form.Group>
//         <h2>login errors: {errors}</h2>
//       </Form.Group>
//     </Form>
//   );
// }

export default LoginForm;
