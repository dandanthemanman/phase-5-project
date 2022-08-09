import React from "react";
import { useState, useEffect } from "react";
import { Card, Button, Modal, Container } from "react-bootstrap";
import "./styles.css";
import ReactStars from "react-rating-stars-component";
import Tester from "./Tester";
import TutorCardModal from "./TutorCardModal";

function TutorCard({ tutor, user, listOfSavedTutors, setListOfSavedTutors }) {
  // states
  const [show, setShow] = useState(false);
  // const [revealCreateReview, setRevealCreateReview] = useState(false);
  // const [reviewContent, setReviewContent] = useState("");
  // const [ratingState, setRatingState] = useState(1);
  // const [tutorReviews, setTutorReviews] = useState(tutor.reviews);
  const [ratingArray, setRatingArray] = useState(
    tutor.reviews.map((review) => review.rating)
  );
  const [cumulativeRating, setCumulativeRating] = useState(
    ratingArray.reduce((prevValue, currValue) => prevValue + currValue, 0) /
      ratingArray.length
  );

  // fn's
  // const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  function handleSave() {
    fetch("/user_tutors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        tutor_id: tutor.id,
      }),
    }).then(() => {
      setListOfSavedTutors([...listOfSavedTutors, tutor]);
    });
  }

  // function addNewReview(newReview) {
  //   setTutorReviews([...tutorReviews, newReview]);
  // }

  // function addNewRating(newRating) {
  //   setRatingArray([...ratingArray, newRating]);
  //   setCumulativeRating(
  //     ratingArray.reduce((prevValue, currValue) => prevValue + currValue, 0) /
  //       ratingArray.length
  //   );
  // }

  // function handleReview() {
  //   // sends review to backend
  //   fetch("/reviews", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       user_id: user.id,
  //       tutor_id: tutor.id,
  //       review_body: reviewContent,
  //       rating: ratingState,
  //     }),
  //   })
  //     .then((r) => r.json())
  //     .then((r) => console.log(r))
  //     .then(() => {
  //       addNewReview({
  //         user_id: user.id,
  //         tutor_id: tutor.id,
  //         review_body: reviewContent,
  //         rating: ratingState,
  //       });
  //     })
  //     // adds rating to ratingArray; rendered in cumulativeRating on card
  //     .then(() => addNewRating(ratingState))
  //     .then(() => console.log(ratingArray, cumulativeRating));
  // }

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Header as="h5">
          {tutor.name} (
          {cumulativeRating ? cumulativeRating.toFixed(1) : "No ratings yet"})
          <ReactStars
            value={Math.round(cumulativeRating)}
            count={5}
            isHalf={true}
            size={24}
            activeColor="#ffd700"
          />
        </Card.Header>
        <Card.Body>
          <Card.Title>${tutor.hourly_rate}/hour</Card.Title>
          <Card.Subtitle></Card.Subtitle>
          <Card.Text>Description: {tutor.description}</Card.Text>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="primary" onClick={handleShow}>
            More Info
          </Button>
        </Card.Body>
      </Card>
      <TutorCardModal
        tutor={tutor}
        user={user}
        handleSave={handleSave}
        listOfSavedTutors={listOfSavedTutors}
        setListOfSavedTutors={setListOfSavedTutors}
        ratingArray={ratingArray}
        setRatingArray={setRatingArray}
        cumulativeRating={cumulativeRating}
        setCumulativeRating={setCumulativeRating}
        show={show}
        setShow={setShow}
      />
    </>
  );
}

export default TutorCard;
