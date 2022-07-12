import React from "react";
import { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";

function TutorCard({ tutor, user, setUser }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // makes a new usertutor
  function handleSave() {
    fetch("/user_tutors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        tutor_id: tutor.id,
      }),
    }).then(() => {
      fetch("/me")
        .then((r) => r.json())
        .then((user) => setUser(user));
    });
  }

  // TODO: write handleReview fn
  function handleReview() {
    // fetch("/reviews", {
    //   method: "POST",
    // });
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
            {tutor.reviews.map((review) => (
              <li key={review.id}>"{review.review_body}"</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Enroll
          </Button>
          <Button variant="success" onClick={handleReview}>
            Leave a Review
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TutorCard;
