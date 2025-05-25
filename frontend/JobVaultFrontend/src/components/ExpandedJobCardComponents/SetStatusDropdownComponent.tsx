import DeleteJobIcon from "./DeleteJobIcon.tsx";
import SetStatusButtonComponent from "./SetStatusButtonComponent.tsx";
import UpdateJobIcon from "./UpdateJobIcon.tsx";
import { Job } from "../../types/Job.ts";

interface SetStatusDropdownComponentProps {
  status: "applied" | "interview" | "accepted" | "rejected" | "none";
  onUpdateStatus: (
    status: "applied" | "interview" | "accepted" | "rejected" | "none",
  ) => void;

  jobId: string;
  job: Job;
}

const SetStatusDropdownComponent: React.FC<SetStatusDropdownComponentProps> = ({
  status,
  onUpdateStatus,
  jobId,
  job,
}) => {
  const getButtonProps = () => {
    switch (status) {
      case "applied":
        return {
          className: "btn blue-bg dropdown-toggle default-text-color",
          text: "Applied",
        };
      case "interview":
        return {
          className: "btn green-bg dropdown-toggle default-text-color",
          text: "Interview",
        };
      case "accepted":
        return {
          className: "btn purple-bg dropdown-toggle default-text-color",
          text: "Accepted",
        };
      case "rejected":
        return {
          className: "btn red-bg dropdown-toggle default-text-color",
          text: "Rejected",
        };
      default:
        return {};
    }
  };

  return (
    <div className="dropdown mb-4" data-bs-display="static">
      <SetStatusButtonComponent
        className={getButtonProps().className}
        text={getButtonProps().text}
      />
      <ul
        className="dropdown-menu force-drop-down"
        style={{ backgroundColor: "#292b38" }}
      >
        {[
          { label: "Applied", value: "APPLIED", bg: "blue" },
          { label: "Interview", value: "INTERVIEW", bg: "green" },
          { label: "Accepted", value: "ACCEPTED", bg: "#7400f0" },
          { label: "Rejected", value: "REJECTED", bg: "red" },
          { label: "Reset...", value: "none", bg: "gray" },
        ].map(({ label, value, bg }) => (
          <li key={value}>
            <a
              className="dropdown-item"
              href="#"
              style={{
                backgroundColor: bg,
                borderRadius: "10px",
                color: "white",
                height: "25px",
                fontSize: ".9rem",
              }}
              onClick={() =>
                onUpdateStatus(
                  value.toLowerCase() as SetStatusDropdownComponentProps["status"],
                )
              }
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <UpdateJobIcon job={job} />
      <DeleteJobIcon id={jobId} />
    </div>
  );
};

export default SetStatusDropdownComponent;
