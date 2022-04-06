import React from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/index";
import { Button, Form } from "react-bootstrap";

const CreateNew = ({ addNew, setNotification }) => {
  const content = useField("content");
  const author = useField("author");
  const info = useField("info");

  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    content.reset();
    author.reset();
    info.reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/anecdotes");
    setNotification(`Added anecdote "${content.value}"`);
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const contentProps = Object.assign({}, content);
  delete contentProps.reset;

  const authorProps = Object.assign({}, author);
  delete authorProps.reset;

  const infoProps = Object.assign({}, info);
  delete infoProps.reset;

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content</Form.Label>
          <Form.Control {...contentProps} />
          <Form.Label>author</Form.Label>
          <Form.Control {...authorProps} />
          <Form.Label>url</Form.Label>
          <Form.Control {...infoProps} />
          <Button
            style={{ marginRight: 5, marginTop: 10 }}
            variant="primary"
            type="submit"
          >
            create
          </Button>
          <Button
            style={{ marginLeft: 5, marginTop: 10 }}
            onClick={handleReset}
          >
            reset
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreateNew;
