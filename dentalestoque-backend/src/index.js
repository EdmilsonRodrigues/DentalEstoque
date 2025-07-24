import cors from 'cors';
import express from 'express';

import { config } from 'dotenv';
import { process } from 'node:process';

import { mongoConnection } from './database/mongo.js';

import authRouter from './auth/auth.js';
import getUsersRouter from './routes/users.js';
import produtosRouter from './routes/produtos.js';
import fornecedoresRouter from './routes/fornecedores.js';
import locaisRouter from './routes/locais.js';

config();

async function main() {
    const HOSTNAME = 'localhost';
    const PORT = 3000;

    const app = express();

    await mongoConnection.connect({
        mongoConnectionString: process.env.MONGO_CS,
        mongoDbName: process.env.MONGO_DB_NAME
    });

    app.use(express.json());
    app.use(cors());

    app.get('/', (req, res) => {
        res.send({
            success: true,
            statusCode: '200',
            body: 'Bem vindo ao Dental Estoque'
        });
    });

    // routes
    app.use('/auth', authRouter);
    app.use('/users', getUsersRouter(mongoConnection));
    app.use('/produtos', produtosRouter);
    app.use('/fornecedores', fornecedoresRouter);
    app.use('/locais', locaisRouter);
    
    app.listen(PORT, () => {
        console.log(`Server running on: http://${HOSTNAME}:${PORT}`);
    });
}

main();
