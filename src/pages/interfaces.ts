import { ReactElement } from "react";

export interface ITask {
  id: number;
  name: string;
  points: number;
  type: "bug" | "rework" | "task";
  status?: "backlog" | "sprint" | "done";
}

export interface IEmployee {
  id: number;
  name?: string;
  salary?: number;
  bugRisk: number; // Porcentage
  reworkRisk: number; // Porcentage
  storyPointsPerSprint: number;
  storyPointsAllocated: number;

  tasks: ITask[];
  avatar?: ReactElement;
}
