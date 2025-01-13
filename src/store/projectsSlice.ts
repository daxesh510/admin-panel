import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProjects, createProject, updateProject, deleteProject } from "../services/apiServices";
import { Project } from "../types/projects";

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

export const fetchProjectsAsync = createAsyncThunk("projects/fetchProjects", async () => {
  const response = await fetchProjects();
  return response;
});

export const createProjectAsync = createAsyncThunk("projects/createProject", async (projectData: Project) => {
  const response = await createProject(projectData);
  return response;
});

export const updateProjectAsync = createAsyncThunk(
  "projects/updateProject",
  async ({ id, projectData }: { id: string; projectData: Project }) => {
    const response = await updateProject(id, projectData);
    return response;
  }
);

export const deleteProjectAsync = createAsyncThunk("projects/deleteProject", async (id: string) => {
  await deleteProject(id);
  return id;
});

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjectsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch projects";
      })
      .addCase(createProjectAsync.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProjectAsync.fulfilled, (state, action) => {
        const index = state.projects.findIndex((project) => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(deleteProjectAsync.fulfilled, (state, action) => {
        state.projects = state.projects.filter((project) => project.id !== action.payload);
      });
  },
});

export default projectsSlice.reducer;
