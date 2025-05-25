import JobCardComponent from "./JobCardComponent";
import { Job } from "../types/Job";

interface JobListComponentProps {
  jobs: Job[];
  onJobClick: (index: number) => void;
  toggleFavorite: (index: number) => void;
}

const JobListComponent: React.FC<JobListComponentProps> = ({
  jobs,
  onJobClick,
  toggleFavorite,
}) => {
  return (
    <div
      style={{
        height: "75vh",
        overflowY: "auto",
        overflowX: "hidden",
        marginTop: "100px",
      }}
      className="w-100 custom-scrollbar"
    >
      <div style={{ minHeight: "100%" }}>
        {jobs.map((job, index) => (
          <div key={job.id} style={{ marginBottom: "10px" }}>
            <JobCardComponent
              onClick={() => onJobClick(index)}
              isFavorite={job.favorite}
              onToggleFavorite={() => toggleFavorite(index)}
              job={job}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListComponent;
