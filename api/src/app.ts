import express, { Application, Request, Response } from 'express';  // Express Modules
import { AuthRouter, UserRouter } from '@/routes';                  // Routes
import { tokenMiddleware } from '@/utils/jwt';                      // Validate JWT Token Function
import cookieParser from 'cookie-parser';                           // Cookie Parser Module
import cors from 'cors';                                            // Cors Module (Cross Origin Resource Sharing)

// * Express Settings
const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// * Routes
app.use(AuthRouter);
app.use(UserRouter);

// * Testing Routes
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'OK' });
});

app.get('/protected', tokenMiddleware , (req: Request, res: Response) => {
    res.status(200).json({ message: 'OK' });
});

export default app;
