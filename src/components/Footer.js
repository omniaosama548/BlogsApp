import React from "react";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaGithub,
} from "react-icons/fa";
import { getToken } from "../auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Footer.css";

function Footer() {
  const navigate = useNavigate();

  const handleAddClick = () => {
    if (getToken()) {
      navigate("/add");
    } else {
      navigate("/login");
    }
  };

  return (
    <motion.footer
      className="bg-dark text-light pt-5 pb-3 mt-5"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true}}
    >
      <div className="container">
        <div className="row text-center text-md-start">
          {/* About */}
          <motion.div
            className="col-md-4 mb-4"
            initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0 }}
  viewport={{ once: true, amount: 0.1 }}
          >
            <h5 className="text-info mb-3">About Omnia Blog</h5>
            <p style={{ fontSize: "14px", letterSpacing: "1.5px" }}>
              Omnia Blog is a personal project focused on sharing knowledge,
              creativity, and life experiences through simple yet powerful blog posts.
              Whether you're into tech, design, or just exploring, this space is made
              with passion to inspire and connect.
            </p>
          </motion.div>

          {/* Divider */}
          <div className="d-none d-md-block col-md-1 d-flex align-items-center justify-content-center">
            <div
              style={{
                width: "1px",
                height: "100%",
                backgroundColor: "#fff",
                opacity: 0.2,
              }}
            />
          </div>

          {/* Quick Links */}
          <motion.div
            className="col-md-3 mb-4"
           initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0 }}
  viewport={{ once: true, amount: 0.1 }}
          >
            <h5 className="text-info mb-3">Quick Links</h5>
            <ul className="list-unstyled" style={{ fontSize: "14px", lineHeight: "2" }}>
              <li>
                <a href="/" className="text-light text-decoration-none">Home</a>
              </li>
              <li>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  handleAddClick();
                }} className="text-light text-decoration-none">Add post</a>
              </li>
              <li>
                <a href="/login" className="text-light text-decoration-none">Login</a>
              </li>
              <li>
                <a href="/register" className="text-light text-decoration-none">Register</a>
              </li>
            </ul>
          </motion.div>

          {/* Divider */}
          <div className="d-none d-md-block col-md-1 d-flex align-items-center justify-content-center">
            <div
              style={{
                width: "1px",
                height: "100%",
                backgroundColor: "#fff",
                opacity: 0.2,
              }}
            />
          </div>

          {/* Contact */}
          <motion.div
           className="col-md-3 mb-4"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0 }}
  viewport={{ once: true, amount: 0.1 }}
          >
            <h5 className="text-info mb-3">Connect With Me</h5>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="https://www.linkedin.com/in/omnia-osama-6754b3206" target="_blank" rel="noreferrer" className="text-light icon-hover"><FaLinkedin size={22} /></a>
              <a href="https://www.facebook.com/profile.php?id=61566883538588" target="_blank" rel="noreferrer" className="text-light icon-hover"><FaFacebook size={22} /></a>
              <a href="https://www.instagram.com/omniaosama2002/" target="_blank" rel="noreferrer" className="text-light icon-hover"><FaInstagram size={22} /></a>
              <a href="https://wa.me/201234567890" target="_blank" rel="noreferrer" className="text-light icon-hover"><FaWhatsapp size={22} /></a>
              <a href="https://github.com/omniaosama548" target="_blank" rel="noreferrer" className="text-light icon-hover"><FaGithub size={22} /></a>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="text-center mt-4"
          style={{ fontSize: "13px", color: "#aaa" }}
         initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0 }}
  viewport={{ once: true, amount: 0.1 }}
        >
          &copy; {new Date().getFullYear()} Omnia Blog. All rights reserved.
        </motion.div>
      </div>

      {/* Hover Effect */}
      <style>{`
        .icon-hover {
          transition: transform 0.3s, color 0.3s;
        }
        .icon-hover:hover {
          transform: scale(1.3);
          color: #0dcaf0;
        }
      `}</style>
    </motion.footer>
  );
}

export default Footer;

