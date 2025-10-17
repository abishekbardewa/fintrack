import { axiosPrivate } from './axios.service';
import { AxiosResponse } from 'axios';
import type { CategoryData } from '../types/api.types';

const API_URL = '/category';

export const addCategory = async (categoryData: CategoryData): Promise<AxiosResponse> => {
	return axiosPrivate.post(`${API_URL}/add-custom-category`, categoryData);
};

export const deleteCategory = async (categoryData: CategoryData): Promise<AxiosResponse> => {
	return axiosPrivate.delete(`${API_URL}/delete-category`, { data: categoryData });
};
