import Part from "./Part";

const Content = ({ parts }) => (
  <>
  {parts.map((value) => <Part part={value} key={value.id}/>)}
  </>
);


export default Content;