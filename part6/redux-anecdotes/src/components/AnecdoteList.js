import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  voteMessage,
  clearMessage,
  testFunc,
  setNotification,
} from "../reducers/messageReducer";

const Anecdote = ({ anecdote }) => {
  return anecdote.content;
};

const VoteButton = ({ handleClick }) => {
  return (
    <button style={{ marginLeft: "10px" }} onClick={handleClick}>
      vote
    </button>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const search = useSelector((state) => state.search);

  const matches = !search
    ? anecdotes
    : anecdotes.filter((anecd) =>
        anecd.content.toLowerCase().split(" ")[0].includes(search.toLowerCase())
      );

  return (
    <div>
      {matches
        .slice()
        .sort((a, b) => {
          return b.votes - a.votes;
        })
        .map((anecdote) => (
          <React.Fragment key={anecdote.id}>
            <Anecdote anecdote={anecdote} />
            <p>
              has {anecdote.votes} votes
              <VoteButton
                handleClick={() => {
                  dispatch(voteAnecdote(anecdote, anecdote.id));
                  dispatch(
                    setNotification(`You voted anecdote ${anecdote.id}`, 2)
                  );
                }}
              />
            </p>
          </React.Fragment>
        ))}
    </div>
  );
};

export default AnecdoteList;
