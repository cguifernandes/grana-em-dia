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
	finances: Finances
};

export type Finances = {
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
