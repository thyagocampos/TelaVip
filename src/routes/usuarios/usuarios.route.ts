import { FastifyInstance } from "fastify";
import { usuarioController } from "../../controllers/usuarios/usuarios.controller";

export const routeUsuarios = async (app: FastifyInstance) => {
    app.post('/usuario', usuarioController.postUsuario);
    app.post('/login', usuarioController.login);
}