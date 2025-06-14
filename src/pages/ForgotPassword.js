import React, { useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setResetCode("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const res = await axios.post("/Auth/ForgotPassword", { email });
      setMessage("Reset code sent. Check your email or contact admin.");
      setResetCode(res.data.code); 
    } catch (err) {
      setError("User not found.");
    }
  };

  const goToReset = () => {
    navigate("/reset-password", { state: { email, code: resetCode } });
  };

  return (
    <div className="container col-md-6" style={{ marginTop: "130px" }}>
      <h3 className="mb-4 text-center">Forgot Password</h3>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn bg-dark text-white w-100">
          Send Reset Code
        </button>
      </form>

      {message && (
        <div className="alert alert-success mt-3">
          {message}{" "}
          {resetCode && (
            <>
              <div><strong>Code:</strong> {resetCode}</div>
              <button className="btn btn-success mt-3" onClick={goToReset}>
                Continue to Reset Password
              </button>
            </>
          )}
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-3">{error}</div>
      )}
    </div>
  );
}

export default ForgotPassword;

