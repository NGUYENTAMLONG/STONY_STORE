export interface JwtPayload {
  userId: number; // sub or userId
  username: string;
  scopes?: string[];
  isAdministrator?: boolean;
  name?: string;
}
