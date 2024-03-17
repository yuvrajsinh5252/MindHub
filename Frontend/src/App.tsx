import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/home";
import Dashboard from "./pages/user/dashboard";
import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";
import MyCourses from "./pages/user/Mycourses";
import Profile from "./pages/profile";
import { Toaster } from "./components/ui/toaster";
import CreaterStudio from "./pages/creater/creater-studio";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
        <Route path="/creater-studio" element={<ProtectedRoute><CreaterStudio /></ProtectedRoute>} />
        <Route path="*">"404 Not Found"</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;