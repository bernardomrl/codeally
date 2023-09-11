import { createAccessToken, createRefreshToken } from '@/utils/jwt';  // Create JWT Token Function
import { connectDatabase } from '@/utils/database';             // Connect Database Function
import { RowDataPacket } from 'mysql2';                         // RowDataPacket Type
import { Response } from 'express';                             // Response Module
import bcrypt from 'bcrypt';                                    // Bcrypt Module
import * as yup from 'yup';                                     // Yup Module

export default class Login {
    private login: string;
    private password: string;

    constructor(login: string, password: string) {
        this.login = login;
        this.password = password;
    }

    // * Validate Inputs
    private async validate(): Promise<any> {
        const schema = yup.object().shape({
            login: yup.string().trim()
                .max(255, 'O login deve ter no máximo 255 caracteres.')
                .required('O login é obrigatório.'),
            password: yup.string().trim()
                .max(255, 'A senha deve ter no máximo 255 caracteres.')
                .required('A senha é obrigatória.'),
        });

        try {
            await schema.validate({ login: this.login, password: this.password }, { abortEarly: true });
            return null;
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return error.errors[0];
            }
        }
    }

    // * Perform User Login
    public async perform(res: Response): Promise<void> {
        try {
            const validationError = await this.validate();

            if (validationError !== null) {
                res.status(400).json({ error: validationError });
                return;
            }

            const connection = await connectDatabase();
            const [rows] = await connection.execute('SELECT * FROM user_account WHERE email = ? OR username = ?', [this.login, this.login]);

            if (!Array.isArray(rows)) {
                res.status(500).json({ error: 'Erro ao buscar dados do usuário.' });
                return;
            }

            if (rows.length === 0) {
                res.status(404).json({ error: 'Login ou senha incorretos.' });
                return;
            }

            const row = rows[0] as RowDataPacket;

            const validPassword = await bcrypt.compare(this.password, row.password);
            if (!validPassword) {
                res.status(401).json({ error: 'Login ou senha incorretos.' });
                return;
            }

            const uuid = row.uuid as string;

            const accessToken = createAccessToken({ uuid: uuid }, '1h');

            if (row.first === 1) {
                await connection.execute('UPDATE user_account SET first = 0 WHERE uuid = ?', [uuid]);

                const refreshToken = createRefreshToken({ uuid: uuid });

                res.cookie('refresh', refreshToken, { httpOnly: true });
                res.cookie('access', accessToken, { httpOnly: true });

                res.status(200).json({
                    success: 'Usuário logado com sucesso.',
                    redirect: '/profile/setup',
                    access: accessToken
                });
                connection.end();
                return;
            }
            
            res.cookie('access', accessToken, { httpOnly: true });

            res.status(200).json({ success: 'Usuário logado com sucesso.', access: accessToken });
            connection.end();
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro interno no servidor.' });
            return;
        }
    }
}