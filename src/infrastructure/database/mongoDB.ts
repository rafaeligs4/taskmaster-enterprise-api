import mongoose from "mongoose";
import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { Task } from "../../domain/entities/Task";

export class MongoDBConnection {
    private isAviableConnection: boolean = false;
    private url: string = "";
    constructor() {
        this.url = process.env.MONGO_URI || "";
        if (!this.url) {
            console.warn("Advertencia: MONGO_URI no está definida en las variables de entorno.");
        }
        // Lógica para conectar a MongoDB usando la URL proporcionada
    }
    public async connect(): Promise<void> {
        if (this.isAviableConnection) {
            console.log("Ya hay una conexión activa a MongoDB.");
            return;
        }
        mongoose.connect(this.url).then(() => {
            this.isAviableConnection = true;
            console.log("Conexión a MongoDB establecida.");
        }).catch((err) => {
            console.error("Error al conectar a MongoDB:", err);
        });
    }

    public getInstance(): mongoose.Connection {
        return mongoose.connection;
    }

}