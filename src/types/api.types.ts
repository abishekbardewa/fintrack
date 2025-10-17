// API Request/Response Types

// Auth Types
export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	name: string;
	email: string;
	password: string;
}

export interface AuthResponse {
	result: boolean;
	msg?: string;
	data?: {
		user: User;
		accessToken: string;
	};
	err?: {
		msg: string;
	};
}

export interface User {
	_id: string;
	name: string;
	email: string;
}

// Category Types
export interface Category {
	_id: string;
	name: string;
}

export interface CategoryData {
	categoryName: string;
}

// Expense Types
export interface Expense {
	_id: string;
	category: string;
	amount: number;
	date: string;
	description?: string;
}

export interface ExpenseData {
	category: string;
	amount: string | number;
	date: string;
	description?: string;
}

export interface ExpenseResponse {
	result: boolean;
	data: {
		expenses: Expense[];
		categoryExpenses: CategoryExpense[];
		totalSpent: number;
		totalSpentToday: number;
		highestSpentCategories: string[];
		lowestSpentCategories: string[];
		newlyAddedCategories: string[];
		categoryWithHighestTransaction: string[];
		categoryWithLowestTransaction: string[];
	};
}

export interface CategoryExpense {
	category: Category;
	totalAmount: number;
	percentage?: string;
}

export interface PaginatedExpenseResponse {
	result: boolean;
	data: {
		expenses: Expense[];
		total: number;
	};
}

export interface ChartResponse {
	result: boolean;
	data: {
		labels: string[];
		datasets: any[];
	};
}

export interface InsightsResponse {
	result: boolean;
	data: {
		monthlyInsights: string[];
		overallImprovement: string[];
		overallWarnings: string[];
	};
}
