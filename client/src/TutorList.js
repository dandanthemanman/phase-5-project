import React from "react";
import { useState, useEffect } from "react";
import TutorCard from "./TutorCard";

function TutorList({
  user,
  setUser,
  listOfSavedTutors,
  setListOfSavedTutors,
  search,
  filterParameter,
}) {
  const [tutorData, setTutorData] = useState([]);

  // dont' understand why sort methods effect tutorData; sortedTutors is declared here but never called in JSX

  let sortedTutors;
  if (filterParameter === "rating") {
    sortedTutors = tutorData.sort((a, b) =>
      a.cumulativeRating > b.cumulativeRating ? -1 : 1
    );
  }
  if (filterParameter === "hourly_rate") {
    sortedTutors = tutorData.sort((a, b) =>
      a.hourly_rate > b.hourly_rate ? 1 : -1
    );
  }
  if (filterParameter === "number_of_reviews") {
    sortedTutors = tutorData.sort((a, b) =>
      a.reviews.length < b.reviews.length ? 1 : -1
    );
  }

  // fetch tutors fn
  function fetchTutors() {
    fetch("/tutors")
      .then((r) => r.json())
      .then((r) => setTutorData(r));
  }

  // invokes fetch tutors fn
  useEffect(fetchTutors, []);

  // searched tutors
  const searchedTutors = tutorData.filter((tutor) => {
    if (search === "") return true;
    return tutor.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <h2>Explore Tutors</h2>
      <div className="tutor_list_container">
        <div className="row">
          {searchedTutors?.map((tutor) => (
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
