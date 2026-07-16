import type { User } from "./UserType";

export type APILoginResponseType = {
	user: User;
	token: string;
};
