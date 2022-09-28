import "./Employee.scss";
import { IEmployeeListProps } from "./interfaces";
import EmployeeCard from "./EmployeeCard";

const EmployeeList = ({
  employees,
  onEmployeeSelected,
  selectedEmployee,
  customStyle,
}: IEmployeeListProps) => {
  return (
    <div className="employee-list">
      {employees.map((emp) => (
        <div onClick={onEmployeeSelected(emp)} key={emp.id}>
          <EmployeeCard
            selectedEmployee={selectedEmployee?.id === emp.id}
            employee={emp}
            customStyle={customStyle}
          />
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
