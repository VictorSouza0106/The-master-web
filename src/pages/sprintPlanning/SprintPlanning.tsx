import React, { useEffect, useState } from "react";
import EmployeeList from "../../components/employee/EmployeeList";
import TaskList from "../../components/task/TaskList";
import {
  defaultCycle,
  gameProgressStore,
  IScrumCycle,
  IScrumCycleAttrs,
} from "../../stores/gameProgressStore";
import { MOCK_EMPLOYEES } from "../../utils/employeeGenerator";
import { sprintTaskManagment, MOCK_TASKS } from "../../utils/taskManager";
import { ITask, IEmployee } from "../interfaces";
import "./SprintPlanning.scss";

const SprintPlanning = () => {
  const [storyPoints, setStoryPoints] = useState(40);
  const [tasks, setTasks] = useState([] as ITask[]);

  const [employees, setEmployees] = useState([] as IEmployee[]);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee>();

  const backlogTasks = tasks.filter((task) => task.status === "backlog");
  const sprintTasks = tasks.filter((task) => task.status === "sprint");
  const completedTasks = tasks.filter((task) => task.status === "done");

  const gameProgressCycles = gameProgressStore((state) => state.cycles);
  const addCycle = gameProgressStore((state) => state.addCycle);

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

  function updateTask(task: ITask, status: "backlog" | "sprint" | "done") {
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

  function nextSprint() {
    let updatedTasks = tasks.filter(
      (task) => task.status === "backlog" || task.status === "done"
    );

    const { sprintStatus, taskErrorList } = sprintTaskManagment(employees);
    addCycle(sprintStatus);
    console.log(gameProgressCycles);

    updatedTasks = [...updatedTasks, ...taskErrorList];

    employees.forEach((emp: IEmployee) => {
      emp.tasks = [];
      emp.storyPointsAllocated = 0;
    });

    const updatedEmployees = [...employees];

    setTasks(updatedTasks);
    setEmployees(updatedEmployees);
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
        <div>
          Total Bugs Created -
          {gameProgressCycles.reduce(
            (previousValue, currentValue) => currentValue.totalBugs,
            0
          )}
        </div>
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
