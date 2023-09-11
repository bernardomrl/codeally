import { Request, Response, NextFunction } from 'express';  // Express Modules
import jwt from 'jsonwebtoken';                             // JWT Module
import dotenv from 'dotenv';                                // DotEnv Module

// * DotEnv Settings
dotenv.config();

export const tokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.access; // * Recuperando access token

        if (!accessToken) {
            return res.status(401).json({ error: 'Token de acesso não encontrado.'});
        }

        // * Verificando validade do access token
        const accessData = await verifyToken(accessToken);

        if (accessData.exp < Math.floor(Date.now() / 1000)) {
            const refreshToken = req.cookies.refresh; // * Recuperando refresh token

            if (!refreshToken) {
                return res.status(401).json({ error: 'Token de renovação ausente.'});
            }

            const refreshData = await verifyToken(refreshToken);

            if (!refreshData || refreshData.uuid !== accessData.uuid) {
                return res.status(401).json({ error: 'Token de renovação inválido.'});
            }

            const newAcessToken = createAccessToken({ uuid: refreshData.uuid }, '1h');
            const newRefreshToken = createRefreshToken({ uuid: refreshData.uuid });
            
            res.cookie('access', newAcessToken, { httpOnly: true });
            res.cookie('refresh', newRefreshToken, { httpOnly: true });

            const userData = { uuid: refreshData.uuid };
            res.locals.user = userData;
            return next();
        } 

        const userData = { uuid: accessData.uuid };
        res.locals.user = userData;
        return next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Erro interno no servidor.'});
    }

}

// * Extract Value
export const extractValueFromToken = (token: string, value: string): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as { [key: string]: any };

            if (decodedToken && decodedToken.hasOwnProperty(value)) {
                resolve(decodedToken[value]);
            } else {
                resolve(null);
            }
        } catch (error) {
            reject(error);
        }
    });
}

export const verifyToken = (token: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_ACCESS_SECRET!, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}

export const createAccessToken = (payload: any, expiresIn: string): string => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn });
}

export const createRefreshToken = (payload: any): string => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!);
}