import { extractValueFromToken } from "@/utils/jwt";    // Extract Value From JWT Token Function
import { connectDatabase } from "@/utils/database";     // Connect Database Function
import { RowDataPacket } from "mysql2";                 // RowDataPacket Type
import { Response } from 'express';                     // Response Module
import bcrypt from 'bcrypt';                            // Bcrypt Module
import * as yup from 'yup';                             // Yup Module

export default class UpdateAccount {
    private token: string;

    private email?: string;
    private username?: string;
    private password?: string;
    private newPassword?: string;
    private newPasswordConfirm?: string;

    constructor(token: string, email?: string, username?: string, password?: string, newPassword?: string, newPasswordConfirm?: string) {
        this.token = token;
        this.email = email;
        this.username = username;
        this.password = password;
        this.newPassword = newPassword;
        this.newPasswordConfirm = newPasswordConfirm;
    }

    // * Password validation
    private async validatePassword(): Promise<any> {
        const schema = yup.object().shape({
            newPassword: yup.string().trim()
                .min(8, 'A senha deve ter no mínimo 8 caracteres.')
                .max(255, 'A senha deve ter no máximo 255 caracteres.')
                .test('hasNumber', 'A senha deve ter pelo menos um número.', (value?: string) => typeof value === 'string' ? /[\d]/.test(value) : false)
                .test('hasSpecialChar', 'A senha deve conter pelo menos um caratere especial.', (value?: string) => typeof value === 'string' ? /\W/.test(value) : false)
                .test('hasUppercase', 'A senha deve conter pelo menos uma letra maiúscula.', (value?: string) => typeof value === 'string' ? /[A-Z]/.test(value) : false)
                .required('A senha é obrigatória.'),
            newPasswordConfirm: yup.string().trim()
                .oneOf([ yup.ref('newPassword')], 'As senhas não coincidem.')
                .required('A confirmação de senha é obrigatória.')
        });

        try {
            await schema.validate({ newPassword: this.newPassword, newPasswordConfirm: this.newPasswordConfirm }, { abortEarly: true });
            return null;
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return error.errors[0];
            }
        }
    }

    // * Validate Inputs
    private async validateInputs(): Promise<any> {
        const schema = yup.object().shape({
            email: yup.string().trim()
                .email('O e-mail deve ser válido.')
                .max(255, 'O e-mail deve ter no máximo 255 caracteres.')
                .required('O e-mail é obrigatório.'),
            username: yup.string().trim()
                .min(3, 'O nome de usuário deve ter no mínimo 3 caracteres.')
                .max(50, 'O nome de usuário deve ter no máximo 50 caracteres.')
                .required('O nome de usuário é obrigatório.'),
        });

        try {
            await schema.validate({ email: this.email, username: this.username }, { abortEarly: true });
            return null;
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return error.errors[0];
            }
        }
    }

    // * Perform Account Update
    public async update(res: Response): Promise<void> {
        try {
            const connection = await connectDatabase();
            const uuid = this.token ? await extractValueFromToken(this.token, 'uuid') : undefined;

            if (!uuid) {
                res.status(400).json({ error: 'Token inválido.' });
                return;
            }

            const validationError = await this.validateInputs();

            if (validationError !== null) {
                res.status(400).json({ error: validationError });
                return;
            }

            const [userRows] = await connection.execute('SELECT * FROM user_account WHERE uuid = ?', [uuid]);

            if (!Array.isArray(userRows)) {
                res.status(500).json({ error: 'Erro ao buscar dados do usuário.' });
                return;
            }

            if (Array.isArray(userRows) && userRows.length > 0) {
                const userRow = userRows[0] as RowDataPacket;

                const [rows] = await connection.execute('SELECT username, email FROM user_account WHERE username = ? OR email = ?', [this.username, this.email]);

                if (Array.isArray(rows) && rows.length > 0) {
                    const row = rows[0] as RowDataPacket;

                    if (userRow.email !== this.email && row.email === this.email) {
                        res.status(422).json({ error: 'E-mail já está sendo utilizado.' });
                        return;
                    }

                    if (userRow.username !== this.username && row.username === this.username) {
                        res.status(422).json({ error: 'Usuário já está sendo utilizado.' });
                        return;
                    }
                }

                if (this.password && this.newPassword && this.newPasswordConfirm) {
                    
                    const validPassword = await bcrypt.compare(this.password, userRow.password);

                    if (!validPassword) {
                        res.status(422).json({ error: 'Senha incorreta.' });
                        return;
                    }

                    const validationError = await this.validatePassword();

                    if (validationError !== null) {
                        res.status(400).json({ error: validationError });
                        return;
                    }

                    const hashedPassword = await bcrypt.hash(this.newPassword, 10);

                    await connection.execute('UPDATE user_account SET email = ?, username = ?, password = ? WHERE uuid = ?', [this.email, this.username, hashedPassword, uuid]);

                    res.status(200).json({ success: 'Conta atualizada com sucesso.' });
                    connection.end();
                    return;
                }

                await connection.execute('UPDATE user_account SET email = ?, username = ? WHERE uuid = ?', [this.email, this.username, uuid]);
                res.status(200).json({ success: 'Conta atualizada com sucesso.' });
                connection.end();
                return;    
            }

            res.status(404).json({ error: 'Usuário não encontrado.' });
            connection.end();
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro interno no servidor.' });
            return;
        }
    }
}