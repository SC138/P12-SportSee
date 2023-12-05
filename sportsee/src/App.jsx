// import { Routes, Route, Navigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./global.css";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { USER18_URL, USER12_URL } from "./api/config";

export function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={USER12_URL} />} />
          <Route path={USER12_URL} element={<Dashboard user={USER12_URL} />} />
          <Route path={USER18_URL} element={<Dashboard user={USER18_URL} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
