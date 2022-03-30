import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ course }) => {
    const totalSum = course.parts.reduce((initial, current)=>{
         initial += current.exercises ;
        return initial; 
    }, 0)

  return (<>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total sum={totalSum} />
  </>);
};

export default Course;
