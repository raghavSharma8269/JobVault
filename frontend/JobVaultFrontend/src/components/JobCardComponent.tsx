import FavoriteStarComponent from "./ExpandedJobCardComponents/FavoriteStarComponent";

import { Job } from "../types/Job";

interface JobCardProps {
  onClick?: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  job: Job;
}

const JobCardComponent: React.FC<JobCardProps> = ({
  onClick,
  isFavorite,
  onToggleFavorite,
  job,
}) => {
  return (
    <div className="container mt-1">
      <div className="row-100">
        <button
          type="button"
          onClick={onClick}
          className="btn btn-lg w-100 job-card"
          style={{
            backgroundColor: "#292b38",
            color: "#c9c9c9",
            height: "140px",
            marginBottom: "5px",
            position: "relative",
          }}
        >
          <div className="container align-items-start text-start">
            <h5>
              {job.jobTitle}
              <span className="float-end">
                <FavoriteStarComponent
                  isFavorite={isFavorite}
                  onToggle={onToggleFavorite}
                />
              </span>
            </h5>
            <p style={{ fontSize: "15px" }}>{job.companyName}</p>
            <p style={{ fontSize: "15px" }}>{job.jobLocation}</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default JobCardComponent;
