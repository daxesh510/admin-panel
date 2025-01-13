import moment from "moment";
import { Project } from "../types/projects";

export const formatDate = (date: string) => {
  return moment(date).format("DD/MM/YYYY");
};

export const parseProjectData = (project: Project) => {
  return {
    ...project,
    projectReference: {
      title: project.projectReference.title || "",
      name: project.projectReference.name || "",
    },
    projectLocation: {
      title: project.projectLocation.title || "",
      name: project.projectLocation.name || "",
    },
    assignedTo: {
      manager: project.assignedTo.manager || "",
      staff: project.assignedTo.staff || "",
    },
    dueDate: project.dueDate ? moment(project.dueDate) : null,
  };
};
