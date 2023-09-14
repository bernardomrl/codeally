import { Router, Request, Response } from 'express';    // Express Modules
import { Login, Register, PasswordReset } from '@/controllers/auth';
import { tokenMiddleware } from '@/utils/jwt';

const authRouter = Router();

// * Login Route
authRouter.post('/auth/login', async (req: Request, res: Response) => {
    const { login, password } = req.body;
    await new Login(login, password).perform(res);
});

// * Register Route
authRouter.post('/auth/register', async (req: Request, res: Response) => {
    const { email, username, password, accountType } = req.body;
    await new Register(email, username, password, accountType).perform(res);
});

// * Send Reset Password Email Route
authRouter.post('/auth/password-reset', async (req: Request, res: Response) => {
    const { email } = req.body;
    await new PasswordReset(email).send(res);
});

// * Confirm Reset Password Route
authRouter.post('/auth/password-reset/confirm', async (req: Request, res: Response) => {
    const token = req.query.token as string;
    const { password, passwordConfirm } = req.body;
    await new PasswordReset(undefined, token, password, passwordConfirm).perform(res);
});

// * Logout Route
authRouter.get('/auth/logout', tokenMiddleware, async(req: Request, res: Response) => {
    res.clearCookie('access');
    res.clearCookie('refresh');
    res.status(200).json({ 'success': 'Logout realizado com sucesso.' }); 
})

export default authRouter;