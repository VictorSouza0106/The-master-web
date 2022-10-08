import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import EmployeeSelect from "./pages/EmployeeSelect/EmployeeSelect";
import Dashboard from "./pages/EmployeeSelect/DashBoard/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={MainPage()} path="/" />
        <Route element={EmployeeSelect()} path="/select" />
        <Route element={Dashboard()} path="dashboard"></Route>
      </Routes>
    </Router>
  );
}
