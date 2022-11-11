import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

const InterviewerListItem = function(props) {
  const interviewerClass = classNames("interviewers__item", {"interviewers__item--selected": props.selected});

  // show name of selected interviewer
  const selectedName = function(selected) {
    if(selected) {
      return props.name;
    }
  };

  return (
    <li onClick={props.setInterviewer} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {selectedName(props.selected)}
    </li>
  );
};

export default InterviewerListItem;