import React from "react";
import { useState, useEffect } from "react";
import TutorCard from "./TutorCard";

function TutorList() {
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
    <div>
      {tutorData?.map((tutor) => (
        <>
          <TutorCard key={tutor.id} tutor={tutor} />
        </>
      ))}
    </div>
  );
}

export default TutorList;
