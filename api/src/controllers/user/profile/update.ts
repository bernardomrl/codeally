import { extractValueFromToken } from "@/utils/jwt";    // Extract Value From JWT Token Function
import { connectDatabase } from "@/utils/database";     // Connect Database Function
import { Response } from 'express';                     // Response Module
import * as yup from 'yup';                             // Yup Module

export default class UpdateProfile {
    private token: string;

    private firstName?: string;
    private lastName?: string;
    private about?: string;
    private country?: string;
    private language?: string;

    constructor(
        token: string, 
        firstName?: string, 
        lastName?: string, 
        about?: string, 
        country?: string, 
        language?: string
    ) {
        this.token = token;
        this.firstName = firstName;
        this.lastName = lastName;
        this.about = about;
        this.country = country;
        this.language = language;
    }

    private async validate(): Promise<any> {
        const schema = yup.object().shape({
            firstName: yup.string().trim()
                .max(50, 'O nome deve ter no máximo 50 caracteres.')
                .required('O nome é obrigatório.'),
            lastName: yup.string().trim()
                .max(50, 'O sobrenome deve ter no máximo 50 caracteres.')
                .required('O sobrenome é obrigatório.'),
            about: yup.string().trim()
                .max(255, 'A descrição deve ter no máximo 255 caracteres.')
                .required('A descrição é obrigatória.'),
        });

        try {
            await schema.validate({ firstName: this.firstName, lastName: this.lastName, about: this.about }, { abortEarly: true });
            return null;
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return error.errors[0];
            }
        }
    }

    public async update(res: Response): Promise<void> {
        try {
            const connection = await connectDatabase();
            const uuid = this.token ? extractValueFromToken(this.token, 'uuid') : undefined;

            if (!uuid) {
                res.status(400).json({ error: 'Token inválido.' });
                return;
            }

            const validationError = await this.validate();

            if (validationError !== null) {
                res.status(400).json({ error: validationError });
                return;
            }

            await connection.execute('UPDATE user_profile SET first_name = ?, last_name = ?, about = ?, country = ?, language = ? WHERE uuid = ?', [this.firstName, this.lastName, this.about, this.country, this.language, uuid]);
            res.status(200).json({ success: 'Perfil atualizado com sucesso.' });
            connection.end();
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro interno no servidor.' });
            return;
        }
    }
}