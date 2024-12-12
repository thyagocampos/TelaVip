import { db } from "./dao";

export class GenericDao<T> {
    async getAll(sql: string) {
        return new Promise<T[]>((resolve, reject) => {

            db.all<T>(sql, (err, rows) => {
                if (err) {
                    reject(err);

                }

                resolve(rows);

            });
        });
    }

    async getById(sql: string, id: number) {

        return new Promise<T>((resolve, reject) => {

            db.get<T>(sql, id, (err, row) => {
                if (err) {
                    reject(err);
                }

                resolve(row);
            });
        });

    }

    async post(sql: string, item: T) {
        return new Promise<T>((resolve, reject) => {

            if (!item || typeof item !== "object") {
                throw new Error("O parâmetro 'item' não é válido.");
            }

            let c = Object.values(item);

            db.run(sql, c, (err) => {
                if (err) {
                    reject(err);

                }

                resolve(item);

            });
        })
    }

    async postMovie(sql: string, item: T) {
        return new Promise<T>((resolve, reject) => {

            if (!item || typeof item !== "object") {
                throw new Error("O parâmetro 'item' não é válido.");
            }

            let c = Object.values(item);

            db.run(sql, c, (err) => {
                if (err) {
                    reject(err);

                }

                resolve(item);

            });
        })
    }

    async put(sql: string, item: T, id: number) {
        return new Promise<T>((resolve, reject) => {

            if (!item || typeof item !== "object") {
                throw new Error("O parâmetro 'item' não é válido.");
            }

            let c = [...Object.values(item), id];

            db.run(sql, c, (err) => {
                if (err) {
                    reject(err);
                }

                resolve(item);

            });

        });
    }

    async delete(sql: string, id: number) {
        return new Promise<boolean>((resolve, reject) => {

            db.run(sql, [id], (err) => {

                if (err) {
                    reject(err);

                }

                resolve(true);

            });
        });
    }
}