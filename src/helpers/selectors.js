// returns an array of appointments for that day
export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(date => date.name === day);
  const filteredAppointments = [];
  if(filteredDay.length) {
    for (let appointment of filteredDay[0].appointments) {
      filteredAppointments.push(state.appointments[appointment]);
    }
  }
  return filteredAppointments;
}

export function getInterview(state, interview) {
  let transformedInterview = null;
  if (interview) {
    const filteredInterviewer = state.interviewers[interview.interviewer];
    transformedInterview = {...interview, interviewer: filteredInterviewer};
  }

  return transformedInterview;
}

// returns an array of interviewers for that day
export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(date => date.name === day);
  const filteredInterviewers = [];
  if(filteredDay.length) {
    for (let interviewer of filteredDay[0].interviewers) {
      filteredInterviewers.push(state.interviewers[interviewer]);
    }
  }
  return filteredInterviewers;
}