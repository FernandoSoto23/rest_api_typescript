import express from 'express';
import router from './router';
import db from './config/db';
import swaggerUi from 'swagger-ui-express';
import morgan from "morgan"
import swaggerSpec, {swaggerUiOptions} from './config/swagger';
import cors, { CorsOptions } from "cors"
//Conectar a db

async function connectDB(){
    try{
        await db.authenticate();
        db.sync();
        console.log('Conexion exitosa en la DB');
    }catch (error){
        console.error(error);
        console.log('Error al conectar a la DB')
    }
}
connectDB();

//Instancia de express
const server = express()
//Permitir Conexiones
const corsOptions : CorsOptions = {
    origin: function(origin,callback){
        console.log(origin);
        if(origin === process.env.FRONTEND_URL){
            callback(null,true);
        }else{
            callback(new Error("Error de CORS"));
        }
    }
}
server.use(cors(corsOptions));
//Leer datos de formularios
server.use(express.json())

server.use(morgan("dev"))
server.use('/api/products', router)

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,swaggerUiOptions));

export default server;
