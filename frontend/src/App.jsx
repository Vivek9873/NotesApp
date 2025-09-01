import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./component/SignUp";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import NotesPage from "./component/NotesPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notes/:notesId" element={<NotesPage />} />
        <Route path="*" element={<Navigate to={"/dashboard"} />} />
      </Routes>
    </>
  );
}

export default App;
