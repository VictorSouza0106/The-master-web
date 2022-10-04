import create from "zustand/react";
import { IEmployee } from "../pages/interfaces";

export interface IEmployeeStore {
  employees: IEmployee[];
}

const employeeStore = create<IEmployeeStore>((set) => ({
  employees: [],
  addEmployee: (employee: IEmployee) =>
    set((state) => ({
      employees: [...state.employees, employee],
    })),
}));
