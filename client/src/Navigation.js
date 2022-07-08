import React, { useState } from "react";
import { NavBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Navigation({ user, setUser }) {
  // const [user, setUser] = useState(null);

  function handleLogout() {
    fetch("/logout", {
      // request to delete session[:user_id]
      method: "DELETE",
    }).then((r) => {
      // resets the user state
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return <h1>navigation</h1>;
}

export default Navigation;
