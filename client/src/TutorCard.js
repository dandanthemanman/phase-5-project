import React from "react";
import { useState } from "react";
import { Card, Button, Modal, Container } from "react-bootstrap";
import "./styles.css";

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
  const [tutorReviews, setTutorReviews] = useState(tutor.reviews);
  const [reviewObject, setReviewObject] = useState({});

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
  }

  function handleReview() {
    fetch("/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewObject),
    })
      .then((r) => r.json())
      .then((r) => console.log(r));
    addNewReview(reviewObject);
  }

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Header as="h5">{tutor.name}</Card.Header>
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

      <Modal centered show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{tutor.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {tutor.description}
          <ul>
            Reviews:
            {tutorReviews.map((review) => (
              <li key={review.id}>"{review.review_body}"</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="success" onClick={() => setRevealCreateReview(true)}>
            Leave a Review
          </Button>

          <Container
            className={revealCreateReview ? "review_revealed" : "review_hidden"}
          >
            <textarea
              name=""
              id=""
              cols="52"
              rows="5"
              onChange={(e) => {
                e.preventDefault();
                setReviewObject({
                  user_id: user.id,
                  tutor_id: tutor.id,
                  review_body: e.target.value,
                });
                console.log(reviewContent);
              }}
            ></textarea>
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
