import React, { useState } from "react";
import axios from "../api";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateName = (name) => /^[a-zA-Z\s]{3,30}$/.test(name);
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateName(form.name)) {
      setError("Name should be 3-30 characters and only letters and spaces.");
      return;
    }
    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(form.password)) {
      setError(
        "Password must be at least 6 characters, including letters and numbers."
      );
      return;
    }

    try {
      await axios.post("/Auth/Register", form);
      navigate("/login");
    } catch (err) {
      setError("Something went wrong. Try another email.");
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4 bg-white rounded">
              <h3 className="mb-4 text-center text-dark">Create an Account</h3>
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-secondary">Name</label>
                  <input
                    type="text"
                    className="form-control border border-primary"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary">Email</label>
                  <input
                    type="email"
                    className="form-control border border-primary"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control border border-primary"
                      name="password"
                      required
                      value={form.password}
                      onChange={handleChange}
                    />
                    <span
                      className="input-group-text bg-white border-primary"
                      style={{ cursor: "pointer" }}
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>

                <button className="btn btn-dark w-100">Register</button>
              </form>

              <p className="text-center text-muted mt-3">
                Already have an account?{" "}
                <Link to="/login" className="text-primary text-decoration-none">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;




