import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState(prev => ({...prev, day}));

  const updateDays = function(state, appointment_id) {
    const filteredDay = state.days.filter(day => day.appointments.includes(appointment_id))[0];
    const newSpots = filteredDay.appointments.filter(appointmentId => state.appointments[appointmentId].interview === null).length;
    const newDay = {...filteredDay, spots: newSpots};
    const newDayIndex = state.days.findIndex(day => day.id === filteredDay.id);
    const newDays = [...state.days];
    newDays[newDayIndex] = newDay;
    return newDays;
  };
  
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
        setState(newState);
        return newState;
      })
      .then((newState) => {
        const newDays = updateDays(newState, id);
        setState(prev => ({...prev, days: newDays}));
      });
  };

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
        setState(newState);
        return newState;
      })
      .then((newState) => {
        const newDays = updateDays(newState, id);
        setState(prev => ({...prev, days: newDays}));
      });
  };

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
