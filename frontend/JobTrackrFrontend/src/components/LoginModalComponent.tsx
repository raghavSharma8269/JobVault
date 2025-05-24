import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ModalComponents.css";

interface LoginModalComponentProps {
  isVisible: boolean;
  closeModal: () => void;
}

const LoginModalComponent: React.FC<LoginModalComponentProps> = ({
  isVisible,
  closeModal,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        },
      );

      console.log("Login Response: " + JSON.stringify(response, null, 2));

      const token = response.data;

      if (token) {
        localStorage.setItem("token", token);
        closeModal(); // hide the modal
        navigate("/dashboard"); // redirect to dashboard page
      } else {
        setErrorMessage("Login failed. Invalid token.");
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="modal show" tabIndex={-1} style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content" style={{ backgroundColor: "#292b38" }}>
          <div className="modal-header">
            <h5 className="modal-title text-white">Login</h5>
            <button type="button" className="btn-close" onClick={closeModal} />
          </div>
          <div className="modal-body text-white">
            <div className="mb-3">
              <label htmlFor="login-email" className="form-label">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  backgroundColor: "#1c1d26",
                  color: "white",
                  borderColor: "#1c1d26",
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="login-password" className="form-label">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  backgroundColor: "#1c1d26",
                  color: "white",
                  borderColor: "#1c1d26",
                }}
              />
            </div>
            {errorMessage && (
              <div className="alert alert-danger py-2">{errorMessage}</div>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={closeModal}>
              Close
            </button>
            <button
              className="btn text-white"
              style={{ backgroundColor: "#7400f0", borderColor: "#7400f0" }}
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModalComponent;
