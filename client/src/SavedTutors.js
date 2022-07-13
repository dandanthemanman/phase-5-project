import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import TutorCard from "./TutorCard";
import SavedTutorCard from "./SavedTutorCard";

function SavedTutors({
  user,
  setUser,
  listOfSavedTutors,
  setListOfSavedTutors,
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <>
      <h2>My Tutors</h2>
      <Slider {...settings}>
        {listOfSavedTutors?.map((tutor) => (
          <div>
            <SavedTutorCard
              key={tutor.id}
              tutor={tutor}
              user={user}
              listOfSavedTutors={listOfSavedTutors}
              setListOfSavedTutors={setListOfSavedTutors}
            />
          </div>
        ))}
      </Slider>
    </>
  );
}

export default SavedTutors;
