import { useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";
import { gameProgressStore } from "../../../stores/gameProgressStore";
const Dashboard = () => {
  const gameProgressCycles = gameProgressStore((state) => state.cycles);
  console.log(gameProgressCycles);

  useEffect(() => {
    console.log(gameProgressCycles);
  }, []);

  const data = [
    { name: "Page A", uv: 400 },
    { name: "Page A", uv: 350 },
    { name: "Page A", uv: 600 },
  ];

  const renderLineChart = (
    <div style={{ display: "flex" }}>
      <LineChart
        width={600}
        height={300}
        data={gameProgressCycles}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line
          name="Tasks"
          type="monotone"
          dataKey="totalTasks"
          stroke="#8884d8"
        />
        <Line
          name="Reworks"
          type="monotone"
          dataKey="totalReworks"
          stroke="#ffff00"
        />
        <Line
          name="Bugs"
          type="monotone"
          dataKey="totalBugs"
          stroke="#ff0000"
        />
        <Line
          name="Employees"
          type="monotone"
          dataKey="employeesWorks"
          stroke="#0000ff"
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="sprintName" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
      <LineChart
        width={600}
        height={300}
        data={gameProgressCycles}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="totalStoryPts" stroke="#00ff00" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="sprintName" />
        <YAxis />
      </LineChart>
    </div>
  );
  return <div>Dashboard Works!{renderLineChart}</div>;
};

export default Dashboard;
