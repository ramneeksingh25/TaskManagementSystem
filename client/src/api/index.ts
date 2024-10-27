/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from 'axios';

import { LoginDetails, RegisterDetails, TaskData, TaskDataWithRelationships } from '../utils/interfaces';


const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const registerUser = async (userData: RegisterDetails) => {
  try {
    const response = await apiClient.post('/users/register', userData);
    return response;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('An unknown error occurred.');
      }
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};

export const loginUser = async (userData: LoginDetails) => {
  try {
    const response = await apiClient.post('/users/login', userData);
    const token = response.data.token;
    localStorage.setItem('token', token);
    return response;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('An unknown error occurred.');
      }
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};

export const getAllUsers = async () => {
  try {
    const response = await apiClient.get('/users/users');
    return response.data.users;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to fetch users.');
      }
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/users/profile');
    return response.data.user;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to fetch user profile.');
      }
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};

export const createTask = async (taskData:TaskDataWithRelationships) => {
  try {
    console.log(taskData);
    const response = await apiClient.post('/tasks/create', taskData);
    return response.data;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to create task.');
      }
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};

export const getTasksForUser = async () => {
  try {
    const response = await apiClient.get('/tasks/my-tasks');
    return response.data.tasks;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to fetch tasks.');
      }
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};

export const getTasksByUser = async () => {
  try {
    const response = await apiClient.get('/tasks/assigned-tasks');
    console.log("ASSIGNED TASKS DATA:", response.data);
    
    return response.data.tasks;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to fetch assigned tasks.');
      }
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};

export const updateTask = async (taskId: string, updatedData: TaskData) => {
  try {
    const response = await apiClient.put(`/tasks/${taskId}`, updatedData);
    return response.data;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.message) {
        throw new Error("Internal Server Error");
      } else {
        throw new Error('Failed to update task.');
      }
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};

export const deleteTask = async (taskId:string) => {
  try {
    const response = await apiClient.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to delete task.');
      }
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};

export const getAllTasks = async () => {
  try {
    const response = await apiClient.get(`/tasks/admin/all-tasks`);
    return response.data.tasks;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to fetch task details.');
      }
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};