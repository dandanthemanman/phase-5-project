import React from "react";
import { useState, useEffect } from "react";
import TutorCard from "./TutorCard";

function TutorList({ user, setUser, listOfSavedTutors, setListOfSavedTutors }) {
  const [tutorData, setTutorData] = useState([]);

  // fetch tutors fn
  function fetchTutors() {
    fetch("/tutors")
      .then((r) => r.json())
      .then((r) => setTutorData(r));
  }

  // invokes fetch tutors fn
  useEffect(fetchTutors, []);

  return (
    <>
      <h2>Explore Tutors</h2>
      <div className="tutor_list_container">
        <div className="row">
          {tutorData?.map((tutor) => (
            <div className="col">
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                user={user}
                setUser={setUser}
                listOfSavedTutors={listOfSavedTutors}
                setListOfSavedTutors={setListOfSavedTutors}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TutorList;
