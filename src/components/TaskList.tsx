import TaskItem from "./TaskItem";
import { ITask } from "../App";

interface ITaskListProps {
  tasks: ITask[];
  updatingTaskId: number | undefined;
  setUpdatingTask: React.Dispatch<React.SetStateAction<ITask | null>>;
  onToggleComplete: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

export default function TaskList(props: ITaskListProps) {
  return (
    <div className="card mt-5">
      <h5 className="card-header">Available tasks</h5>
      <ul className="list-group list-group-flush todos">
        {props.tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            updatingTaskId={props.updatingTaskId}
            setUpdatingTask={props.setUpdatingTask}
            onDeleteTask={props.onDeleteTask}
            onToggleComplete={props.onToggleComplete}
          />
        ))}
      </ul>
    </div>
  );
}
