import { extractValueFromToken } from "@/utils/jwt";    // Extract Value From JWT Token Function
import { connectDatabase } from "@/utils/database";     // Connect Database Function
import { Response } from 'express';                     // Response Module

export default class GetUser {
    private token?: string;
    private username?: string;

    constructor(token?: string, username?: string) {
        this.token = token;
        this.username = username;
    }

    public async get(res: Response): Promise<void> {
        try {
            const connection = await connectDatabase();
            const uuid = this.token ? await extractValueFromToken(this.token, 'uuid') : undefined;
    
            if (!uuid && !this.username) {
                res.status(400).json({ error: 'Requisição inválida.' });
                return;
            }
    
            let accountType: any = 0;
            let query: string = '';
    
            if (uuid) {
                [accountType] = await connection.query('SELECT account_type from user_account WHERE uuid = ?', [uuid]);
            } else if (this.username) {
                [accountType] = await connection.query('SELECT account_type from user_account WHERE username = ?', [this.username]);
            }
    
            if (accountType[0].account_type === 0) {
                query =`
                SELECT ua.email, ua.username, ua.account_type, up.first_name, up.last_name, up.about, up.country, up.language
                FROM user_account ua
                JOIN user_profile up ON up.uuid = ua.uuid`;
            } else if (accountType[0].account_type === 1) {
                query =`
                SELECT ua.email, ua.username, ua.account_type, up.first_name, up.last_name, up.about, up.country, up.language, up.experience, up.planguage, up.framework, up.competence
                FROM user_account ua
                JOIN user_profile up ON up.uuid = ua.uuid`;
            }
    
            if (uuid) {
                query += ` WHERE ua.uuid = ?`;
            } else if (this.username) {
                query += ` WHERE ua.username = ?`;
            }
    
            const queryParams = [uuid ? uuid : this.username];
            const [row] = await connection.query(query, queryParams);
    
            if (!row) {
                res.status(404).json({ error: 'Usuário não encontrado.' });
                return;
            }
    
            res.status(200).json(row);
            connection.end();
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }
}