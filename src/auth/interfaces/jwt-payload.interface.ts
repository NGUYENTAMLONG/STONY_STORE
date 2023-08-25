export interface JwtPayload {
  userId: number;
  username: string;
  scopes?: string[];
  role?: string;
  isAdministrator?: boolean;
  name?: string;
}
