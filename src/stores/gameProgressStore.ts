import create from "zustand";

export interface IGameStore {
  cycles: IScrumCycle[];
  addCycle: Function;
}

export interface IScrumCycle {
  totalStoryPts: number;
  totalTasks: number;
  totalBugs: number;
  totalReworks: number;
  employeesWorks: number;
  budgetSpend: number;
}

export type IScrumCycleAttrs =
  | "totalStoryPts"
  | "totalTasks"
  | "totalBugs"
  | "totalReworks"
  | "employeesWorks"
  | "budgetSpend";

export const defaultCycle: IScrumCycle = {
  budgetSpend: 0,
  employeesWorks: 0,
  totalBugs: 0,
  totalReworks: 0,
  totalStoryPts: 0,
  totalTasks: 0,
};

export const gameProgressStore = create<IGameStore>((set) => ({
  cycles: [],
  a: () => {
    console.log("Teste Store");
  },
  addCycle: (cycle: IScrumCycle) => {
    set((state) => ({
      cycles: [...state.cycles, cycle],
    }));
  },
}));
