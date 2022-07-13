import React from "react";
import { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";

function SavedTutorCard({ tutor, user }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleEliminate(id) {
    console.log(id);
    fetch(`/user_tutors/${id}`, {
      method: "DELETE",
    });
  }

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Header as="h5">{tutor.name}</Card.Header>
        <Card.Body>
          <Card.Title>${tutor.hourly_rate}/hour</Card.Title>
          <Card.Subtitle></Card.Subtitle>
          <Card.Text>Description: {tutor.description}</Card.Text>
          <Button variant="danger" onClick={(e) => handleEliminate(tutor.id)}>
            Eliminate
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
            {tutor.reviews?.map((review) => (
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
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SavedTutorCard;
