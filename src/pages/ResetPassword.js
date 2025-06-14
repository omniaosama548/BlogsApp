import React, { useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [form, setForm] = useState({
    email: "",
    resetCode: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleResendCode = async () => {
    try {
      await axios.post("/Auth/ResendResetCode", { email: form.email });
      setError("");
      setMessage("A new reset code has been sent to your email.");
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  setError("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  const password = form.newPassword;

  if (!emailRegex.test(form.email)) {
    setError("Please enter a valid email.");
    return;
  }

  if (!passwordRegex.test(password)) {
    setError("Password must be at least 6 characters and contain both letters and numbers.");
    return;
  }

  try {
    await axios.post("/Auth/ResetPassword", form);
    setMessage("Password reset successfully. Redirecting to login...");
    setTimeout(() => navigate("/login"), 2000);
  } catch (err) {
    setError("Invalid code or expired.");
  }
};


  return (
    <div className="container col-md-6" style={{ marginTop: "130px" }}>
      <h3 className="mb-4 text-center">Reset Password</h3>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
        <div className="mb-3">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Reset Code</label>
          <input
            name="resetCode"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>New Password</label>
          <div className="input-group">
            <input
              name="newPassword"
              type={showPassword ? "text" : "password"}
              className="form-control"
              required
              onChange={handleChange}
            />
            <span
              className="input-group-text"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </span>
          </div>
          <small className="text-muted">Password must be at least 6 characters.</small>
        </div>

        <button className="btn bg-dark text-white w-100">Reset Password</button>
      </form>

      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default ResetPassword;




