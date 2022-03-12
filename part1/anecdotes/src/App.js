import React from "react";
import Button from "./Button";

class App extends React.Component {
  anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  state = {
    selected: 0,
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };

  points = [0, 0, 0, 0, 0, 0, 0];

  copy = [...this.points];

  render() {
    return (
      <div>
        <h1>Anecdote of the day</h1>
        <p>{this.anecdotes[this.state.selected]}</p>
        <Button
          type="vote"
          onClick={() => {
            this.copy[this.state.selected] += 1;
            this.setState(this.copy);
          }}
        />
        <Button
          type="next anecdote"
          onClick={() => {
            this.setState({
              selected: Math.floor(
                Math.random() * (this.anecdotes.length - 1 - 0 + 1) + 0
              ),
            });
          }}
        />
        <h1>Anecdote with most votes</h1>
        <p>
          "{this.anecdotes[this.copy.indexOf(Math.max(...this.copy))]}" has
          {Math.max(...this.copy)} votes
        </p>
      </div>
    );
  }
}

export default App;
