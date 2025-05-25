import React, { useEffect, useState } from "react";
import logo from "../../public/JobVaultLightPurple.svg";
import LoginModalComponent from "../components/LoginModalComponent";
import RegisterModalComponent from "../components/RegisterModalComponent";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  useEffect(() => {
    document.title = "JobVault";
  }, []);

  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);

  const openLoginModal = () => setIsLoginModalVisible(true);
  const closeLoginModal = () => setIsLoginModalVisible(false);

  const openRegisterModal = () => setIsRegisterModalVisible(true);
  const closeRegisterModal = () => setIsRegisterModalVisible(false);

  const navigate = useNavigate();

  console.log("Rendering WelcomePage");

  return (
    <div className="container-fluid vh-100 d-flex align-items-center overflow-auto">
      <div className="row w-100">
        {/* Left Section - Logo and Info */}
        <div
          className="col-md-6 d-flex flex-column justify-content-start align-items-start text-white ps-5"
          style={{
            backgroundColor: "#1c1d26",
            height: "100vh",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <h1
            className="fw-light"
            style={{ color: "#c9c9c9", marginTop: "10px" }}
          >
            Welcome to
          </h1>
          <img
            src={logo}
            alt="JobVault Logo"
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              marginTop: "10px",
            }}
          />

          <div className="mt-4 px-2" style={{ maxWidth: "500px" }}>
            <h2 className="fw-bold" style={{ color: "#c9c9c9" }}>
              Secure Your Future with JobVault
            </h2>
            <p
              className="mt-3"
              style={{
                color: "#aaaaaa",
                fontSize: "1.1rem",
                lineHeight: "1.6",
              }}
            >
              JobVault isn't just another job board. It's your personal hub for
              tracking applications, storing resumes, and staying organized
              throughout your job hunt — all in one secure place.
            </p>
            <p style={{ color: "#aaaaaa", fontSize: "1rem" }}>
              No more scattered spreadsheets. No more missed deadlines. Just
              clarity and confidence.
            </p>
          </div>
        </div>

        {/* Right Section - Buttons */}
        <div
          className="col-md-6 d-flex flex-column justify-content-center align-items-center"
          style={{ backgroundColor: "#292b38", height: "100vh" }}
        >
          <div
            className="d-flex flex-column justify-content-center align-items-center mb-4"
            style={{ borderRadius: "0 10px 10px 0", height: "100vh" }}
          >
            <h1 className="display-4 text-white text-start mb-5 fw-bold">
              Begin Your <span style={{ color: "#7400f0" }}>Job</span> Hunt
            </h1>

            <button
              type="button"
              className="btn btn-lg mb-4 text-white"
              style={{ backgroundColor: "#7400f0", borderColor: "#7400f0" }}
              onClick={openRegisterModal}
            >
              Register
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={openLoginModal}
            >
              Login
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-lg mt-xxl-5"
              onClick={() => navigate("/contact")}
            >
              Contact Us <i className="bi bi-question-circle" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LoginModalComponent
        isVisible={isLoginModalVisible}
        closeModal={closeLoginModal}
      />
      <RegisterModalComponent
        isVisible={isRegisterModalVisible}
        closeModal={closeRegisterModal}
      />
    </div>
  );
};

export default WelcomePage;
