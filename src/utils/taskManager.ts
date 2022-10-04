import { IEmployee, ITask } from "../pages/interfaces";
import {
  defaultCycle,
  gameProgressStore,
  IScrumCycle,
} from "../stores/gameProgressStore";
const BUG_TASK_MULT = 3;
const REWORK_TASK_MULT = 1;

//TODO cahnge var name -> Calcs all sprint Tasks
export const sprintTaskManagment = (employees: IEmployee[]) => {
  let taskErrorList: ITask[] = [];
  let sprintCycle: IScrumCycle = defaultCycle;

  employees.forEach((emp: IEmployee) => {
    sprintCycle.budgetSpend += emp.salary as number;

    if (emp.tasks.length < 0) return;

    sprintCycle.employeesWorks++;

    emp.tasks.forEach((task: ITask) => {
      const { totalBugs, totalReworks, errorTasks } = calcTaskError(
        task,
        emp.bugRisk,
        emp.reworkRisk
      );

      sprintCycle.totalTasks++;
      sprintCycle.totalBugs += totalBugs;
      sprintCycle.totalReworks += totalReworks;
      taskErrorList.push(...errorTasks);
    });
  });

  return { sprintStatus: sprintCycle, taskErrorList: taskErrorList };
};

const calcTaskError = (task: ITask, bugRisk: number, reworkRisk: number) => {
  const probability = Math.random() * 100;
  let cloneTask = { ...task };

  let totalBugs = 0;
  let totalReworks = 0;

  let errorTasks: ITask[] = [];
  cloneTask.status = "backlog";

  if (probability <= bugRisk) {
    cloneTask.type = "bug";
    cloneTask.points *= BUG_TASK_MULT;
    totalBugs++;
  } else if (probability <= reworkRisk) {
    cloneTask.type = "rework";
    cloneTask.points *= BUG_TASK_MULT;
    totalReworks++;
  } else {
    cloneTask.status = "done";
  }
  errorTasks.push(cloneTask);
  return {
    errorTasks: errorTasks,
    totalBugs: totalBugs,
    totalReworks: totalReworks,
  };
};

export const MOCK_TASKS: ITask[] = [
  {
    id: 1,
    name: "First Task",
    points: 16,
    status: "backlog",
    type: "task",
  },
  {
    id: 2,
    name: "Second Task",
    points: 12,
    status: "backlog",
    type: "bug",
  },
  {
    id: 3,
    name: "Third Task",
    points: 8,
    status: "backlog",
    type: "rework",
  },
  {
    id: 4,
    name: "Fourth Task",
    points: 12,
    status: "backlog",
    type: "rework",
  },
  {
    id: 5,
    name: "Fifth Task",
    points: 6,
    status: "backlog",
    type: "bug",
  },
  {
    id: 6,
    name: "Sixth Task",
    points: 6,
    status: "backlog",
    type: "task",
  },
  {
    id: 7,
    name: "Seventh Task",
    points: 5,
    status: "backlog",
    type: "rework",
  },
  {
    id: 8,
    name: "Eighth Task",
    points: 5,
    status: "backlog",
    type: "rework",
  },
  {
    id: 9,
    name: "Ninth Task",
    points: 3,
    status: "backlog",
    type: "task",
  },
  {
    id: 10,
    name: "Tenth Task",
    points: 12,
    status: "backlog",
    type: "bug",
  },
];
