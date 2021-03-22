declare global {
    namespace Express {
        interface Request {
            user: Any;
        }
    }
}

export = Request;