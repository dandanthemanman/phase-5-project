import React from "react";
import { useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

function TutorCardModal({
  tutor,
  user,
  handleSave,
  listOfSavedTutors,
  setListOfSavedTutors,
  ratingArray,
  setRatingArray,
  cumulativeRating,
  setCumulativeRating,
  show,
  setShow,
}) {
  // states
  const [revealCreateReview, setRevealCreateReview] = useState(false);
  const [reviewContent, setReviewContent] = useState("");
  const [ratingState, setRatingState] = useState(1);
  const [tutorReviews, setTutorReviews] = useState(tutor.reviews);

  // fn's
  const handleClose = () => setShow(false);

  function handleReview() {
    // sends review to backend
    fetch("/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        tutor_id: tutor.id,
        review_body: reviewContent,
        rating: ratingState,
      }),
    })
      .then((r) => r.json())
      .then((r) => console.log(r))
      .then(() => {
        addNewReview({
          user_id: user.id,
          tutor_id: tutor.id,
          review_body: reviewContent,
          rating: ratingState,
        });
      })
      // adds rating to ratingArray; rendered in cumulativeRating on card
      .then(() => addNewRating(ratingState))
      .then(() => console.log(ratingArray, cumulativeRating));
  }
  function addNewReview(newReview) {
    setTutorReviews([...tutorReviews, newReview]);
  }

  function addNewRating(newRating) {
    setRatingArray([...ratingArray, newRating]);
    setCumulativeRating(
      ratingArray.reduce((prevValue, currValue) => prevValue + currValue, 0) /
        ratingArray.length
    );
  }

  return (
    <Modal centered show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{tutor.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Description:</h5>
        {tutor.description} <br /> <h5>Reviews:</h5>
        <ul>
          {tutorReviews?.map((review) => (
            <li key={review.id}>"{review.review_body}"</li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Save Tutor
        </Button>
        <Button variant="success" onClick={() => setRevealCreateReview(true)}>
          Leave a Review
        </Button>

        <Container
          className={revealCreateReview ? "review_revealed" : "review_hidden"}
        >
          <textarea
            placeholder="Write your review here"
            name=""
            id=""
            cols="52"
            rows="5"
            onChange={(e) => {
              setReviewContent(e.target.value);
              console.log(reviewContent);
            }}
          ></textarea>
          <h5>Your Rating:</h5>
          <ReactStars
            count={5}
            onChange={(newRating) => {
              setRatingState(newRating);
              console.log(ratingState);
            }}
            size={18}
            activeColor="#ffd700"
          />
          <Button variant="primary" onClick={handleReview}>
            Submit
          </Button>
          <Button
            variant="secondary"
            onClick={() => setRevealCreateReview(false)}
          >
            Close
          </Button>
        </Container>
      </Modal.Footer>
    </Modal>
  );
}

export default TutorCardModal;
