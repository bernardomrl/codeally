import { createAccessToken, extractValueFromToken } from '@/utils/jwt';   // Create JWT Token Function
import { connectDatabase } from '@/utils/database';                 // Connect Database Function
import { sendEmail } from '@/utils/email';                          // Send NodeMailer Email Function
import { RowDataPacket } from 'mysql2';                             // RowDataPacket Type         
import { Response } from 'express';                                 // Response Module
import bcrypt from 'bcrypt';                                        // Bcrypt Module
import * as yup from 'yup';                                         // Yup Module

export default class PasswordReset {
    private email?: string;
    private token?: string;
    private password?: string;
    private passwordConfirm?: string;

    constructor(email?: string, token?: string, password?: string, passwordConfirm?: string) {
        this.email = email;
        this.token = token;
        this.password = password;
        this.passwordConfirm = passwordConfirm;
    }

    // * Password validation
    private async validate(): Promise<any> {
        const schema = yup.object().shape({
            password: yup.string().trim()
                .min(8, 'A senha deve ter no mínimo 8 caracteres.')
                .max(255, 'A senha deve ter no máximo 255 caracteres.')
                .test('hasNumber', 'A senha deve ter pelo menos um número.', (value?: string) => typeof value === 'string' ? /[\d]/.test(value) : false)
                .test('hasSpecialChar', 'A senha deve conter pelo menos um caratere especial.', (value?: string) => typeof value === 'string' ? /\W/.test(value) : false)
                .test('hasUppercase', 'A senha deve conter pelo menos uma letra maiúscula.', (value?: string) => typeof value === 'string' ? /[A-Z]/.test(value) : false)
                .required('A senha é obrigatória.'),
            passwordConfirm: yup.string().trim()
                .oneOf([ yup.ref('password')], 'As senhas não coincidem.')
                .required('A confirmação de senha é obrigatória.')
        });

        try {
            await schema.validate({ password: this.password, passwordConfirm: this.passwordConfirm }, { abortEarly: true });
            return null;
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return error.errors[0];
            }
        }
    }

    // * Perform Send Confirmation E-mail
    async send(res: Response): Promise<void> {
        if (!this.email) {
            res.status(400).json({ error: 'E-mail não informado.' });
            return;
        }

        try {
            const connection = await connectDatabase();
            const [rows] = await connection.execute('SELECT uuid, email, username FROM user_account WHERE email = ?', [this.email]);

            if (!Array.isArray(rows)) {
                res.status(500).json({ error: 'Erro ao buscar dados do usuário.' });
                return;
            }

            if (rows.length === 0) {
                res.status(400).json({ error: 'E-mail não encontrado.' });
                return;
            }

            const row = rows[0] as RowDataPacket;
            const token = createAccessToken({ uuid: row.uuid }, '1h');
            await sendEmail({
                to: row.email,
                subject: 'Codeally - Recuperação de senha',
                username: row.username,
                message: [
                    'Esqueceu sua senha? Tudo bem, acontece! Clique no botão abaixo para redefinir sua senha.',
                    'Se você não requisitou a redefinição da senha, apenas ignore este e-mail.'
                ],
                button: [
                    `http://localhost:3000/auth/forgot-password/confirm?token=${token}`,
                    'Redefinir senha'
                ]
            });
            res.status(200).json({ success: 'E-mail enviado com sucesso.'});
            connection.end();
            return;
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno no servidor.' });
            return;
        }
    }

    // * Perform Password Reset
    public async perform(res: Response): Promise<void> {
        if (!this.token) {
            res.status(400).json({ error: 'Token não informado.' });
            return;
        }

        const uuid = await extractValueFromToken(this.token, 'uuid');

        if (!uuid) {
            res.status(400).json({ error: 'Token inválido.' });
            return;
        }

        try {
            const validationError = await this.validate();

            if (validationError !== null) {
                res.status(400).json({ error: validationError });
                return;
            }

            const connection = await connectDatabase();
            const [rows] = await connection.execute('SELECT * FROM user_account WHERE uuid = ?', [uuid]);

            if (!Array.isArray(rows)) {
                res.status(500).json({ error: 'Erro ao buscar dados do usuário.' });
                return;
            }

            if (rows.length === 0) {
                res.status(404).json({ error: 'Token inválido.' });
                return;
            }

            const row = rows[0] as RowDataPacket;
            const hashedPassword = await bcrypt.hash(this.password!, 10);
            await connection.execute('UPDATE user_account SET password = ? WHERE uuid = ?', [hashedPassword, uuid]);
            res.status(200).json({ success: 'Senha alterada com sucesso.' });
            await sendEmail({
                to: row.email,
                subject: 'Codeally - Senha Alterada',
                username: row.username,
                message: [
                    'Gostariamos de informar que sua senha foi alterada.', 
                    'Se não foi você que alterou a senha, recomendamos entrar imediatamente na sua conta.'
                ],
                button: [
                    'http://localhost:3000/auth/signin',
                    'Abrir Website'
                ]
            });
            connection.end();
            return;
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Erro interno no servidor.' });
            return;
        }
    }
}
