export const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "green";
    case "Pending":
      return "orange";
    case "Cancelled":
      return "red";
    default:
      return "default";
  }
};
export const getProjectStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "green";
    case "Processing":
      return "orange";
    case "Rejected":
      return "red";
    default:
      return "default";
  }
};

export const getEstimateStatusColor = (status: string) => {
  switch (status) {
    case "Created":
      return "green";
    case "Processing":
      return "purple";
    case "Rejected":
      return "red";
    default:
      return "gray";
  }
};
