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
            const usuario = await usuarioController.verifyToken(token);

            console.log(usuario);

            if (usuario) {
                if (usuario?.id) {
                    newFilme.id_usuario = usuario?.id;

                    console.log(newFilme);

                    filmeService.postFilme(newFilme);

                    response.status(201).send(newFilme);
                }
            }
        }
        else {
            response.code(401).send({ message: 'Token inválido' });
        }

        response.code(401).send({ message: 'Erro ao adicionar filme' });
    }

    getAll = async (request: FastifyRequest, response: FastifyReply) => {

        const { IDUsuario } = request.params as { IDUsuario: string };

        const token = request.headers.authorization?.replace(/^Bearer /, "");

        if (token) {
            const usuario = await usuarioController.verifyToken(token);

            if (usuario) {
                const filmes = filmeService.getAllFilmes(IDUsuario);

                return filmes;
            }
            else{
                response.code(401).send({ message: 'Usuário inválido' });    
            }
        }
        else {
            response.code(401).send({ message: 'Token inválido' });
        }

    }
}

export const filmeController = new FilmeController();