import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import TutorCard from "./TutorCard";
import SavedTutorCard from "./SavedTutorCard";

function SavedTutors({ user, setUser }) {
  return (
    <>
      <h2>My Tutors</h2>
      <Slider>
        {user.tutors?.map((tutor) => (
          <div>
            <SavedTutorCard key={tutor.id} tutor={tutor} user={user} />
          </div>
        ))}
      </Slider>
    </>
  );
}

export default SavedTutors;
