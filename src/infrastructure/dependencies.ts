import { BcryptPasswordHasher } from "../application/services/HashPasswors";
import { JwtTokenProvider } from "../application/services/JWTProvider";
import { RefreshTokenService } from "../application/services/RefreshTokenService";
import { CreateTask } from "../application/services/Tasks/CreateTask";
import { FindTask } from "../application/services/Tasks/FindTask";
import { GetAllTask } from "../application/services/Tasks/GetAllTask";
import { UpdateStatusTask } from "../application/services/Tasks/UpdateStatusTask";
import { LoginUser } from "../application/services/Users/LoginUser";
import { RegisterUser } from "../application/services/Users/RegisterUser";
import { TaskRepositoryInMemory } from "./database/InmemoryTaskRepository";
import { UserRepositoryMongo } from "./database/models/UserRepositoryMongo";
import { MongoDBConnection } from "./database/mongoDB";
import { TaskRepositoryMongo } from "./database/TaskRepositoryMongo";
import { CreateTaskController } from './http/controllers/createTask.controller';
import { FindTaskController } from "./http/controllers/findTask.controller";
import { GetAllTaskController } from "./http/controllers/getAllTask.controller";
import { LoginUserController } from "./http/controllers/LoginUser.controller";
import { RefreshTokenController } from "./http/controllers/RefreshToken.controller";
import { RegisterUserController } from "./http/controllers/registerUser.controller";
import { UpdateTaskController } from "./http/controllers/updateTask.controller";
import { AuthMiddleware } from "./http/middlewares/AuthMiddleware";
import { RabbitMQProvider } from "./providers/rabbitMQ.provider";
import { TaskRepositoryPostgres } from "./repositories/TaskRepositoryPostgres";
import { UserRepositoryPostgres } from "./repositories/UserRepositoryPostgres";

/**
 * DEPENDENCIES
 * Aqui vamos a instanciar las dependencias que sean necesarias. Ya que no se generaran automaticamente como en un framework 
 */

// const taskRepository = new TaskRepositoryInMemory();
const connectionMongo = new MongoDBConnection();
connectionMongo.connect();
// Aqui podemos cambiar la implementacion del repositorio si es necesario
// MONGO
// const userRepository = new UserRepositoryMongo();
// const taskRepository = new TaskRepositoryMongo();
// POSTGRES
const userRepository = new UserRepositoryPostgres();
const taskRepository = new TaskRepositoryPostgres();
const passwordHasher = new BcryptPasswordHasher();
const jwtProvider = new JwtTokenProvider();
//
// const taskRepository = new TaskRepositoryInMemory();
/*
MIDLEWARES
*/
export const authMiddleware = new AuthMiddleware(jwtProvider);


/*
SERVICIOS 
*/
const notificationService = new RabbitMQProvider();
const createTaskRef = new CreateTask(taskRepository);
const getAllTask = new GetAllTask(taskRepository);
const findTaskById = new FindTask(taskRepository);
const updateTask = new UpdateStatusTask(taskRepository);
const registerUser = new RegisterUser(userRepository, passwordHasher, notificationService);
const loginUser = new LoginUser(userRepository, passwordHasher, jwtProvider);
const refreshToken = new RefreshTokenService(userRepository, jwtProvider, jwtProvider);
/*
CONTROLADORES 
*/
export const createTController = new CreateTaskController(createTaskRef);
export const getAllCont = new GetAllTaskController(getAllTask);
export const findByIdController = new FindTaskController(findTaskById);
export const updateTaskCont = new UpdateTaskController(updateTask);
export const registerUserCont = new RegisterUserController(registerUser);
export const loginUserCont = new LoginUserController(loginUser);
export const refreshTokenCont = new RefreshTokenController(refreshToken);