import { ITaskListProps } from "./interfaces";
import TaskItem from "./TaskItem";
import "./Task.scss";

const TaskList = ({ tasks, taskAction, title }: ITaskListProps) => {
  return (
    <div className="task-list">
      <h1>{title}</h1>
      <div className="tasks">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} taskAction={taskAction} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
