import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";
import Courses from "./pages/courses";
import Profile from "./pages/profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;