import axios, { AxiosError } from 'axios';
import { RegisterDetails } from '../pages/Auth/Register';
import { LoginDetails } from '../pages/Auth/Login';

const API_BASE_URL = 'http://localhost:2000/api'; // Replace with your backend URL

// Create an Axios instance for your API
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to attach the token to the Authorization header
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

// Example: Fetch protected data with JWT token
export const getProtectedData = async () => {
  try {
    const response = await apiClient.get('/protected-data');
    return response.data;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to fetch protected data.');
      }
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};