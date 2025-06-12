import { CategoryExpense } from "@/components/charts/expenses-by-category-chart";
import { MonthlyTrend } from "@/components/charts/monthly-trend-chart";
import { Transaction } from "@/components/layout/transaction-list";
import { CategoryColors } from "@/utils/enums";

export type PageProps = {
	flash: {
		success?: string;
		error?: string;
	};
	auth?: {
		user?: UserType;
	};
	categories?: CategoryType[];
	transactions?: TransactionType[];
	dashboard: {
		summary: ApiResponse<Summary>
		trends: ApiResponse<MonthlyTrend[]>
		categories: ApiResponse<CategoryExpense[]>;
		transactions: ApiResponse<{
			transactions: Transaction[];
			balance: number
		}>
	}
	
};

export type ApiResponse<T> = {
	success: boolean;
	message: string;
	data: T;
	error?: string;
}

export type Summary = {
	balance: number;
	income: number; 
	expense: number;
	savings_percent: number;
}

export type UserType = {
	id: number;
	name: string;
	email: string;
	email_verified_at: string | null;
	created_at: string;
	updated_at: string;
};

export type CategoryType = {
	id: number;
	name: string;
	icon: string;
	color: CategoryColors;
	created_at: string;
	updated_at: string;
};

export type TransactionType = {
	id: number;
	description: string;
	amount: number;
	date: string;
	category_id: number;
	user_id: number;
	type: "expense" | "income";
	created_at: string;
	updated_at: string;
	category: CategoryType;
};

export type CategoryIconsType = {
	value: string;
	label: string;
};
