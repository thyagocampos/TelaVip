import { FastifyReply, FastifyRequest } from "fastify";
import { usuarioService } from "../../services/usuarios/usuarios.service";
import { IUsuario } from "../../models/usuario.interface";
import * as jwt from "jsonwebtoken";

const secret: string = "p@$$w0rd.chk000123";

export class UsuariosController {

    async postUsuario(request: FastifyRequest, response: FastifyReply) {
        const newUser = request.body as IUsuario;
        const usuario = await usuarioService.postUser(newUser);
        response.status(201).send(usuario);
    }

    async login(request: FastifyRequest, response: FastifyReply) {
        try {
            const { email, senha } = request.body as IUsuario;

            // Verificando se o usuário existe
            const usuario = await usuarioService.findByEmail(email);
            if (!usuario) {
                return response.status(404).send({ message: "Nenhum usuário com este email." });
            }

            // Verificando se a senha está correta
            const check = await usuarioService.checkPassword(senha, usuario.senha);
            if (!check) {
                return response.status(401).send({ message: "Senha incorreta" });
            }

            // Gerando o token JWT
            const token = jwt.sign(
                { id: usuario.id, nome: usuario.nome, email: usuario.email },
                secret,
                { expiresIn: "1h" }
            );


            response.status(200).send({ token, id:usuario.id });
        } catch (error: any) {
            response.status(500).send({ message: "Erro interno", error: error.message });
        }
    }

    async checkToken(request: FastifyRequest, response: FastifyReply) {
        try {
            // Obtendo o token do cabeçalho de autorização
            const token = request.headers.authorization?.replace(/^Bearer\s/, "");
            if (!token) {
                return response.code(401).send({ message: "Não autorizado" });
            }

            // Verificando o token e buscando o usuário
            const user = await this.verifyToken(token);
            if (!user) {
                return response.code(401).send({ message: "Token inválido" });
            }

            // Token válido
            return response.status(200).send({ message: "Token válido", user });
        } catch (error: any) {
            return response.code(401).send({ message: "Token inválido ou expirado", error: error.message });
        }
    }

    async verifyToken(token: string): Promise<IUsuario | null> {
        try {
            // Decodificando o token
            const decodedToken = jwt.verify(token, secret) as IUsuario;

            // Buscando o usuário no banco de dados
            const user = await usuarioService.findByEmail(decodedToken.email);
            return user || null;
        } catch (error) {

            const message = (error as Error).message;

            console.error("Erro ao verificar token " + message);
            return null;
        }
    }
}

export const usuarioController = new UsuariosController();
