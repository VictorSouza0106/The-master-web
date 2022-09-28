import "./Employee.scss";
import { IEmployeeItemProps, IEmployeeItemStyles } from "./interfaces";
import classNames from "classnames";

const EmployeeCard = ({
  employee,
  selectedEmployee,
  customStyle,
}: IEmployeeItemProps) => {
  const storyPtsRemain =
    employee.storyPointsPerSprint - employee.storyPointsAllocated;

  const {
    showName,
    showSalary,
    showStoryPointsRemain,
    showTotalStoryPoints,
    showBugPercent,
    showReworkrPercent,
    cardScale,
  } = (customStyle as IEmployeeItemStyles) || {};

  return (
    <div
      style={{ transform: `scale(${cardScale ?? 1})` }}
      className={classNames("employee-card", {
        "selected-employee": selectedEmployee,
      })}
    >
      {showStoryPointsRemain ?? (
        <div className="story-pts-remain">
          {storyPtsRemain}
          {selectedEmployee}
        </div>
      )}

      <div>
        <img
          src="https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
          alt="placeholder"
        />
      </div>
      <div className="employee-info">
        <p>s{showName ?? employee.name}</p>
        {showSalary ?? <p>R${employee.salary}</p>}
      </div>
      <div className="employee-status">
        <div>
          <i className="mdi mdi-alert"></i>
          <p>{showReworkrPercent ?? employee.reworkRisk}%</p>
        </div>
        <div>
          <p>{showBugPercent ?? employee.bugRisk}%</p>
          <i className="mdi mdi-bug"></i>
        </div>
      </div>
      <div className="total-story-pts">
        <span>{showTotalStoryPoints ?? employee.storyPointsPerSprint}</span>
      </div>
    </div>
  );
};

export default EmployeeCard;
