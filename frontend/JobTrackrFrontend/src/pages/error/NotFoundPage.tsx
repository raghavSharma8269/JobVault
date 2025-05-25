import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/JobVaultLightPurple.svg";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 | Page Not Found";
  }, []);

  return (
    <div className="container-fluid vh-100 d-flex align-items-center">
      <div className="row w-100">
        {/* Left - Branding */}
        <div
          className="col-md-6 d-flex flex-column justify-content-center align-items-start text-white ps-5"
          style={{ backgroundColor: "#1c1d26", height: "100vh" }}
        >
          <h1 className="display-4 fw-bold">
            Lost in the <span style={{ color: "#7400f0" }}>Job</span> Hunt?
          </h1>
          <p className="lead mt-3">
            We couldn't find the page you're looking for.
          </p>
          <img
            src={logo}
            alt="Not Found Illustration"
            style={{ width: "400px", height: "400px", marginTop: "20px" }}
          />
        </div>

        {/* Right - Return Button */}
        <div
          className="col-md-6 d-flex flex-column justify-content-center align-items-center"
          style={{ backgroundColor: "#292b38", height: "100vh" }}
        >
          <h1 className="display-1 text-white fw-bold">404</h1>
          <p className="text-white fs-4 mb-4">Page Not Found</p>
          <button
            className="btn btn-lg text-white"
            style={{ backgroundColor: "#7400f0", borderColor: "#7400f0" }}
            onClick={() => navigate("/dashboard")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
