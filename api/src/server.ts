require('tsconfig-paths').register({ baseUrl: './dist', paths: { '@/*': ['*'] } }); // Resolve TS Paths Alias
import dotenv from 'dotenv';                                                        // DotEnv Module
import app from '@/app';                                                            // Express Application

// * DotEnv Settings
dotenv.config();
const port = process.env.API_PORT;

// * Run Server
app.listen(port, () => {
    console.log(`API Rodando em http://localhost:${port}`);
})