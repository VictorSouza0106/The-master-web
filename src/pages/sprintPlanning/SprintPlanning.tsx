import React, { useEffect, useState } from "react";
import EmployeeList from "../../components/employee/EmployeeList";
import TaskList from "../../components/task/TaskList";
import { ITask, IEmployee } from "../interfaces";
import "./SprintPlanning.scss";

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
    type: "task",
  },
  {
    id: 3,
    name: "Third Task",
    points: 8,
    status: "backlog",
    type: "task",
  },
  {
    id: 4,
    name: "Fourth Task",
    points: 12,
    status: "backlog",
    type: "refactor",
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
    type: "refactor",
  },
  {
    id: 8,
    name: "Eighth Task",
    points: 5,
    status: "backlog",
    type: "refactor",
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

export const MOCK_EMPLOYEES: IEmployee[] = [
  {
    id: 1,
    salary: 20000,
    name: "Senior",
    bugRisk: 0,
    reworkRisk: 5,
    storyPointsPerSprint: 25,
    storyPointsAllocated: 0,
    tasks: [],
  },
  {
    id: 2,
    salary: 6500,
    name: "Pleno_1",
    bugRisk: 5,
    reworkRisk: 10,
    storyPointsPerSprint: 20,
    storyPointsAllocated: 0,
    tasks: [],
  },
  {
    id: 3,
    salary: 6000,
    name: "Pleno_2",
    bugRisk: 5,
    reworkRisk: 10,
    storyPointsPerSprint: 18,
    storyPointsAllocated: 0,
    tasks: [],
  },
  {
    id: 4,
    salary: 3200,
    name: "Junior",
    bugRisk: 10,
    reworkRisk: 15,
    storyPointsPerSprint: 10,
    storyPointsAllocated: 0,
    tasks: [],
  },
  {
    id: 5,
    salary: 1800,
    name: "Estag",
    bugRisk: 15,
    reworkRisk: 25,
    storyPointsPerSprint: 5,
    storyPointsAllocated: 0,
    tasks: [],
  },
  {
    id: 6,
    salary: 1800,
    name: "Estag",
    bugRisk: 15,
    reworkRisk: 25,
    storyPointsPerSprint: 5,
    storyPointsAllocated: 0,
    tasks: [],
  },
];

const SprintPlanning = () => {
  const [storyPoints, setStoryPoints] = useState(40);
  const [tasks, setTasks] = useState([] as ITask[]);

  const [employees, setEmployees] = useState([] as IEmployee[]);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee>();

  useEffect(() => {
    setTasks(MOCK_TASKS);
    setEmployees(MOCK_EMPLOYEES);
  }, []);

  function assignTask(task: ITask) {
    return (event: React.MouseEvent<HTMLElement>) => {
      if (selectedEmployee) {
        updateEmployess(task, "add")
          .then(() => {
            updateTask(task, "sprint");
            setStoryPoints((previousValue) => previousValue - task.points);
          })
          .catch(() => {
            console.log("Nao ha Pontos Suficiente");
          });
      }
    };
  }

  function unassignTask(task: ITask) {
    return () => {
      updateEmployess(task, "remove")
        .then(() => {
          updateTask(task, "backlog");
          setStoryPoints((previousValue) => previousValue + task.points);
        })
        .catch(() => {
          console.log("NAO HA TASK");
        });
    };
  }

  function updateTask(task: ITask, status: string) {
    let updatedTasks = [...tasks];
    updatedTasks[updatedTasks.findIndex((e) => e.id === task.id)].status =
      status;

    setTasks(updatedTasks);
  }

  function updateEmployess(task: ITask, action: string) {
    return new Promise<void>((resolve, rejects) => {
      const updatedEmployess = [...employees];
      let updatedEmp =
        updatedEmployess[
          updatedEmployess.findIndex((emp) => emp.id === selectedEmployee?.id)
        ];

      if (action === "add") {
        if (
          updatedEmp.storyPointsAllocated + task.points >
          updatedEmp.storyPointsPerSprint
        ) {
          rejects();
          return;
        }

        updatedEmp.tasks.push(task);
        updatedEmp.storyPointsAllocated += task.points;
      } else if (action === "remove") {
        if (!updatedEmp.tasks.find((elem) => elem.id === task.id)) {
          rejects();
          return;
        }
        updatedEmp.tasks = updatedEmp.tasks.filter(
          (elem) => elem.id !== task.id
        );

        updatedEmp.storyPointsAllocated -= task.points;
      }

      setSelectedEmployee(updatedEmp);
      setEmployees(updatedEmployess);

      resolve();
    });
  }

  const backlogTasks = tasks.filter((task) => task.status === "backlog");
  const sprintTasks = tasks.filter((task) => task.status === "sprint");
  const completedTasks = tasks.filter((task) => task.status === "done");

  function nextSprint() {
    let updatedTasks = [...tasks];
    updatedTasks.forEach((task) => {
      if (task.status === "sprint") task.status = "done";
    });

    setTasks(updatedTasks);
    setStoryPoints(10);
  }

  function onEmployeeSelected(employee: IEmployee) {
    return (_event: React.MouseEventHandler<HTMLDivElement>) => {
      setSelectedEmployee(employee);
    };
  }

  return (
    <div className="container">
      <section>
        <div>points Remain {storyPoints}</div>
        <div>
          Tasks {!selectedEmployee && "Funcionario Não Selecionado"}
          {selectedEmployee && selectedEmployee.name}
        </div>
      </section>
      <section className="list-container">
        <TaskList
          title="BACKLOG"
          tasks={backlogTasks}
          taskAction={assignTask}
        ></TaskList>
        <TaskList
          title="SPRINT"
          tasks={sprintTasks}
          taskAction={unassignTask}
        ></TaskList>
        <TaskList
          title="COMPLETED"
          tasks={completedTasks}
          taskAction={() => {}}
        ></TaskList>
      </section>
      <section>
        <button onClick={nextSprint}>Next Sprint</button>
      </section>
      <div>
        <EmployeeList
          employees={employees}
          onEmployeeSelected={onEmployeeSelected}
          selectedEmployee={selectedEmployee}
        />
      </div>
    </div>
  );
};

export default SprintPlanning;
