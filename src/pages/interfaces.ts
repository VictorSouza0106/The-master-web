export interface ITask {
  id: number;
  name: string;
  points: number;
  type: string;
  status?: string;
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
}
