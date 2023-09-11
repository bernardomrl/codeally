import { connectDatabase } from '@/utils/database'; // Connect Database Function
import { RowDataPacket } from 'mysql2';             // RowDataPacket Type
import { v4 as uuidv4 } from 'uuid';                // UUID Module
import { Response } from 'express';                 // Response Module
import bcrypt from 'bcrypt';                        // Bcrypt Module
import * as yup from 'yup';                         // Yup Module

export default class Register {
    private email: string;
    private username: string;
    private password: string;

    constructor(email: string, username: string, password: string) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    // * Validate Inputs
    private async validate(): Promise<any> {
        const schema = yup.object().shape({
            email: yup.string().trim()
                .email('O e-mail dever ser válido.')
                .max(255, 'O e-mail deve ter no máximo 255 caracteres.')
                .required('O e-mail é obrigatório.'),
            username: yup.string().trim()
                .min(3, 'O usuário deve ter no mínimo 3 caracteres.')
                .max(50, 'O usuário deve ter no máximo 50 caracteres.')
                .required('O usuário é obrigatório.'),
            password: yup.string().trim()
                .min(8, 'A senha deve ter no mínimo 8 caracteres.')
                .max(255, 'A senha deve ter no máximo 255 caracteres.')
                .test('hasNumber', 'A senha deve ter pelo menos um número.', (value?: string) => typeof value === 'string' ? /[\d]/.test(value) : false)
                .test('hasSpecialChar', 'A senha deve conter pelo menos um caratere especial.', (value?: string) => typeof value === 'string' ? /\W/.test(value) : false)
                .test('hasUppercase', 'A senha deve conter pelo menos uma letra maiúscula.', (value?: string) => typeof value === 'string' ? /[A-Z]/.test(value) : false)
                .required('A senha é obrigatória.')
        });

        try {
            await schema.validate({ email: this.email, username: this.username, password: this.password }, { abortEarly: true });
            return null;
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return error.errors[0];
            }
        }
    }

    // * Perform User Registration
    public async perform(res: Response): Promise<void> {
        try {
            const validationError = await this.validate();

            if (validationError !== null) {
                res.status(400).json({ error: validationError });
                return;
            }

            const connection = await connectDatabase();
            const [rows] = await connection.execute('SELECT username, email FROM user_account WHERE username = ? OR email = ?', [this.username, this.email]);

            if (Array.isArray(rows) && rows.length > 0) {
                const row = rows[0] as RowDataPacket;
                if (row.email === this.email) {
                    res.status(422).json({ error: 'E-mail já cadastrado.' });
                    return;
                }
                if (row.username === this.username) {
                    res.status(422).json({ error: 'Usuário já cadastrado.' });
                    return;
                }
            }

            const hashedPassword = await bcrypt.hash(this.password, 10);
            const uuid = uuidv4();
            const first: number = 1;
            await connection.execute('INSERT INTO user_account (uuid, username, email, password, first) VALUES (?, ?, ?, ?, ?)', [uuid, this.username, this.email, hashedPassword, first]);
            res.status(201).json({ success: 'Usuário cadastrado com sucesso.' });
            connection.end();
            return;    
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno no servidor.'});
            return;
        }
    }
}