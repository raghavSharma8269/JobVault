import React, { useEffect } from "react";
import logo from "../assets/JobTrackr.png";
import { useNavigate } from "react-router-dom";

const ContactPage: React.FC = () => {
  //changes tab name
  useEffect(() => {
    document.title = "Contact | JobVault";
  }, []);

  const navigate = useNavigate();

  return (
    <div className="container-fluid vh-100 d-flex align-items-center">
      <div className="row w-100">
        {/* Left Section */}
        <div
          className="col-md-6 d-flex flex-column justify-content-start align-items-start text-white ps-5"
          style={{ backgroundColor: "#1c1d26", height: "100vh" }}
        >
          <h1
            className="display-4 mb-4 text-start fw-bold"
            style={{ marginTop: "35px" }}
          >
            Get in <span style={{ color: "#7400f0" }}>Touch</span>
          </h1>

          <img
            src={logo}
            alt="Logo"
            style={{
              width: "500px",
              height: "500px",
              marginTop: "20px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/dashboard")}
          />
        </div>

        {/* Right Section */}
        <div
          className="col-md-6 d-flex flex-column justify-content-center align-items-center"
          style={{ backgroundColor: "#292b38", height: "100vh" }}
        >
          <div className="w-75">
            <h2 className="text-white mb-4 fw-bold">Send Us a Message</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-white">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control text-white"
                  id="name"
                  placeholder="Your name"
                  style={{ backgroundColor: "#1c1d26", borderColor: "#1c1d26" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-white">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control text-white"
                  id="email"
                  placeholder="you@example.com"
                  style={{ backgroundColor: "#1c1d26", borderColor: "#1c1d26" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label text-white">
                  Message
                </label>
                <textarea
                  className="form-control text-white"
                  id="message"
                  rows={4}
                  placeholder="Your message here..."
                  style={{ backgroundColor: "#1c1d26", borderColor: "#1c1d26" }}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn text-white mt-1"
                style={{ backgroundColor: "#7400f0", borderColor: "#7400f0" }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
