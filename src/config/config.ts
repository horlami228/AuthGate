// config file for database connection
// import dotenv from 'dotenv';
import dotenvSafe from 'dotenv-safe';

dotenvSafe.config({
    allowEmptyValues: true,
    example: './path/to/.env.example',  // Path to your .env.example file
    path: './path/to/.env'  // Path to your .env file
});

type DbConfig = {
    url: string;
    dialect: string;
    protocol: string;
    logging: boolean;
    define: {
        timestamps: boolean;
    };
    pool: {
        max: number;
        min: number;
        idle: number;
    };
    charset: string;
}

type Config = {
    development: DbConfig;
    production: DbConfig;
}

function getConfig(env: 'development' | 'production'): DbConfig {
    if (env === 'production' && (!process.env.PROD_DATABASE_URL || !process.env.PROD_DATABASE_DIALECT || !process.env.PROD_DATABASE_PROTOCOL)) {
        throw new Error("Production database configuration is incomplete. Please check your environment variables.");
    }
    return {
        url: process.env[`${env.toUpperCase()}_DATABASE_URL`] || 'mysql://root:root@localhost:3306/expressjs',
        dialect: process.env[`${env.toUpperCase()}_DATABASE_DIALECT`] || 'mysql',
        protocol: process.env[`${env.toUpperCase()}_DATABASE_PROTOCOL`] || 'mysql',
        logging: env === 'development', // Enable logging in development by default
        define: {
            timestamps: env === 'development', // Enable timestamps in development by default
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
        charset: 'utf8',
    };
}

const config: Config = {
    development: getConfig('development'),
    production: getConfig('production'),
};
