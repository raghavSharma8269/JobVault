import React, { useEffect } from "react";

const EmailVerificationPage: React.FC = () => {
  useEffect(() => {
    document.title = "Verify Email | JobVault";
  }, []);

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div
        className="p-5 rounded text-center"
        style={{
          backgroundColor: "#292b38",
          color: "#c9c9c9",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h1 className="mb-4 fw-bold">
          Verify Your <span style={{ color: "#7400f0" }}>Email</span>
        </h1>

        <p className="fs-5">
          We've sent a verification link to your email address.
        </p>
        <p className="fs-6" style={{ color: "#9e9ca1" }}>
          Please click the link in that email to complete your registration.
        </p>
        <p className="mt-4">
          If you don’t see the email, be sure to check your spam or junk folder.
        </p>
        <p className="mt-2" style={{ color: "#9e9ca1" }}>
          Still no email?{" "}
          <i
            style={{
              color: "#7400f0",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => (window.location.href = "/contact")}
          >
            Contact Support
          </i>
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
