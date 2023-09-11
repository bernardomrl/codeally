import { GetUser, UpdateAccount, UpdateProfile } from '@/controllers/user'; // User Controllers
import { Router, Request, Response } from 'express';                        // Express Modules
import { tokenMiddleware } from '@/utils/jwt';                                // Validate Token Function


const userRouter = Router();

// * Get Public Profile
userRouter.get('/user/profile/get/:username', tokenMiddleware, async (req: Request, res: Response) => {
    const { username } = req.params;
    await new GetUser(undefined, username).get(res);
});

// * Get Profile
userRouter.get('/user/profile/get/', tokenMiddleware, async (req: Request, res: Response) => {
    const token = req.header('Authorization')?.replace('Bearer ', '') as string;
    await new GetUser(token).get(res);
});

// * Update User Profile
userRouter.post('/user/profile/update', tokenMiddleware, async (req: Request, res: Response) => {
    const token = req.header('Authorization')?.replace('Bearer ', '') as string;
    const { firstName, lastName, about, country, language } = req.body;
    await new UpdateProfile(token, firstName, lastName, about, country, language).update(res);
});

// * Update User Account
userRouter.post('/user/account/update', tokenMiddleware, async (req: Request, res: Response) => {
    const token = req.header('Authorization')?.replace('Bearer ', '') as string;
    const { email, username, password, newPassword, newPasswordConfirm } = req.body;

    if (password && newPassword && newPasswordConfirm) {
        await new UpdateAccount(token, email, username, password, newPassword, newPasswordConfirm).update(res);
    } else {
        await new UpdateAccount(token, email, username).update(res);
    }
});

export default userRouter;