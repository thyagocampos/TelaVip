import { IUsuario } from '../models/usuario.interface';
import { db } from './dao'
export class UsuariosDao {
    
    async postUser(sql: string, item: IUsuario) {

        return new Promise<IUsuario>((resolve, reject) => {
            db.run(sql, [item.id, item.nome, item.email, item.senha], (err) => {
                if (err) {
                    reject(err);

                }

                resolve(item);

            });
        })
    }

    async findByEmail(sql: string, email: string) {
        return new Promise<IUsuario>((resolve, reject) => {
            db.get<IUsuario>(sql, email, (err, row) => {
                if (err) {
                    reject(err);

                }

                resolve(row);

            });
        });
    }
}