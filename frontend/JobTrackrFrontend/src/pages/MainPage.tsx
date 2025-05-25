import gearSvg from "../assets/gear.svg";
import clipBoardSvg from "../assets/clipboard-check.svg";
import SettingsPage from "./SettingsPage";
import logOutSvg from "../assets/box-arrow-left.svg";
import logo from "../assets/JobVaultLightPurple.svg";
import questionMarkSvg from "../assets/question-circle.svg";
import JobsPage from "./JobsPage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [activePage, setActivePage] = useState<"jobs" | "settings" | "logout">(
    "jobs",
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/welcome");
  };

  const handleContact = () => {
    window.open("/contact", "_blank");
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center">
      <div className="row w-100">
        {/* Left Section - Sidebar */}
        <div
          className="col-md-2 d-flex flex-column justify-content-start align-items-start text-white ps-5"
          style={{
            backgroundColor: "#292b38",
            height: "100vh",
            borderRadius: "0 10px 0px 0",
          }}
        >
          <div
            className="container d-flex justify-content-center align-items-start"
            style={{ height: "100%" }}
          >
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center align-items-start">
                <h1
                  className="mb-4 text-start fw-bold align-items-start"
                  style={{
                    marginTop: "35px",
                    fontSize: "1.5rem",
                    color: "#c9c9c9",
                    wordWrap: "break-word",
                    maxWidth: "100%",
                    borderBottom: "2px solid #c9c9c9",
                    paddingBottom: "10px",
                  }}
                >
                  <img
                    src={logo}
                    alt="JobVault Logo"
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  />
                </h1>
              </div>
              {/* Jobs Button */}
              <button
                className="btn mt-2 btn-lg d-flex align-items-center section-change-button"
                style={{
                  color: "#c9c9c9",
                  backgroundColor:
                    activePage === "jobs" ? "#1c1d26" : "transparent",
                }}
                onClick={() => setActivePage("jobs")}
              >
                <img
                  src={clipBoardSvg}
                  alt="Clipboard Icon"
                  style={{ marginRight: "10px", width: "20px", height: "20px" }}
                />
                Jobs
              </button>
              {/* Settings Button */}
              <button
                className="btn mt-5 btn-lg d-flex align-items-center section-change-button"
                style={{
                  color: "#c9c9c9",
                  backgroundColor:
                    activePage === "settings" ? "#1c1d26" : "transparent",
                }}
                onClick={() => setActivePage("settings")}
              >
                <img
                  src={gearSvg}
                  alt="Gear Icon"
                  style={{ marginRight: "10px", width: "20px", height: "20px" }}
                />
                Settings
              </button>

              {/* Contact Button */}
              <button
                className="btn mt-5 btn-lg d-flex align-items-center section-change-button default-text-color"
                onClick={handleContact}
              >
                <img
                  src={questionMarkSvg}
                  alt="Question Mark Icon"
                  style={{ marginRight: "10px", width: "20px", height: "20px" }}
                />
                Contact
              </button>

              {/* Log Out Button */}
              <button
                className="btn mt-5 btn-lg d-flex align-items-center section-change-button"
                style={{
                  color: "#c9c9c9",
                  backgroundColor:
                    activePage === "logout" ? "#1c1d26" : "transparent",
                }}
                onClick={handleLogout}
              >
                <img
                  src={logOutSvg}
                  alt="Log Out Icon"
                  style={{ marginRight: "10px", width: "20px", height: "20px" }}
                />
                Log Out
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - Main Content */}
        <div className="col-md-10 d-flex justify-content-center align-items-center">
          {activePage === "jobs" ? (
            <JobsPage />
          ) : (
            <SettingsPage closeSettingsPage={() => setActivePage("jobs")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
