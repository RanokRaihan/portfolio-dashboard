export interface IUser {
  userId: string;
  email: string;
  role: "MEMBERS" | "ADMIN" | string;
  iat?: number;
  exp?: number;
}
