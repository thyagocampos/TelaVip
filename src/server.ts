import fastify from "fastify";
import { routeUsuarios } from "./routes/usuarios/usuarios.route";
import { routeIMDB } from "./routes/usuarios/imdb.route";
import { routeFilmes } from "./routes/usuarios/filme.routes";
import * as jwt from "jsonwebtoken";

export const app = fastify();

const secret: string = "p@$$w0rd.chk000123";

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