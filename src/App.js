import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/Posts";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Navbar from "./components/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/Footer";
import './App.css';
import Home from "./pages/Home";
import ViewPost from "./pages/ViewPost";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/add" element={<AddPost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/view/:id" element={<ViewPost />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
