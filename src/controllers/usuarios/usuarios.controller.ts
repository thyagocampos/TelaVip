import { FastifyReply, FastifyRequest } from "fastify";
import { usuarioService } from "../../services/usuarios/usuarios.service";
import { IUsuario } from "../../models/usuario.interface";

export class UsuariosController {

    postUsuario = async (request: FastifyRequest, response: FastifyReply) => {
        const newUser = request.body as IUsuario;
        const usuario = await usuarioService.postUser(newUser);
        response.status(201).send(usuario);
    }

    login = async (request: FastifyRequest, response: FastifyReply) => {
        try {
            const { email, senha } = request.body as IUsuario;
            // verificando se o usuário existe

            const usuario = await usuarioService.findByEmail(email);
            if (!usuario) {
                throw new Error("Nenhum usuário com este email.");

            }

            // verificando se a senha está correta
            const check = await usuarioService.checkPassword(senha, usuario.senha);
            if (!check) {
                throw new Error("Senha incorreta");
            }

            response.status(200).send(usuario);

        } catch (error) {

            response.status(400).send(error);

        }
    }
}

export const usuarioController = new UsuariosController();