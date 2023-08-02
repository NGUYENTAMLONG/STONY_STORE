export interface loginResponseDto {
  username?: string;
  email?: string;
  accessToken: string;
  accessTokenExprise?: number | string;
  isFirstTimeLogin?: boolean;
}
