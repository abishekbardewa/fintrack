import { axiosInstance } from './axios.service';
import { AxiosResponse } from 'axios';
import type { AuthResponse } from '../types/api.types';

const API_URL = '/auth';

export const loginUser = async (email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
	return axiosInstance.post(`${API_URL}/login`, { email, password });
};

export const registerUser = async (name: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
	return axiosInstance.post(`${API_URL}/create-account`, { name, email, password });
};
