import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


const Appointment = function(props) {

  // set the default state depending on props.interview is null or not
  const { mode, transition, back } = useVisualMode(props.interview? SHOW: EMPTY);

  // saving the appointment and transit to SHOW state after finishing the interaction with API server
  const saveAppointment = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  const confirmCancel = function() {
    transition(CONFIRM);
  };

  // Deleting the appointment and transit to EMPTY state after finishing the interaction with API server
  const cancelAppointment = function() {
    const interview = null;
    transition(DELETING, true);
    props.cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  const editAppointment = function() {
    transition(EDIT);
  };

  // return different JSX syntex depending on mode
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmCancel}
          onEdit={editAppointment}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={saveAppointment}
          onCancel={back}
        />
      )}
      {mode === SAVING && (
        <Status
          message={"Saving"}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete this appointment?"}
          onCancel={back}
          onConfirm={cancelAppointment}
        />
      )}
      {mode === DELETING && (
        <Status
          message={"Deleting"}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onSave={saveAppointment}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"Can't add the appointment."}
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Can't cancel the appointment."}
          onClose={back}
        />
      )}
    </article>
  );
};

export default Appointment;