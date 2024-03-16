import { Request } from 'express';
import { UserDTO } from 'shared-dtos';

declare module 'express-serve-static-core' {
    interface Request {
        user?: UserDTO;
    }
}