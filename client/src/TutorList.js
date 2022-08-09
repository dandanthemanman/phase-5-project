import React from "react";
import { useState, useEffect } from "react";
import TutorCard from "./TutorCard";

function TutorList({
  user,
  setUser,
  listOfSavedTutors,
  setListOfSavedTutors,
  search,
}) {
  const [tutorData, setTutorData] = useState([]);

  // sortByRating state
  // const [sortByRating, setSortByRating] = useState(null);
  // const sortedTutors = tutorData.sort((a, b) => {
  //   if (sortByRating === null) {
  //     a.cumulativeRating > b.cumulativeRating ? 1 : 1;
  //   }
  //   if (sortByRating === "highToLow") {
  //     a.cumulativeRating > b.cumulativeRating ? -1 : 1;
  //   }
  //   if (sortByRating === "LowToHigh") {
  //     a.cumulativeRating > b.cumulativeRating ? 1 : -1;
  //   }
  // });

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
