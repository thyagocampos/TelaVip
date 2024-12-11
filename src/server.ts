import fastify from "fastify";
import { routeUsuarios } from "./routes/usuarios/usuarios.route";
import { routeIMDB } from "./routes/usuarios/imdb.route";

export const app = fastify();

app.register(routeUsuarios, { prefix: '/api'});
app.register(routeIMDB, { prefix: '/api'});

app.listen({ port: 3000 }, (err, resp) => {
    if (err) {
        console.log(err);

    } else {

        console.log('Servidor rodando na porta 3000');

    }
})