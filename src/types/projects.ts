export interface Project {
  id: string;
  customer: string;
  refNumber: string;
  projectReference: ProjectReference;
  projectLocation: ProjectLocation;
  dueDate: string;
  contact: string;
  assignedTo: AssignedTo;
  status: string;
  comments: string;
}

export interface ProjectReference {
  title: string;
  name: string;
}

export interface ProjectLocation {
  title: string;
  name: string;
}

export interface AssignedTo {
  manager: string;
  staff: string;
}
