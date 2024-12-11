import { FastifyInstance } from "fastify";
import { imdbController } from "../../controllers/usuarios/imdb.controller";

export const routeIMDB = async (app: FastifyInstance) => {
    app.get('/filmes/:nomeFilme/:anoFilme', imdbController.getFilme);    
}