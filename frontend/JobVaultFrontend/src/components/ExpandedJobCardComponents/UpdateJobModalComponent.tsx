import React, { useEffect, useState } from "react";
import axios from "axios";
import { Job } from "../../types/Job.ts";
import { useJobContext } from "../../context/JobContext.tsx";

interface Props {
  job: Job;
}

const UpdateJobModalComponent: React.FC<Props> = ({ job }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompany] = useState("");
  const [jobDescription, setDescription] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [jobLocation, setLocation] = useState("");
  const [jobSalary, setSalary] = useState("");

  const { refreshJobs } = useJobContext();

  useEffect(() => {
    if (job) {
      setJobTitle(job.jobTitle);
      setCompany(job.companyName);
      setDescription(job.jobDescription);
      setJobUrl(job.jobUrl);
      setLocation(job.jobLocation);
      setSalary(job.jobSalary);
    }
  }, [job]);

  const handleUpdateJob = async () => {
    try {
      const token = localStorage.getItem("token");

      const updatedJob = {
        jobTitle,
        companyName,
        jobDescription,
        jobUrl,
        jobLocation,
        jobSalary,
        favorite: job.favorite,
        applicationStatus:
          job.applicationStatus === "none"
            ? null
            : job.applicationStatus.toUpperCase(),
      };

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/jobs/${job.id}`,
        updatedJob,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Job updated successfully!");
      refreshJobs();
    } catch (error) {
      console.error("Error updating job:", error);

      if (axios.isAxiosError(error) && error.response) {
        const backendMessage = error.response.data;
        alert(backendMessage.message || "Failed to update job.");
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <div
      className="modal fade default-text-color"
      id="updateJobModal"
      tabIndex={-1}
      aria-labelledby="updateJobModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header light-bg">
            <h1 className="modal-title fs-5" id="updateJobModalLabel">
              Update Job
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body light-bg">
            <h5>
              Job Title <span style={{ color: "#d9182b" }}>*</span>
            </h5>
            <input
              className="form-control light-bg mb-4"
              placeholder="Enter Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />

            <h5>
              Company <span style={{ color: "#d9182b" }}>*</span>
            </h5>
            <input
              className="form-control light-bg mb-4"
              placeholder="Enter Company Name"
              value={companyName}
              onChange={(e) => setCompany(e.target.value)}
            />

            <h5>
              Description <span style={{ color: "#d9182b" }}>*</span>
            </h5>
            <input
              className="form-control light-bg mb-4"
              placeholder="Enter Job Description"
              value={jobDescription}
              onChange={(e) => setDescription(e.target.value)}
            />

            <h5>
              Job Page URL <span style={{ color: "#d9182b" }}>*</span>
            </h5>
            <input
              className="form-control light-bg mb-4"
              placeholder="Enter Job URL"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
            />

            <h5>Location</h5>
            <input
              className="form-control light-bg mb-4"
              placeholder="Enter Job Location"
              value={jobLocation}
              onChange={(e) => setLocation(e.target.value)}
            />

            <h5>Salary</h5>
            <input
              className="form-control light-bg mb-4"
              placeholder="Enter Salary"
              value={jobSalary}
              onChange={(e) => setSalary(e.target.value)}
            />

            <div className="d-flex justify-content-center mb-4">
              <button
                className="btn purple-bg default-text-color"
                onClick={handleUpdateJob}
              >
                Update Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateJobModalComponent;
