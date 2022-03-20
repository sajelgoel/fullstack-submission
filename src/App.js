import { useState } from "react";
import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const changeValue = (val) => {
    switch (val) {
      case "good":
        setGood(good + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => changeValue("good")}  value="good"/>
      <Button onClick={() => changeValue("neutral")} value="neutral" />
      <Button onClick={() => changeValue("bad")} value="hard" />

      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
