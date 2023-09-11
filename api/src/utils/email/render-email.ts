import path from 'path';    // System Path
import fs from 'fs';        // File System Module

interface EmailParams {
    username: string;
    message: string[];
    button: string[];
}

const templatePath = path.join(__dirname, 'template.html');

export default function renderEmail(params: EmailParams) {
    try {
        const template = fs.readFileSync(templatePath, 'utf-8');

        const emailContent = template
            .replace('{{username}}', params.username)
            .replace('{{message[0]}}', params.message[0])
            .replace('{{message[1]}}', params.message[1])
            .replace('{{button[0]}}', params.button[0])
            .replace('{{button[1]}}', params.button[1]);
        return emailContent;
    } catch (error) {
        console.log(error);
    }
}