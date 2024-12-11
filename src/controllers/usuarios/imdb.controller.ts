import { FastifyReply, FastifyRequest } from "fastify";
import { imdbService } from "../../services/externo/imdb.service";

export class ImdbController {

    getFilme = async (request: FastifyRequest, response: FastifyReply) => {
        
        const { nomeFilme } = request.params as { nomeFilme: string };
        
        const { anoFilme } = request.params as { anoFilme: string };
        
        const cliente = await imdbService.retornaFilme(nomeFilme, anoFilme);        

        response.status(200).send(cliente);

    }
}

export const imdbController = new ImdbController();