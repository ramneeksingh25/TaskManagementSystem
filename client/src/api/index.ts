/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from 'axios';

import { TaskData } from '../interfaces/taskInterfaces';
import { LoginDetails, RegisterDetails } from '../interfaces/authInterfaces';

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

// Register user API call
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

// Login user API call
export const loginUser = async (userData: LoginDetails) => {
  try {
    const response = await apiClient.post('/users/login', userData);

    // Store the JWT token in localStorage upon successful login
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
    const response = await apiClient.get('/users'); // Adjust the endpoint as needed
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

// Function to fetch the logged-in user's profile
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/users/profile'); // Adjust the endpoint as needed
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


export const createTask = async (taskData:TaskData) => {
  try {
    const response = await apiClient.post('/tasks', taskData);
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

// Function to fetch tasks for the authenticated user
export const getTasksForUser = async () => {
  try {
    const response = await apiClient.get('/tasks/user');
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

// Function to update a task by ID
export const updateTask = async (taskId: string, updatedData: TaskData) => {
  try {
    const response = await apiClient.put(`/tasks/${taskId}`, updatedData);
    return response.data;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to update task.');
      }
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};

// Function to delete a task by ID
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

// Function to get a task by ID
export const getTaskById = async (taskId:string) => {
  try {
    const response = await apiClient.get(`/tasks/${taskId}`);
    return response.data.task;
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