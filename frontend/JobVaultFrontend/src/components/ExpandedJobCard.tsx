import { Dispatch, SetStateAction, useState } from "react";
import FavoriteStarComponent from "./ExpandedJobCardComponents/FavoriteStarComponent";
import OpenJobLinkButtonComponent from "./ExpandedJobCardComponents/OpenJobLinkButtonComponent";
import SetStatusDropdownComponent from "./ExpandedJobCardComponents/SetStatusDropdownComponent";
import CvComponent from "./ExpandedJobCardComponents/CvComponent";
import ResumeComponent from "./ExpandedJobCardComponents/ResumeComponent";
import { Job } from "../types/Job";

interface ExpandedJobCardProps {
  isVisible: boolean;
  job: Job | null;
  onToggleFavorite: () => void;
  onUpdateStatus: (status: Job["applicationStatus"]) => void;
  refreshJobs: () => Promise<void>;
  resumeLoading: boolean;
  setResumeLoading: Dispatch<SetStateAction<boolean>>;
}

const ExpandedJobCard: React.FC<ExpandedJobCardProps> = ({
  isVisible,
  job,
  onToggleFavorite,
  onUpdateStatus,
  refreshJobs,
  resumeLoading,
  setResumeLoading,
}) => {
  const [activeSection, setActiveSection] = useState<
    "Description" | "CV" | "Resume"
  >("Description");

  if (!isVisible || job === null) return null;

  return (
    <div
      className="container-fluid default-text-color"
      style={{
        backgroundColor: "#292b38",
        borderRadius: "10px",
        overflow: "hidden",
        marginTop: "100px",
      }}
    >
      <div className="container text-center">
        <div className="row d-flex flex-column">
          <div
            className="col-12 col-md text-start"
            style={{ borderBottom: "1px solid #9e9ca1" }}
          >
            <h3
              style={{ paddingTop: "5px" }}
              className="d-flex align-items-center justify-content-between"
            >
              {job.jobTitle}
              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <FavoriteStarComponent
                  isFavorite={job.favorite}
                  onToggle={onToggleFavorite}
                />
                <div style={{ lineHeight: 0 }}>
                  <OpenJobLinkButtonComponent url={job.jobUrl} />
                </div>
              </div>
            </h3>
            <h5>{job.companyName}</h5>
            <p>{job.jobLocation}</p>
            <p>Salary: {job.jobSalary}</p>
            <p>
              Date Added: {new Date(job.localDateTime).toLocaleDateString()}
            </p>

            <SetStatusDropdownComponent
              status={job.applicationStatus}
              onUpdateStatus={onUpdateStatus}
              jobId={job.id}
              job={job}
            />
          </div>

          {/* Section tabs */}
          <div
            className="col-12 col-md"
            style={{ borderBottom: "1px solid #9e9ca1" }}
          >
            <div
              className="container text-center"
              style={{ paddingTop: "15px", paddingBottom: "15px" }}
            >
              <div className="row">
                {["Description", "CV", "Resume"].map((section) => (
                  <button
                    key={section}
                    className="col btn section-change-button"
                    style={{
                      backgroundColor:
                        activeSection === section ? "#1c1d26" : "#292b38",
                      color: "#9e9ca1",
                    }}
                    onClick={() =>
                      setActiveSection(section as typeof activeSection)
                    }
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section content */}
          <div
            className="col-12 col-md"
            style={{ paddingTop: "15px", paddingBottom: "15px" }}
          >
            <div
              className="custom-scrollbar"
              style={{
                overflowY: "auto",
                overflowX: "hidden",
                maxHeight: "calc(100vh - 579px)",
              }}
            >
              {activeSection === "Description" && (
                <div dangerouslySetInnerHTML={{ __html: job.jobDescription }} />
              )}
              {activeSection === "CV" && (
                <CvComponent job={job} onRefreshJobs={refreshJobs} />
              )}
              {activeSection === "Resume" && (
                <ResumeComponent
                  job={job}
                  resumeLoading={resumeLoading}
                  setResumeLoading={setResumeLoading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedJobCard;
