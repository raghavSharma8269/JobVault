import { createContext, useContext } from "react";

export const JobContext = createContext({
  refreshJobs: () => {},
});

export const useJobContext = () => useContext(JobContext);
