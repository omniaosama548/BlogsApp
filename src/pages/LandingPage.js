import React from "react";
import { useState,useEffect } from "react";
import "./LandingPage.css"; 
import { useNavigate } from "react-router-dom";
import {  Link } from "react-router-dom";
import { getToken } from "../auth";

function LandingPage() {
const fullText = "Start Your Post Now";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
const navigate = useNavigate();

  const handleAddClick = () => {
    if (getToken()) {
      navigate("/add");
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && index < fullText.length) {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      } else if (isDeleting && index > 0) {
        setText((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
      } else if (!isDeleting && index === fullText.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [index, isDeleting]);

  return (
    <div className="landing">
      <div className="overlay text-center text-white">
        <h1 className="text  animated-text">Where Every Post Tells a Story</h1>
         <p className="lead mt-1 animated-text fs-2">{text}<span className="cursor">|</span></p>
   <button onClick={handleAddClick} className="custom-btn animated-text">
      <span className="text-white fw-bold fs-4">From Here</span>
    </button>
      </div>
    </div>
  );
}

export default LandingPage;
