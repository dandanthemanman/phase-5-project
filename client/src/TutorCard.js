import React from "react";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";

function TutorCard({ tutor }) {
  const [modalToggle, setModalToggle] = useState(false);

  function handleSave() {
    // patch function to alter tutor's user_id?
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{tutor.name}</Card.Title>
        <Card.Text>{tutor.description}</Card.Text>
        <Button variant="primary" onClick={handleSave}>
          Save
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

export default TutorCard;
