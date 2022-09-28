import classNames from "classnames";
import { ITaskItemProps } from "./interfaces";
import "./Task.scss";

const TaskItem = ({ task, taskAction }: ITaskItemProps) => {
  return (
    <div
      className={classNames("task-card", task.type)}
      onClick={taskAction(task)}
    >
      <div className="task-info">
        <div>
          <p className="subtitle">Name</p>
          <p>{task.name}</p>
        </div>
      </div>
      <div className="points">
        <p className="subtitle">pts</p>
        <p className="number">{task.points}</p>
      </div>
    </div>
  );
};

export default TaskItem;
