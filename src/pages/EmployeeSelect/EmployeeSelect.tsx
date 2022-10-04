import EmployeeList from "../../components/employee/EmployeeList";
import { IEmployeeItemStyles } from "../../components/employee/interfaces";
import { employeeGenerator } from "../../utils/employeeGenerator";
import { getResponsiveAttr, IResponsiveAttr } from "../../window.service";
import { IEmployee } from "../interfaces";
import "./EmployeeSelect.scss";

// Responsive

const respCardScale: IResponsiveAttr = {
  mobile: 1,
  small: 1,
  medium: 1.4,
  large: 1.6,
};

const EmployeeSelect = () => {
  const employeeStyle: IEmployeeItemStyles = {
    cardScale: getResponsiveAttr(respCardScale),
    showStoryPointsRemain: false,
  };

  const employees = employeeGenerator(3, "intern");
  return (
    <section className="employee-select-container">
      <div className="title">
        <p> Choose a employee</p>
      </div>
      <div>
        <EmployeeList
          onEmployeeSelected={() => {}}
          employees={employees}
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
