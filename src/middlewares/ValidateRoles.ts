import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../utils';

export function validateUserRole(allowedRoles: string[]) {
  return (_req: Request, res: Response, next: NextFunction) => {
    const {role} = res.locals['userData'];
    if (!allowedRoles.includes(role)) {
       return next(new ErrorResponse('Rol no autorizado para acceder a esta ruta.',403 ));
    }
    // Si el rol del usuario está permitido, continúa con la siguiente middleware
    next();
  };
}
