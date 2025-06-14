import React, { useState } from "react";
import axios from "../api";
import { saveToken } from "../auth";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/Auth/Login", form);
      saveToken(res.data.token);
      navigate("/posts");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container" style={{ marginTop: "110px" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4 bg-white rounded">
              <h3 className="mb-4 text-center text-dark">Login to Your Account</h3>
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
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
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>

                <div className="mb-3 text-end">
                  <Link to="/forgot-password" className="text-decoration-none text-primary">
                    Forgot Password?
                  </Link>
                </div>

                <button className="btn btn-dark w-100 mb-3">Login</button>
              </form>

              <p className="text-center text-muted">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary text-decoration-none">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;




