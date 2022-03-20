import StatisticLine from "./StatisticLine";

const Statistics = ({ good, bad, neutral }) => {
    if (good === 0 && neutral === 0 && bad === 0) {
      return <div>No feedback given</div>;
    }
  
    const all = good + neutral + bad;
    const average = (good - bad) / all;
    const positive = ((good/all)*100)+ "%";
  
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    );
  };

  export default Statistics;