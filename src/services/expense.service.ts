import { axiosPrivate } from './axios.service';
import { AxiosResponse } from 'axios';
import type { ExpenseResponse, PaginatedExpenseResponse, ChartResponse, InsightsResponse, ExpenseData } from '../types/api.types';

const API_URL = '/expense';

export const getExpenses = async (year: number, month: number): Promise<AxiosResponse<ExpenseResponse>> => {
	return axiosPrivate.get(`${API_URL}/get-expense?year=${year}&month=${month}`);
};

export const getPaginatedExpense = async (
	page: number = 1,
	limit: number = 10,
	year: number,
	month: number,
): Promise<AxiosResponse<PaginatedExpenseResponse>> => {
	return axiosPrivate.get(`${API_URL}/get-paginated-expense?year=${year}&month=${month}&page=${page}&limit=${limit}`);
};

export const getCurrentMonthChart = async (year: number, month: number): Promise<AxiosResponse<ChartResponse>> => {
	return axiosPrivate.get(`${API_URL}/month-chart/${year}/${month}`);
};

export const getCurrentMonthInsights = async (): Promise<AxiosResponse<InsightsResponse>> => {
	return axiosPrivate.get(`${API_URL}/monthly-insights`);
};

export const addExpense = async (data: ExpenseData): Promise<AxiosResponse> => {
	return axiosPrivate.post(`${API_URL}/add-expense`, data);
};

export const deleteExpense = async (expenseId: string): Promise<AxiosResponse> => {
	return axiosPrivate.delete(`${API_URL}/delete-expense/${expenseId}`);
};

export const editExpense = async (expenseId: string, updatedData: Partial<ExpenseData>): Promise<AxiosResponse> => {
	return axiosPrivate.put(`${API_URL}/edit-expense/${expenseId}`, updatedData);
};
