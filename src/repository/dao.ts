import { Database } from "sqlite3";

const dbpath = './db/telavip.db';
const db = new Database(dbpath);

export { db }