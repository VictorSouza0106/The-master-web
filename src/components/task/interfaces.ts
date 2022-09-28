import { ITask } from "../../pages/interfaces";

export interface ITaskListProps {
  tasks: ITask[];
  title: string;
  taskAction: Function;
}

export interface ITaskItemProps {
  task: ITask;
  taskAction: Function;
}
