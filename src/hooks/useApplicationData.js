import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  // set default state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  // set day to the selected day
  const setDay = day => setState(prev => ({...prev, day}));

  // construct the needed days array
  const updateDays = function(state, appointment_id) {
    const filteredDay = state.days.filter(day => day.appointments.includes(appointment_id))[0];
    const newSpots = filteredDay.appointments.filter(appointmentId => state.appointments[appointmentId].interview === null).length;
    const newDay = {...filteredDay, spots: newSpots};
    const newDayIndex = state.days.findIndex(day => day.id === filteredDay.id);
    const newDays = [...state.days];
    newDays[newDayIndex] = newDay;
    return newDays;
  };
  
  // When booking an interview, send a put request to API server, then set the new state
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        const newState = {...state, appointments};
        const newDays = updateDays(newState, id);
        setState({...newState, days: newDays});
      });
  };

  // When cancelling an interview, send a delete request to API server, then set the new state
  const cancelInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, {interview})
      .then(() => {
        const newState = {...state, appointments};
        const newDays = updateDays(newState, id);
        setState({...newState, days: newDays});
      });
  };

  // After getting all the needed data from API server, set the new state
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({...prev, days:all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

  return {state, setDay, bookInterview, cancelInterview};
};

export default useApplicationData;
