import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";


const InterviewerList = function(props) {
  // creat array of interiewers for each appointment
  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}

// test the type of props.interviewers passed to InterviewerList component must be array
InterviewerList.propTypes = {interviewers: PropTypes.array.isRequired};

export default InterviewerList;