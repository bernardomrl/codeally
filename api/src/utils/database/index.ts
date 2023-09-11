import mysql from 'mysql2/promise'; // MySQL Modules
import dotenv from 'dotenv';        // DotEnv Module

// * DotEnv Settings
dotenv.config();

export const connectDatabase = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME
    });
    return connection;
}