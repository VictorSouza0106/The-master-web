import { IEmployee } from "../../pages/interfaces";

export interface IEmployeeListProps {
  employees: IEmployee[];
  onEmployeeSelected: Function;
  selectedEmployee?: IEmployee;
  customStyle?: IEmployeeItemStyles;
}

export interface IEmployeeItemProps {
  employee: IEmployee;
  selectedEmployee: boolean;
  customStyle?: IEmployeeItemStyles;
}

export interface IEmployeeItemStyles {
  showName?: boolean;
  showSalary?: boolean;
  showReworkrPercent?: boolean;
  showBugPercent?: boolean;
  showStoryPointsRemain?: boolean;
  showTotalStoryPoints?: boolean;
  cardScale?: number;
}
