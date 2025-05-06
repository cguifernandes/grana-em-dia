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
};

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

export type CategoryIconsType = {
	value: string;
	label: string;
};
