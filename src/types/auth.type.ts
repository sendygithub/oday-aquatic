export type UserRole = "admin" | "user";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type AuthResponse = {
  success: boolean;
  message: string;
  user?: User;
};
