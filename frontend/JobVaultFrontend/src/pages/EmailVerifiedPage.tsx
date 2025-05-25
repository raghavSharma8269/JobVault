import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const EmailVerifiedPage: React.FC = () => {
  const [params] = useSearchParams();
  const success = params.get("success") === "true";

  useEffect(() => {
    document.title = "Email Verification | JobVault";
  }, []);

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="text-center p-5 rounded"
        style={{
          backgroundColor: "#292b38",
          color: "#c9c9c9",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h1 className="fw-bold mb-4">
          {success ? (
            <>
              Email <span style={{ color: "#7400f0" }}>Verified</span>!
            </>
          ) : (
            <>
              <span style={{ color: "#d9182b" }}>Verification Failed</span>
            </>
          )}
        </h1>
        <p className="fs-5">
          {success
            ? "You can now log in to your account."
            : "The verification link is invalid or expired."}
        </p>
      </div>
    </div>
  );
};

export default EmailVerifiedPage;
