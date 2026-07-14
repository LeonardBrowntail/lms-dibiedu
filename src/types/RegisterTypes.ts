export type RegisterFormType = {
	name: string;
	email: string;
	role: string;
	password: string;
	confirmPassword: string;
};

export type RegisterFormError = {
	name: string | null;
	email: string | null;
	role: string | null;
	password: string | null;
	confirmPassword: string | null;
};
