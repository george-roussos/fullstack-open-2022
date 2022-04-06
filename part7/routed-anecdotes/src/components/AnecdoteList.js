import React from "react";
import { Link } from "react-router-dom";
import { Alert, Table } from "react-bootstrap";

const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    <div className="container">
      {notification === "" ? null : (
        <Alert variant="success">{notification}</Alert>
      )}
    </div>
    <h2 style={{ marginTop: 15 }}>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map((anecdote) => (
          <tr key={anecdote.id}>
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default AnecdoteList;
