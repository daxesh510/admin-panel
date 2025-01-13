import { Estimate } from "../types/estimates";
import { Project } from "../types/projects";
import axiosInstance from "../utils/axios";

const fetchData = async (endpoint: string) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

const postData = async (endpoint: string, data: Project | Estimate) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error);
    throw error;
  }
};

const putData = async (endpoint: string, data: Project | Estimate) => {
  try {
    const response = await axiosInstance.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error putting data to ${endpoint}:`, error);
    throw error;
  }
};

const deleteData = async (endpoint: string) => {
  try {
    const response = await axiosInstance.delete(endpoint);
    console.log("deleteData -> response", response);
    return response.data;
  } catch (error) {
    console.log("deleteData -> response", error);
    console.error(`Error deleting data from ${endpoint}:`, error);
    throw error;
  }
};

export const fetchEstimates = async () => {
  return fetchData("/estimates");
};

export const fetchProjects = async () => {
  return fetchData("/projects");
};

export const createEstimate = async (data: Estimate) => {
  return postData("/estimates", data);
};

export const updateEstimate = async (id: string, data: Estimate) => {
  return putData(`/estimates/${id}`, data);
};

export const deleteEstimate = async (id: string) => {
  return deleteData(`/estimates/${id}`);
};

export const createProject = async (data: Project) => {
  return postData("/projects", data);
};

export const updateProject = async (id: string, data: Project) => {
  return putData(`/projects/${id}`, data);
};

export const deleteProject = async (id: string) => {
  return deleteData(`/projects/${id}`);
};
