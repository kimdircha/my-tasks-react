import { IconEditOutline } from "../icons/Pencil";
import { IconDeleteOutline } from "../icons/Trash";
import { IconCollapse } from "../icons/Collapse";
import { ITask } from "../App";

interface ITaskItemProps {
  task: ITask;
  updatingTaskId: number | undefined;
  setUpdatingTask: React.Dispatch<React.SetStateAction<ITask | null>>;
  onToggleComplete: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

export default function TaskItem(props: ITaskItemProps) {
  return (
    <li className={`list-group-item d-flex align-items-center flex-wrap${props.updatingTaskId === props.task.id ? ' bg-info-subtle' : ''}${props.updatingTaskId !== undefined && props.updatingTaskId !== props.task.id ? ' opacity-25 unactive-task' : ''}`}>
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id={`task-${props.task.id}-checkbox`}
          checked={props.task.completed}
          onChange={() => props.onToggleComplete(props.task.id)}
        />
        <label
          className="form-check-label"
          htmlFor={`task-${props.task.id}-checkbox`}
        >
          <b className="task-title">{props.task.title}</b>
          <br />
          <small>{props.task.deadline}</small>
        </label>
      </div>
      <span className="mb-2">
        {props.task.description?.length > 0 && (
          <IconCollapse
            className="ms-2 clickable text-secondary"
            data-bs-toggle="collapse"
            data-bs-target={`#task-${props.task.id}-collapse`}
            aria-expanded="false"
            aria-controls={`task-${props.task.id}-collapse`}
          />
        )}
        <IconEditOutline className="ms-2 clickable text-warning" onClick={() => props.setUpdatingTask(props.task)} />
        <IconDeleteOutline
          className="ms-2 clickable text-danger"
          onClick={() => props.onDeleteTask(props.task.id)}
        />
      </span>
      {props.task.description?.length > 0 && (
        <div
          className="collapse w-100"
          id={`task-${props.task.id}-collapse`}
        >
          <div className="card card-body">{props.task.description}</div>
        </div>
      )}
    </li>
  );
}
