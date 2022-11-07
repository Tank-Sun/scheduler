export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDay = state.days.filter(date => date.name === day);
  const filteredAppointments = [];
  if(filteredDay.length) {
    for (let appointment of filteredDay[0].appointments) {
      filteredAppointments.push(state.appointments[appointment]);
    }
  }
  return filteredAppointments;
}