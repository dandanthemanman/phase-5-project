import React, { useState } from "react";
import Navigation from "./Navigation";
import TutorList from "./TutorList";
import SavedTutors from "./SavedTutors";

function Home({ user, setUser }) {
  const [listOfSavedTutors, setListOfSavedTutors] = useState(user.tutors);

  return (
    <>
      <h1>Home</h1>
      <Navigation user={user} setUser={setUser} />
      <SavedTutors
        user={user}
        setUser={setUser}
        listOfSavedTutors={listOfSavedTutors}
        setListOfSavedTutors={setListOfSavedTutors}
      />
      <TutorList
        user={user}
        setUser={setUser}
        listOfSavedTutors={listOfSavedTutors}
        setListOfSavedTutors={setListOfSavedTutors}
      />
    </>
  );
}

export default Home;
