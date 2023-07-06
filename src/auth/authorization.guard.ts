import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { PermissionType } from '../../src/permissions/constants/permission.constant';
import { AUTH_KEY } from './auth.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private userService: UsersService,
  ) {}
  checkValid<T>(requiredArray: T[], array: T[]) {
    let valid = true;
    requiredArray.forEach((require) => {
      valid = valid && array.includes(require);
    });
    return valid;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionType[]
    >(AUTH_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions || requiredPermissions.length === 0) return true;

    try {
      const token = context.switchToHttp().getRequest().headers
        .authorization as string;

      const userJwt = this.authService.decode(token);
      if (!userJwt) {
        throw new UnauthorizedException();
      }

      if (userJwt.isAdministrator === true) {
        return true;
      }

      const user = await this.userService.accessPermission(
        Number(userJwt.userId),
      );
      const userPermissions = [];
      user.roles
        .map((r) => r.permissions)
        .forEach((p) => {
          userPermissions.push(...p.map((x) => x.name));
        });
      return requiredPermissions.every((p) => userPermissions.includes(p));
    } catch (error) {
      console.log('ERROR: ', error);
      throw new UnauthorizedException();
    }
  }
}
