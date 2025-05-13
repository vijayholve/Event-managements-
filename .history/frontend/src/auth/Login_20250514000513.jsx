import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { API_ENDPOINTS } from "../features/base/config";
import { Button, CircularProgress, TextField, Alert } from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [blockbtn, setBlockBtn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBlockBtn(true);

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed"); // Using the backend error message
      }
  

      dispatch(
        loginSuccess({
          user: {
            username: data.username,
            email: data.email,
            role: data.role,
          },
          tokens: {
            access: data.access,
            refresh: data.refresh,
          },
        })
      );

      setBlockBtn(false);
      navigate("/home");
    } catch (err) {
      setError(err.message);
      setBlockBtn(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 to-gray-900">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="mb-4"
            />
          </div>

          <div className="mb-6">
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mb-4"
            />
          </div>

          {error && (
            <div className="mb-4">
              <Alert severity="error">{error}</Alert>
            </div>
          )}

          <div className="flex justify-center mb-4">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={blockbtn}
              className="flex justify-center"
            >
              {blockbtn ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
