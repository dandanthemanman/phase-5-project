import React from "react";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";

function SavedTutorCard({ tutor }) {
  function handleEliminate() {}
  const [modalToggle, setModalToggle] = useState(false);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header as="h5">{tutor.name}</Card.Header>
      <Card.Body>
        <Card.Title>${tutor.hourly_rate}/hour</Card.Title>
        <Card.Subtitle></Card.Subtitle>
        <Card.Text>Description: {tutor.description}</Card.Text>
        <Button variant="danger" onClick={handleEliminate}>
          Eliminate
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setModalToggle(!modalToggle);
          }}
        >
          More Info
        </Button>
      </Card.Body>
    </Card>
  );
}

export default SavedTutorCard;
