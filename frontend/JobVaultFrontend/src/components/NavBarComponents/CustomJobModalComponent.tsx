import React, { useState } from "react";
import axios from "axios";
import { useJobContext } from "../../context/JobContext.tsx";

const CustomJobModalComponent = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompany] = useState("");
  const [jobDescription, setDescription] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [jobLocation, setLocation] = useState("");
  const [jobSalary, setSalary] = useState("");

  const { refreshJobs } = useJobContext();

  const handleAddJob = async () => {
    try {
      const token = localStorage.getItem("token");

      // data to be sent to the backend
      const jobData = {
        jobTitle,
        companyName,
        jobDescription,
        jobUrl,
        jobLocation,
        jobSalary,
        favorite: false,
        applicationStatus: null,
      };

      await axios.post(
        "http://localhost:8080/api/jobs/create/custom",
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Reset form
      setJobTitle("");
      setCompany("");
      setDescription("");
      setJobUrl("");
      setLocation("");
      setSalary("");

      alert("Job added successfully!");
      refreshJobs();
    } catch (error) {
      console.error("Error adding job:", error);

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
    <div
      className="modal fade default-text-color"
      id="newCustomJobModal"
      tabIndex={-1}
      aria-labelledby="newCustomJobModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header light-bg">
            <h1 className="modal-title fs-5" id="newJobModalLabel">
              Add Custom Job
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body light-bg">
            <h5>
              Job Title <span style={{ color: "#d9182b" }}>*</span>
            </h5>
            <input
              type="text"
              className="form-control light-bg mb-4"
              placeholder="Enter Job Title"
              required
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />

            <h5>
              Company <span style={{ color: "#d9182b" }}>*</span>
            </h5>
            <input
              type="text"
              className="form-control light-bg mb-4"
              placeholder="Enter Company Name"
              required
              value={companyName}
              onChange={(e) => setCompany(e.target.value)}
            />

            <h5>
              Description <span style={{ color: "#d9182b" }}>*</span>
            </h5>
            <input
              type="text"
              className="form-control light-bg mb-4"
              placeholder="Enter Job Description"
              required
              value={jobDescription}
              onChange={(e) => setDescription(e.target.value)}
            />

            <h5>
              Job Page URL <span style={{ color: "#d9182b" }}>*</span>
            </h5>
            <input
              type="text"
              className="form-control light-bg mb-4"
              placeholder="Enter Job URL"
              required
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
            />

            <h5>Location</h5>
            <input
              type="text"
              className="form-control light-bg mb-4"
              placeholder="Enter Job Location"
              value={jobLocation}
              onChange={(e) => setLocation(e.target.value)}
            />

            <h5>Salary</h5>
            <input
              type="text"
              className="form-control light-bg mb-4"
              placeholder="Enter Salary"
              value={jobSalary}
              onChange={(e) => setSalary(e.target.value)}
            />

            <div className="d-flex justify-content-center mb-4">
              <button
                className="btn purple-bg default-text-color"
                onClick={handleAddJob}
              >
                Add Job
              </button>
            </div>

            <div className="d-flex justify-content-end"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomJobModalComponent;
