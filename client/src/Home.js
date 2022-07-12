import React from "react";
import Navigation from "./Navigation";
import TutorList from "./TutorList";
import SavedTutors from "./SavedTutors";

function Home({ user, setUser }) {
  return (
    <>
      <h1>Home</h1>
      <Navigation user={user} setUser={setUser} />
      <SavedTutors user={user} setUser={setUser} />
      <TutorList user={user} setUser={setUser} />
    </>
  );
}

export default Home;
