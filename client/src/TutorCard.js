import React from "react";
import { useState } from "react";
import { Card, Button, Modal, Container } from "react-bootstrap";
import "./styles.css";
import ReactStars from "react-rating-stars-component";

function TutorCard({
  tutor,
  user,
  setUser,
  listOfSavedTutors,
  setListOfSavedTutors,
}) {
  // states
  const [show, setShow] = useState(false);
  const [revealCreateReview, setRevealCreateReview] = useState(false);
  const [reviewContent, setReviewContent] = useState("");
  const [ratingState, setRatingState] = useState(1);
  const [tutorReviews, setTutorReviews] = useState(tutor.reviews);
  const [cumulativeRating, setCumulativeRating] = useState(
    tutor.cumulativeRating
  );

  // fn's
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

  function addNewReview(newReview) {
    setTutorReviews([...tutorReviews, newReview]);
    // let sum = tutor.reviews.reduce((partialSum, a) => partialSum + a, 0);
  }
  function handleReview() {
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
      .then((r) => console.log(r));
    addNewReview({
      user_id: user.id,
      tutor_id: tutor.id,
      review_body: reviewContent,
      rating: ratingState,
    });
  }

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Header as="h5">
          {tutor.name} {cumulativeRating}
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
          <Button
            variant="primary"
            onClick={() => {
              let ratingArr = tutor.reviews.map((review) => review.rating);
              let nom = ratingArr.reduce(
                (prevValue, currValue) => prevValue + currValue,
                0
              );
              let dom = tutor.reviews.length;
              setCumulativeRating(nom / dom);
              console.log(cumulativeRating);
            }}
          >
            Tester
          </Button>
        </Card.Body>
      </Card>

      <Modal centered show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{tutor.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Description:</h5>
          {tutor.description} <br /> <h5>Reviews:</h5>
          <ul>
            {tutorReviews.map((review) => (
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
                // e.preventDefault();
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
    </>
  );
}

export default TutorCard;
