import React from "react";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { BsEmojiSmile } from "react-icons/bs";

function TutorCard({ tutor }) {
  const [modalToggle, setModalToggle] = useState(false);

  function handleSave() {
    // TODO: post statement to make new usertutor
  }

  return (
    <Card style={{ width: "18rem" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Header as="h5">{tutor.name}</Card.Header>
      <Card.Body>
        <Card.Title>${tutor.hourly_rate}/hour</Card.Title>
        <Card.Subtitle></Card.Subtitle>
        <Card.Text>Description: {tutor.description}</Card.Text>
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
