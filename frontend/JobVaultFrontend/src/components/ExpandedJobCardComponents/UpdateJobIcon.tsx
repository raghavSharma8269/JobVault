import React from "react";
import { Job } from "../../types/Job";
import UpdateJobModalComponent from "./UpdateJobModalComponent.tsx";

interface Props {
  job: Job;
}

const UpdateJobIcon: React.FC<Props> = ({ job }) => {
  return (
    <>
      <i
        className="bi bi-pencil icon-btn"
        style={{
          fontSize: "2rem",
          cursor: "pointer",
          display: "inline-block",
          position: "absolute",
          top: "-3px",
          left: "150px",
        }}
        data-bs-toggle="modal"
        data-bs-target="#updateJobModal" // This must match the modal ID exactly
      />
      <UpdateJobModalComponent job={job} />
    </>
  );
};

export default UpdateJobIcon;
