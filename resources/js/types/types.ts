export type PageProps = {
	flash: {
		success?: string;
		error?: string;
	};
	auth?: {
		user?: UserType;
	};
};

export type UserType = {
	id: number;
	name: string;
	email: string;
	email_verified_at: string | null;
	created_at: string;
	updated_at: string;
};
