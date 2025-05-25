import React from "react";
import axios from "axios";
import { useJobContext } from "../../context/JobContext.tsx";

interface Props {
  id: string;
}

const DeleteJobIcon: React.FC<Props> = ({ id }) => {
  const { refreshJobs } = useJobContext();

  const handleDeleteJob = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8080/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Job deleted successfully!");
      // Refresh the job list after deletion
      refreshJobs();
    } catch (error) {
      console.error("Error deleting job:", error);

      if (axios.isAxiosError(error) && error.response) {
        const backendMessage = error.response.data;

        if (backendMessage.message) {
          alert(backendMessage.message);
        }
      } else {
        alert("An unknown error occurred.");
      }
    }
  };
  return (
    <i
      className="bi bi-trash delete-icon-btn"
      style={{
        fontSize: "2rem",
        cursor: "pointer",
        display: "inline-block",
        position: "absolute",
        top: "-3px",
        left: "200px",
      }}
      onClick={handleDeleteJob}
    />
  );
};
export default DeleteJobIcon;
