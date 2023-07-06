import { SetMetadata } from '@nestjs/common';
import { PermissionType } from '../../src/permissions/constants/permission.constant';
export const AUTH_KEY = 'auth';
export const Auth = (...permissions: PermissionType[]) =>
  SetMetadata(AUTH_KEY, permissions);
