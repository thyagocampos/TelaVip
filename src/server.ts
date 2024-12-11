import fastify from "fastify";
import { routeUsuarios } from "./routes/usuarios/usuarios.route";

export const app = fastify();

app.register(routeUsuarios, { prefix: '/api'});

app.listen({ port: 3000 }, (err, resp) => {
    if (err) {
        console.log(err);

    } else {

        console.log('Servidor rodando na porta 3000');

    }
})