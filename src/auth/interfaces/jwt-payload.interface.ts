export interface JwtPayload {
  userId: number;
  username: string;
  scopes?: string[];
  isAdministrator?: boolean;
  name?: string;
}
