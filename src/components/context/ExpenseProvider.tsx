import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import {
	addExpense,
	deleteExpense,
	editExpense,
	getCurrentMonthChart,
	getCurrentMonthInsights,
	getExpenses,
	getPaginatedExpense,
} from '../../services/expense.service';
import { toast } from 'react-toastify';
import { addCategory, deleteCategory } from '../../services/category.service';

const ExpenseContext = createContext(null);

export const useExpenseContext = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }: { children: React.ReactNode }) => {
	const [expenses, setExpenses] = useState([]);
	const [paginatedExpenses, setPaginatedExpense] = useState([]);
	const [categories, setCategories] = useState([]);
	const [monthlyInsights, setMonthlyInsights] = useState([]);
	const [overallImprovement, setOverallImprovement] = useState([]);
	const [overallWarnings, setOverallWarnings] = useState([]);
	const [chartData, setChartData] = useState({ labels: [], datasets: [] });
	const [totalAmount, setTotalAmount] = useState(0);
	const [totalAmountToday, setTotalAmountToday] = useState(0);
	const [newCategory, setNewCategory] = useState([]);
	const [topSpentCategory, setTopSpentCategory] = useState([]);
	const [LowestSpentCategory, setLowestSpentCategory] = useState([]);
	const [mostFrequent, setMostFrequent] = useState([]);
	const [leastFrequent, setLeastFrequent] = useState([]);
	const selectedMonth = new Date().getMonth() + 1;
	const selectedYear = new Date().getFullYear();
	const [loading, setLoading] = useState(false);
	const [paginationLoading, setPaginationLoading] = useState(false);
	const [totalCount, setTotalCount] = useState(0);

	useEffect(() => {
		fetchExpenses();
		fetchCurrentMonthlChart();
		fetchCurrentMonthlInsights();
	}, []);

	const fetchPaginatedExpenses = useCallback(
		async (page: any = 1, limit = 10) => {
			setPaginationLoading(true);
			try {
				const { data: paginatedExpenseResponse } = await getPaginatedExpense(page, limit, selectedYear, selectedMonth);
				setPaginatedExpense(paginatedExpenseResponse.data.expenses);
				setTotalCount(paginatedExpenseResponse.data.total);
			} catch (error) {
				toast.error('Failed to fetch paginated expenses');
			} finally {
				setPaginationLoading(false);
			}
		},
		[selectedYear, selectedMonth],
	);

	const fetchExpenses = useCallback(async () => {
		setLoading(true);
		try {
			const { data: expenseResponse } = await getExpenses(selectedYear, selectedMonth);

			setExpenses(expenseResponse.data.expenses);
			setCategories(expenseResponse.data.categoryExpenses);
			setTotalAmount(expenseResponse.data.totalSpent);
			setTotalAmountToday(expenseResponse.data.totalSpentToday);

			setTopSpentCategory(expenseResponse.data.highestSpentCategories);
			setLowestSpentCategory(expenseResponse.data.lowestSpentCategories);
			setNewCategory(expenseResponse.data.newlyAddedCategories);

			setMostFrequent(expenseResponse.data.categoryWithHighestTransaction);
			setLeastFrequent(expenseResponse.data.categoryWithLowestTransaction);
		} catch (error) {
			toast.error('Failed to fetch expenses');
		} finally {
			setLoading(false);
		}
	}, [selectedYear, selectedMonth]);

	const fetchCurrentMonthlChart = useCallback(async () => {
		setLoading(true);
		try {
			const { data: chartResponse } = await getCurrentMonthChart(selectedYear, selectedMonth);

			setChartData({
				labels: chartResponse.data.labels,
				datasets: chartResponse.data.datasets,
			});
		} catch (error) {
			toast.error('Failed to fetch monthly chart');
		} finally {
			setLoading(false);
		}
	}, [selectedYear, selectedMonth]);

	const fetchCurrentMonthlInsights = useCallback(async () => {
		setLoading(true);
		try {
			const { data: insightsResponse } = await getCurrentMonthInsights();
			setMonthlyInsights(insightsResponse.data.monthlyInsights);
			setOverallImprovement(insightsResponse.data.overallImprovement);
			setOverallWarnings(insightsResponse.data.overallWarnings);
		} catch (error) {
			toast.error('Failed to fetch monthly insights');
		} finally {
			setLoading(false);
		}
	}, []);

	const handleAddCategory = useCallback(
		async (categoryData) => {
			const categoryExists = categories.some((category) => category?.category.name?.toLowerCase() === categoryData.categoryName?.toLowerCase());

			if (categoryExists) {
				toast.error('Category already exists!');
				return;
			}

			setLoading(true);
			try {
				await addCategory(categoryData);
				toast.success('Category added successfully');
				fetchExpenses();
				fetchCurrentMonthlChart();
				fetchCurrentMonthlInsights();
			} catch (error) {
				toast.error('Failed to add category');
			} finally {
				setLoading(false);
			}
		},
		[categories, fetchExpenses, fetchCurrentMonthlChart, fetchCurrentMonthlInsights],
	);

	const handleDeleteCategory = useCallback(
		async (categoryData) => {
			setLoading(true);
			try {
				await deleteCategory(categoryData);
				toast.success('Category deleted successfully');
				fetchExpenses();
				fetchCurrentMonthlChart();
				fetchCurrentMonthlInsights();
			} catch (error) {
				toast.error('Failed to delete category');
			} finally {
				setLoading(false);
			}
		},
		[fetchExpenses, fetchCurrentMonthlChart, fetchCurrentMonthlInsights],
	);

	const handleAddExpense = useCallback(
		async (expenseData) => {
			setLoading(true);
			try {
				await addExpense(expenseData);
				toast.success('Expense added successfully');
				fetchExpenses();
				fetchCurrentMonthlChart();
				fetchCurrentMonthlInsights();
				fetchPaginatedExpenses();
			} catch (error) {
				toast.error('Failed to add expense');
			} finally {
				setLoading(false);
			}
		},
		[fetchExpenses, fetchCurrentMonthlChart, fetchCurrentMonthlInsights, fetchPaginatedExpenses],
	);

	const handleDeleteExpense = useCallback(
		async (expenseId) => {
			setLoading(true);
			try {
				await deleteExpense(expenseId);
				toast.success('Expense deleted successfully');
				fetchExpenses();
				fetchCurrentMonthlChart();
				fetchCurrentMonthlInsights();
				fetchPaginatedExpenses();
			} catch (error) {
				toast.error('Failed to delete expense');
			} finally {
				setLoading(false);
			}
		},
		[fetchExpenses, fetchCurrentMonthlChart, fetchCurrentMonthlInsights, fetchPaginatedExpenses],
	);

	const handleEditExpense = useCallback(
		async (expenseId, updatedData) => {
			setLoading(true);

			try {
				await editExpense(expenseId, updatedData);
				toast.success('Expense updated successfully');
				fetchExpenses();
				fetchCurrentMonthlChart();
				fetchCurrentMonthlInsights();
				fetchPaginatedExpenses();
			} catch (error) {
				toast.error('Failed to update expense');
			} finally {
				setLoading(false);
			}
		},
		[fetchExpenses, fetchCurrentMonthlChart, fetchCurrentMonthlInsights, fetchPaginatedExpenses],
	);

	// Memoize context value to prevent unnecessary re-renders
	const contextValue = useMemo(
		() => ({
			loading,
			expenses,
			categories,
			chartData,
			totalAmount,
			totalAmountToday,
			newCategory,
			topSpentCategory,
			LowestSpentCategory,
			mostFrequent,
			leastFrequent,
			monthlyInsights,
			overallImprovement,
			overallWarnings,
			totalCount,
			paginatedExpenses,
			paginationLoading,
			handleAddCategory,
			handleDeleteCategory,
			handleAddExpense,
			handleDeleteExpense,
			handleEditExpense,
			fetchPaginatedExpenses,
		}),
		[
			loading,
			expenses,
			categories,
			chartData,
			totalAmount,
			totalAmountToday,
			newCategory,
			topSpentCategory,
			LowestSpentCategory,
			mostFrequent,
			leastFrequent,
			monthlyInsights,
			overallImprovement,
			overallWarnings,
			totalCount,
			paginatedExpenses,
			paginationLoading,
			handleAddCategory,
			handleDeleteCategory,
			handleAddExpense,
			handleDeleteExpense,
			handleEditExpense,
			fetchPaginatedExpenses,
		],
	);

	return <ExpenseContext.Provider value={contextValue}>{children}</ExpenseContext.Provider>;
};
