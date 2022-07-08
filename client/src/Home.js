import React from "react";
import Navigation from "./Navigation";
function Home({ user, setUser }) {
  return (
    <>
      <h1>Welcome {user.username}</h1>
      <Navigation user={user} setUser={setUser} />
    </>
  );
}

export default Home;
