import { extractValueFromToken } from "@/utils/jwt";    // Extract Value From JWT Token Function
import { connectDatabase } from "@/utils/database";     // Connect Database Function
import { RowDataPacket } from "mysql2/promise";         // RowDataPacket Type
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

            let query: string = '';

            if (accountType === 0) {
                query += `SELECT ua.email, ua.username, ua.account_type, up.first_name, up.last_name, up.about, up.country, up.language
                FROM user_account ua
                JOIN user_profile up ON up.uuid = ua.uuid`
            } else if (accountType === 1) {
                query += `SELECT ua.email, ua.username, ua.account_type, up.first_name, up.last_name, up.about, up.country, up.language, up.experience, up.planguage, up.framework, up.competence
                FROM user_account ua
                JOIN user_profile up ON up.uuid = ua.uuid`
            }

            const queryParams = [];

            if (uuid) {
                query += ` WHERE ua.uuid = ?`;
                queryParams.push(uuid);
            } else if (this.username) {
                query += ` WHERE ua.username = ?`;
                queryParams.push(this.username);
            }

            const [rows] = await connection.execute(query, queryParams);

            if (!Array.isArray(rows)) {
                res.status(500).json({ error: 'Erro ao buscar dados do usuário.' });
                return;
            }

            if (rows.length === 0) {
                res.status(404).json({ error: 'Usuário não encontrado.' });
                return;
            }

            const row = rows[0] as RowDataPacket;

            res.status(200).json(row);
            connection.end();
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }
}