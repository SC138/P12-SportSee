import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./global.css";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { USER12_URL } from "./api/config";


export function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={ USER12_URL } replace />} /> 
          <Route path="/user/:id" element={<Dashboard />} />
          <Route path="*" element={"La page demandée n'existe pas"} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

