import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


const Form = function(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [errorStudent, setErrorStudent] = useState("");
  const [errorInterviewer, setErrorInterviewer] = useState("");

  const reset = function() {
    setInterviewer(null);
    setStudent("");
    setErrorStudent("");
    setErrorInterviewer("");
  };
  const cancel = function() {
    reset();
    props.onCancel();
  };

  const save = function() {
    if (student === "") {
      setErrorStudent("Student name cannot be blank");
    }
    if (interviewer === null) {
      setErrorInterviewer("Please select an interviewer");
    }
    if(student && interviewer) {
      setErrorStudent("");
      setErrorInterviewer("");
      props.onSave(student, interviewer);
    }
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
          <section className="appointment__validation">{errorStudent}</section>
        </form>
        <InterviewerList 
          onChange={setInterviewer}
          value={interviewer}
          interviewers={props.interviewers}
        />
        <section className="appointment__validation">{errorInterviewer}</section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger >Cancel</Button>
          <Button onClick={save} confirm >Save</Button>
        </section>
      </section>
    </main>
  );
}

export default Form;