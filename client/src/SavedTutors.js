import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TutorCard from "./TutorCard";

function SavedTutors({ user }) {
  console.log(user);
  return (
    <Slider>
      {user.tutors?.map((tutor) => (
        <div>
          <TutorCard key={tutor.id} tutor={tutor} />
        </div>
      ))}
    </Slider>
  );
}

export default SavedTutors;
