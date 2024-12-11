import { IUsuario } from "../../models/usuario.interface";
import * as crypto from "crypto";
import * as bcrypt from "bcrypt";
import { UsuariosDao } from "../../repository/usuariosdao";

export class UsuariosService {

    usuariosDao: UsuariosDao = new UsuariosDao();

    postUser = async (usuario: IUsuario) => {
        if (!usuario.id) {
            usuario.id = crypto.randomUUID();
        }

        usuario.senha = bcrypt.hashSync(usuario.senha, 10);
        return await this.usuariosDao.postUser(
            "INSERT INTO TB_USUARIOS (ID, NOME, EMAIL, SENHA) VALUES (?, ?, ?, ?)",
            usuario);

    }

    findByEmail = async (email: string) => {
        return await this.usuariosDao.findByEmail(
            "SELECT * FROM TB_USUARIOS WHERE EMAIL=?", email);
    }

    checkPassword = async (pwdInfo: string, pwdUser: string) => {
        return bcrypt.compareSync(pwdInfo, pwdUser);
    }
}

export const usuarioService = new UsuariosService();