import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const allVotes = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

  const [selected, setSelected] = useState(0);

  const [votes, setVotes] = useState(allVotes);

  const [hightestVotes, setHighVotes] = useState({
    anectodeIndex: 0,
    votes: 0,
  });

  const nextAnecdote = () => {
    const currentAnecdote = Math.floor(Math.random() * (6 - 0 + 1));
    setSelected(currentAnecdote);
  };

  const giveVote = () => {
    const allVotes = { ...votes };
    allVotes[selected] = ++allVotes[selected];

    const highestVotes = {
      anectodeIndex: 0,
      votes: allVotes[0],
    };
    for (const key in allVotes) {
      if (highestVotes.votes < allVotes[key]) {
        highestVotes.anectodeIndex = key;
        highestVotes.votes = allVotes[key];
      }
    }
    setHighVotes({ ...highestVotes });

    setVotes({ ...allVotes });
  };

  return (
    <div>
      <Anecdote
        heading="Anecdote of the day"
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      />
      <div>
        <Button onClick={giveVote} value="vote" />
        <Button onClick={nextAnecdote} value="next anecdotes" />
      </div>
      <div>
        <Anecdote
          heading="Anecdote with most votes"
          anecdote={anecdotes[hightestVotes.anectodeIndex]}
          votes={hightestVotes.votes}
        />
      </div>
    </div>
  );
};

const Anecdote = ({ heading, anecdote, votes }) => (
  <div>
    <h1>{heading}</h1>
    {anecdote}
    <div>has {votes} votes</div>
  </div>
);
const Button = ({ onClick, value }) => (
  <button onClick={onClick}>{value}</button>
);

export default App;
