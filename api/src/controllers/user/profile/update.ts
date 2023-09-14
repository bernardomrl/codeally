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

    private experience?: string;
    private planguage?: string;
    private framework?: string;
    private competence?: string;

    constructor(
        token: string, 
        firstName?: string, 
        lastName?: string, 
        about?: string, 
        country?: string, 
        language?: string,
        experience?: string,
        planguage?: string,
        framework?: string,
        competence?: string
    ) {
        this.token = token;
        this.firstName = firstName;
        this.lastName = lastName;
        this.about = about;
        this.country = country;
        this.language = language;
        this.experience = experience;
        this.planguage = planguage;
        this.framework = framework;
        this.competence = competence;
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
            const uuid = this.token ? await extractValueFromToken(this.token, 'uuid') : undefined;

            if (!uuid) {
                res.status(400).json({ error: 'Token inválido.' });
                return;
            }

            const [accountType]: any = await connection.execute('SELECT account_type FROM user_account WHERE uuid = ?', [uuid]);

            const validationError = await this.validate();

            if (validationError !== null) {
                res.status(400).json({ error: validationError });
                return;
            }

            if (accountType[0].account_type === 0) {
                await connection.execute('UPDATE user_profile SET first_name = ?, last_name = ?, about = ?, country = ?, language = ? WHERE uuid = ?', [this.firstName, this.lastName, this.about, this.country, this.language, uuid]);
                connection.end();
                res.status(200).json({ success: 'Perfil atualizado com sucesso.' });
                return;
            }

            if (accountType[0].account_type === 1) {
                await connection.execute('UPDATE user_profile SET first_name = ?, last_name = ?, about = ?, country = ?, language = ?, experience = ?, planguage = ?, framework = ?, competence = ? WHERE uuid = ?', [this.firstName, this.lastName, this.about, this.country, this.language, this.experience, this.planguage, this.framework, this.competence, uuid]);
                connection.end();
                res.status(200).json({ success: 'Perfil atualizado com sucesso.' });
                return;
            }

            res.status(500).json({ error: 'Erro ao atualizar perfil, tipo de conta não definida.' });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro interno no servidor.' });
            return;
        }
    }
}