import { useEffect, useState, useRef } from "react";
import { IconPencilX } from '../icons/PencilX';
import { ITask } from "../App";

interface ITaskFormProps {
  updatingTask: ITask | null;
  setUpdatingTask: React.Dispatch<React.SetStateAction<ITask | null>>;
  onAddOrUpdateTask: (title: string, deadline: string, description: string) => void;
}

export default function TaskForm(props: ITaskFormProps) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [deadlineValidation, setDeadlineValidation] = useState({
    class: "unchecked",
    feedback: "",
  });
  const [description, setDescription] = useState("");

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    formRef.current?.addEventListener(
      "submit",
      (event) => {
        if (!formRef.current?.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        formRef.current?.classList.add("was-validated");
      },
      false
    );
  }, []);

  useEffect(() => {
    if (props.updatingTask) {
      setTitle(props.updatingTask.title);
      setDeadline(props.updatingTask.deadline);
      setDescription(props.updatingTask.description);
    } else {
      clearForm();
    }
  }, [props.updatingTask]);

  function handleDeadlineChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const date: Date = new Date(e.target.value);
    if (isNaN(date.getDate())) {
      setDeadlineValidation({
        class: "is-invalid",
        feedback: "Invalid Date.",
      });
      setDeadline("");
      return;
    }

    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);

    if (date.getTime() < today.getTime()) {
      setDeadlineValidation({
        class: "is-invalid",
        feedback: "Please select a date that is not in the past.",
      });
      setDeadline("");
      return;
    }

    setDeadlineValidation({
      class: "is-valid",
      feedback: "",
    });

    setDeadline(e.target.value);
  }

  function clearForm() {
    setTitle("");
    setDeadline("");
    setDescription("");
    formRef.current?.classList.remove("was-validated");
    setDeadlineValidation({
      class: "unchecked",
      feedback: "",
    });
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    props.onAddOrUpdateTask(title, deadline, description);
    clearForm();
    if (props.updatingTask) {
      props.setUpdatingTask(null);
    }
  }

  return (
    <form className="row gy-4" ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="col-12 col-sm-8">
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="title"
            required
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <label htmlFor="title">
            Title <span className="text-danger">*</span>
          </label>
        </div>
      </div>
      <div className="col-12 col-sm-4">
        <div className="form-floating">
          <input
            type="date"
            className={`${deadlineValidation.class} form-control`}
            id="deadline"
            required
            value={deadline}
            onChange={handleDeadlineChange}
          />
          <label htmlFor="deadline">
            Deadline <span className="text-danger">*</span>
          </label>
          <div className="invalid-feedback">{deadlineValidation.feedback}</div>
        </div>
      </div>
      <div className="col-12">
        <div className="form-floating">
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
          ></textarea>
          <label htmlFor="description">Description</label>
        </div>
      </div>
      <div className="col-12 d-flex gap-2">
        <button type="submit" className="btn btn-primary main-btn">
          {props.updatingTask ? "Update task" : "Add task"}
        </button>
        {props.updatingTask && <button className="btn btn-outline-primary" onClick={() => props.setUpdatingTask(null)}>
           <IconPencilX />
        </button>}
      </div>
    </form>
  );
}
