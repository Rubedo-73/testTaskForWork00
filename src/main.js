import 'dotenv/config'
import express from 'express';
import { User } from './db/models/index.js'
import { sequelize } from './db/postgresql.js'
import { Umzug, SequelizeStorage } from 'umzug';
import router from './router/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router)

const port = process.env.server_port;

const umzug = new Umzug({
    migrations: {
        glob: 'src/db/migrations/createUsersTable.js',
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

// Инициализация базы данных и выполнение миграций
const initDb = async () => {
    await sequelize.authenticate();
    console.log('Соединение с базой данных установлено.');
    const migrations = await umzug.pending()
    console.log('<<<<<<<<<<<<<<migrations>>>>>>>>>>>>>>');
    console.log(`${JSON.stringify(migrations, null , 2)}`);
    console.log('<<<<<<<<<<<<<<migrations>>>>>>>>>>>>>>');
    // console.log('<<<<<<<<<<<<<<????????>>>>>>>>>>>>>>');
    // console.log(`${JSON.stringify(  , null , 2)}`);
    // console.log('<<<<<<<<<<<<<<????????>>>>>>>>>>>>>>');


    await umzug.up();
    // Добавление пользователя с балансом 10000
    const userExists = await User.findOne();
    //{ where: { balance: 10000 } }
    console.log(`<<<<<<<<<<userExists>>>>>>>>>>`);
    console.log(JSON.stringify(userExists, null, 2));
    console.log(`<<<<<<<<<<userExists>>>>>>>>>>`);

    if (!userExists) {
        await User.create({
            username: 'test',
            balance: 10000
        });
        console.log('Пользователь с балансом 10000 добавлен.');
    }

    console.log('Миграции выполнены.');
};

// Запуск сервера
app.listen(port, async () => {
    await initDb();
    console.log(`Сервер запущен на http://localhost:${port}`);
});