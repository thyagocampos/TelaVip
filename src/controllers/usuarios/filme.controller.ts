import { FastifyReply, FastifyRequest } from "fastify";
import { IFilme } from "../../models/filme.interface";
import { usuarioController } from "./usuarios.controller";
import { filmeService } from "../../services/filmes/filmes.service";

const secret: string = "p@$$w0rd.chk000123";

export class FilmeController {

    postFilme = async (request: FastifyRequest, response: FastifyReply) => {

        const newFilme = request.body as IFilme;        

        const token = request.headers.authorization?.replace(/^Bearer /, "");

        if (token) {
            const usuario = usuarioController.verifyToken(token);

            usuario.then((usuario) => {

                if (usuario?.id){
                    newFilme.id_usuario = usuario?.id;                    

                    filmeService.postFilme(newFilme);

                    console.log(newFilme);
                }                                    
            })
        }
        else {
            response.code(401).send({ message: 'Token inválido' });
        }

        response.status(201).send(newFilme);
    }

}

export const filmeController = new FilmeController();