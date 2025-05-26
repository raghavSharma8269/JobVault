import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Job } from "../../types/Job.ts";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

interface ResumeComponentProps {
  job: Job;
  resumeLoading: boolean;
  setResumeLoading: Dispatch<SetStateAction<boolean>>;
}

const ResumeComponent: FC<ResumeComponentProps> = ({
  job,
  resumeLoading,
  setResumeLoading,
}) => {
  const [feedback, setFeedback] = useState<string>("");
  const { user, loading: userLoading, refreshUser } = useContext(UserContext);

  useEffect(() => {
    setFeedback(job.resumeFeedback || "");
  }, [job.resumeFeedback]);

  const handleGenerateResumeFeedback = async () => {
    if (!job?.id) {
      alert("Job ID is not available");
      return;
    }

    if (user && user.numOfAiRequests >= 8) {
      alert("❌ You've reached your max of 8 AI resume feedback requests.");
      return;
    }

    setResumeLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/profile/resume/${job.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setFeedback(response.data);
      await refreshUser();
    } catch (error) {
      console.error("Error generating resume feedback:", error);
      alert("Failed to generate resume feedback");
    } finally {
      setResumeLoading(false);
    }
  };

  return (
    <div>
      <button
        className="btn default-text-color"
        style={{ backgroundColor: "#7400f0", marginTop: "15px" }}
        onClick={handleGenerateResumeFeedback}
        disabled={resumeLoading}
      >
        {resumeLoading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "not-allowed",
              pointerEvents: "auto",
            }}
          >
            <div
              className="spinner-border text-light"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {resumeLoading ? "Generating..." : "Generate Resume Feedback"}
      </button>

      <p style={{ paddingTop: "15px" }}>
        <span style={{ color: "#d9182b" }}>**</span> Make sure you have your
        resume uploaded <span style={{ color: "#d9182b" }}>**</span>
      </p>

      {!userLoading && user && (
        <p style={{ marginTop: "10px", color: "#9e9ca1" }}>
          🔁 You have {8 - user.numOfAiRequests} AI requests remaining
        </p>
      )}

      {feedback && (
        <div
          className="mt-3 p-3 rounded"
          style={{
            backgroundColor: "#1c1d26",
            color: "#c9c9c9",
            whiteSpace: "normal",
            border: "1px solid #7400f0",
          }}
          dangerouslySetInnerHTML={{ __html: feedback }}
        />
      )}
    </div>
  );
};

export default ResumeComponent;
