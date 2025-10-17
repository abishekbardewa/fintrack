import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const axiosPrivate = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor for adding access token to headers
axiosPrivate.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem('token');
		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Response interceptor for handling errors globally
axiosPrivate.interceptors.response.use(
	(response) => response,
	(error) => {
		// Handle unauthorized access - redirect to login
		if (error.response?.status === 401) {
			localStorage.clear();
			window.location.href = '/';
			return Promise.reject(new Error('Session expired. Please login again.'));
		}

		// Handle network errors
		if (!error.response) {
			return Promise.reject(new Error('Network error. Please check your internet connection.'));
		}

		// Handle other errors
		return Promise.reject(error);
	},
);
