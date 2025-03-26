import 'dotenv/config'
import {
    Sequelize,
} from 'sequelize';

const username = process.env.PG_USER
const password = process.env.PG_PASSWORD
const host = process.env.PG_HOST
const port = process.env.PG_PORT
const database_name = process.env.PG_DB

const sequelize = new Sequelize(`postgres://${username}:${password}@${host}:${port}/${database_name}`);

export {
    sequelize,
}