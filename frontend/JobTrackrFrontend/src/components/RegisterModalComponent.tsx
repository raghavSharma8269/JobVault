import React, { useState } from "react";
import axios from "axios";
import "./ModalComponents.css";

interface RegisterModalComponentProps {
  isVisible: boolean;
  closeModal: () => void;
}

const RegisterModalComponent: React.FC<RegisterModalComponentProps> = ({
  isVisible,
  closeModal,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        fullName,
        email,
        password,
      });

      setSuccessMessage("Registration successful! You can now log in.");
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      // Redirect to email verification page
      window.open("/verify", "_blank");
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.response.data.message);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="modal show" tabIndex={-1} style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content" style={{ backgroundColor: "#1c1d26" }}>
          <div className="modal-header">
            <h5 className="modal-title text-white">Register</h5>
            <button type="button" className="btn-close" onClick={closeModal} />
          </div>
          <div className="modal-body text-white">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  backgroundColor: "#292b38",
                  color: "white",
                  borderColor: "#1c1d26",
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  backgroundColor: "#292b38",
                  color: "white",
                  borderColor: "#1c1d26",
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  backgroundColor: "#292b38",
                  color: "white",
                  borderColor: "#1c1d26",
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  backgroundColor: "#292b38",
                  color: "white",
                  borderColor: "#1c1d26",
                }}
              />
            </div>

            {errorMessage && (
              <div className="alert alert-danger py-2">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="alert alert-success py-2">{successMessage}</div>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={closeModal}>
              Close
            </button>
            <button
              className="btn text-white"
              style={{ backgroundColor: "#7400f0", borderColor: "#7400f0" }}
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModalComponent;
