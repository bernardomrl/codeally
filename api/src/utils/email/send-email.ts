import { renderEmail } from '@/utils/email';    // Render Email Function
import nodemailer from 'nodemailer';            // Nodemailer Module
import dotenv from 'dotenv';                    // DotEnv Module

// * DotEnv Settings
dotenv.config();

interface EmailParams {
    to: string;
    subject: string;
    username: string;
    message: string[];
    button: string[];
}

export default async function sendEmail(params: EmailParams): Promise<void> {
    try {
        const emailContent = renderEmail({
            username: params.username,
            message: [params.message[0], params.message[1]],
            button: [params.button[0], params.button[1]],
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            }
        });

        const emailOptions = {
            from: process.env.NODEMAILER_USER,
            to: params.to,
            subject: params.subject,
            html: emailContent,
        }

        await transporter.sendMail(emailOptions);
        console.log(`E-mail enviado para: ${params.to}`)
    } catch (error) {
        console.log(error);
    }
}