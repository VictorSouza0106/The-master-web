import EmployeeList from "../../components/employee/EmployeeList";
import { IEmployeeItemStyles } from "../../components/employee/interfaces";
import { IEmployee } from "../interfaces";
import "./EmployeeSelect.scss";

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
];

const EmployeeSelect = () => {
  const employeeStyle: IEmployeeItemStyles = {
    cardScale: 1.2,
    showStoryPointsRemain: false,
  };

  return (
    <section className="employee-select-container">
      <div className="title">
        <p> Choose a employee</p>
      </div>
      <div>
        <EmployeeList
          onEmployeeSelected={() => {}}
          employees={MOCK_EMPLOYEES}
          customStyle={employeeStyle}
        ></EmployeeList>
      </div>
      <div className="infos">
        <p>Task Points Remain</p>
        <p>Budjet Available</p>
      </div>
    </section>
  );
};

export default EmployeeSelect;
