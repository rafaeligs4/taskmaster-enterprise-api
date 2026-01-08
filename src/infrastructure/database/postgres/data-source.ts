import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost", // Si corres la app local, usa localhost. Si es docker, usa 'postgres'
    port: 5432,
    username: process.env.POSTGRES_USER || "admin",      // Debe coincidir con docker-compose
    password: process.env.POSTGRES_PASSWORD || "adminpassword", // Debe coincidir con docker-compose
    database: process.env.POSTGRES_DB || "taskmaster_db", // Debe coincidir con docker-compose
    synchronize: true, // ⚠️ TRUE solo en Dev. Crea las tablas automáticamente. En Prod se usa false.
    logging: false,
    entities: [
        // Aquí pondremos nuestras entidades (tablas) luego
        "src/infrastructure/database/postgres/entities/**/*.ts"
    ],
    subscribers: [],
    migrations: [],
});