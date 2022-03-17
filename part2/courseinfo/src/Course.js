import React from "react";

const Course = (props) => {
  const { courses } = props;
  return (
    <div>
      {courses.map((course) => (
        <React.Fragment key={course.id}>
          <h1>{course.name}</h1>
          {course.parts.map((part) => (
            <p key={part.id}>
              {part.name}: {part.exercises}
            </p>
          ))}
          <h4>
            total number of exercises:&nbsp;
            {course.parts
              .map((part) => part.exercises)
              .reduce((previous, part) => previous + part)}
          </h4>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Course;
