import fastify from "fastify";
import cors from '@fastify/cors'; 

import { routeUsuarios } from "./routes/usuarios/usuarios.route";
import { routeIMDB } from "./routes/usuarios/imdb.route";
import { routeFilmes } from "./routes/usuarios/filme.routes";

export const app = fastify();

// Registrar o plugin de CORS
app.register(cors, {
    origin: 'http://localhost:3001', // Permitir apenas o frontend rodando na porta 3001
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Definir os métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Definir os cabeçalhos permitidos
});

app.register(routeUsuarios, { prefix: '/api' });
app.register(routeIMDB, { prefix: '/api' });
app.register(routeFilmes, { prefix: '/api' });

app.listen({ port: 3000, host: '0.0.0.0' }, (err, resp) => {
    if (err) {
        console.log(err);

    } else {

        console.log('Servidor rodando na porta 3000');

    }
})