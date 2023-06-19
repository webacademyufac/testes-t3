import 'dotenv/config'; // Carrega as variáveis de ambiente definidas no arquivo .env
import 'reflect-metadata'; // Carrega os metadados do TypeScript

import express from 'express'; // Importa o módulo express
import cors from 'cors'; // Importa o módulo cors para lidar com as configurações de CORS
import { AppDataSource } from './database/data-source'; // Importa a classe AppDataSource responsável por inicializar o banco de dados
import routers from './app/routes/routes'; // Importa as rotas definidas na aplicação

const port = process.env.PORT || 3000; // Define a porta do servidor, utilizando a variável de ambiente ou a porta padrão 3000

const app = express(); // Cria uma instância do express

app.use(express.json()); // Habilita o express para receber requisições com formato JSON
app.use(routers); // Registra as rotas definidas na aplicação

// Inicializa o banco de dados
AppDataSource.initialize().then(() => {
    // Inicializa o servidor
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.log('Error on initialize database', error);
});
