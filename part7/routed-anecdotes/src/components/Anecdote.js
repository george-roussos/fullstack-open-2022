import React from "react";
import { useParams } from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((anecdote) => anecdote.id === Number(id));
  return (
    <div>
      <h2>
        "{anecdote.content}" by {anecdote.author}
      </h2>
      <div>
        has <strong>{anecdote.votes}</strong> votes
      </div>
      <br />
    </div>
  );
};

export default Anecdote;
