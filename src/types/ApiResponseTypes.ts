import type { User } from "./UserType";

export type APILoginResponseType = {
	user: User;
	token: string;
};

export type APIUsersResponseType = {
	name: string;
	email: string;
	role: string;
}[];
