import { MongoClient } from 'mongodb';

export const mongoConnection = {
    async connect({mongoConnectionString, mongoDbName}) {
        try {
            const client = new MongoClient(mongoConnectionString);

            await client.connect();
            const db = client.db(mongoDbName);

            this.client = client;
            this.db = db;

        } catch(error) {
            console.log({ text: 'Erro durante a conexão do mongo', error});
            throw error;
        }        
    }
};
