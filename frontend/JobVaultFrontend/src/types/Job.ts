export type JobStatus =
  | "applied"
  | "interview"
  | "accepted"
  | "rejected"
  | "none";

export interface Job {
  id: string;
  companyName: string;
  jobTitle: string;
  jobLocation: string;
  jobSalary: string;
  jobDescription: string;
  applicationStatus: JobStatus;
  jobUrl: string;
  favorite: boolean;
  localDateTime: string;
  resumeFeedback?: string;
  cvFeedback?: string;
}
