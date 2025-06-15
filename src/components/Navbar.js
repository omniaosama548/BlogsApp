import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { removeToken, getToken } from "../auth";

function Navbar() {
  const navigate = useNavigate();
  const token = getToken();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const isHome = location.pathname === "/";

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

 useEffect(() => {
  const landing = document.getElementById("landing");

  if (!isHome || !landing) {
    setScrolled(true); 
    return;
  }
  
  const onScroll = () => {
    const landingHeight = landing.offsetHeight;
    const scrollPosition = window.scrollY;

    setScrolled(scrollPosition > landingHeight - 50);
  };

  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, [isHome]);

  return (
  <nav
  className={`navbar navbar-expand-lg pt-2 
    ${isHome && !scrolled ? "transparent-nav fixed-top" : "scrolled-nav fixed-top"}
  `}
>
      <Link
        className="navbar-brand fw-bold fs-3"
        to="/"
        style={{
          textShadow: "1px 1px 8px rgba(13, 202, 240, 0.4)",
          color: "#3a80d6",
        }}
      >
        MyBlog
      </Link>

      <button
        className="navbar-toggler bg-light"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav align-items-center gap-3">
          <li className="nav-item">
            <Link className={`nav-link fs-5 ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
          </li>

          {token ? (
            <>
              <li className="nav-item">
                <Link className={`nav-link fs-5 ${location.pathname === "/add" ? "active" : ""}`} to="/add">Add Post</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link fs-5 ${location.pathname === "/posts" ? "active" : ""}`} to="/posts">My Posts</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-dark logout" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className={`nav-link fs-5 ${location.pathname === "/login" ? "active" : ""}`} to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className={`btn btn-signup fs-5 ${location.pathname === "/register" ? "active" : ""}`} to="/register">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;



