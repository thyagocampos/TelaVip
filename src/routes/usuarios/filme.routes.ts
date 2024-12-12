import { FastifyInstance } from "fastify";
import { filmeController } from "../../controllers/usuarios/filme.controller";

export const routeFilmes = async (app: FastifyInstance) => {
    app.post('/filmes/', filmeController.postFilme);   
    app.get('/filmes/:IDUsuario', filmeController.getAll);
    app.delete('/filmes/:IDFilme', filmeController.deleteFilme) 
}