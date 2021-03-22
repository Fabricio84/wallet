import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export default (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, String(process.env.JWT_SECRET), (err, user) => {
            if (err) {
                return response.sendStatus(403);
            }
        
            request.user = user;

            next();
        });
    } else {
        response.sendStatus(401);
    }
};