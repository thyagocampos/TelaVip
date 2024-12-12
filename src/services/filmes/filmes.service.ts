import { IFilme } from "../../models/filme.interface";
import { GenericDao } from "../../repository/genericdao";

export class FilmeService {

    genericDao: GenericDao<IFilme> = new GenericDao<IFilme>();

    postFilme = async (filme: IFilme) => {
        return await this.genericDao.post(
            "INSERT INTO TB_FILMES (id_usuario, nome, plot, urlimagem) VALUES (?, ?,?,?)",
            filme);
    }

    getAllFilmes = async (IDUsuario: string) => {
        return await this.genericDao.getAll(
            "SELECT * FROM TB_FILMES WHERE ID_USUARIO =?",
            IDUsuario
        );
    }

}

export const filmeService = new FilmeService();
