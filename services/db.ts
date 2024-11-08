import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    server: process.env.DB_SERVER as string,
    database: process.env.DB_DATABASE as string,
    options: {
        encrypt: false,
        enableArithAbort: true,
    },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then((pool) => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch((err) => {
        console.error('Database Connection Failed:', err);
        throw new Error('Failed to connect to the database');
    });

export { poolPromise };
