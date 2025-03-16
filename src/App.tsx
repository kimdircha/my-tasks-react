import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export interface ITask {
  id: number;
  title: string;
  deadline: string;
  description: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>(JSON.parse(localStorage.getItem('my-tasks') || '[]'));
  const [updatingTask, setUpdatingTask] = useState<ITask | null>(null);

  function addOrUpdateTask(title: string, deadline: string, description: string): void {
    if (updatingTask) {
      const taskIndex = tasks.findIndex((t) => t.id === updatingTask.id);
      if (taskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], title, deadline, description };
        setTasks(updatedTasks);
      }
    } else {
      setTasks([...tasks, { id: Math.random(), title, deadline, description, completed: false }]);
    }
  }
  function handleToggleTask(taskId: number): void {
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].completed = !updatedTasks[taskIndex].completed;
      setTasks(updatedTasks);
    }
  }
  function deleteTask(taskId: number): void {
    setTasks((tsks) => tsks.filter((t) => t.id !== taskId));
    if (updatingTask) {
      setUpdatingTask(null);
    }
  }
  useEffect(() => {
    localStorage.setItem('my-tasks', JSON.stringify(tasks))
  }, [tasks])
  return (
    <>
      <div className="container">
        <div className="col-12 col-lg-6 mx-auto">
          <h2 className="text-center my-4">TODO LIST</h2>
          <TaskForm
            updatingTask={updatingTask}
            setUpdatingTask={setUpdatingTask}
            onAddOrUpdateTask={addOrUpdateTask}
          />
          {tasks.length > 0 && (
            <TaskList
              tasks={tasks}
              updatingTaskId={updatingTask?.id}
              onDeleteTask={deleteTask}
              onToggleComplete={handleToggleTask}
              setUpdatingTask={setUpdatingTask}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
