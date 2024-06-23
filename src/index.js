import Express from 'express';
import { createServer } from 'http';
import configureExpressApp from './config';
import connectMongoDB from './dbConnection';
import applyRoutes from './routes';
import 'dotenv/config';


const app = Express();
const httpServer = createServer(app);
configureExpressApp(app);

const startServer = async () => {

    try {
        
        //connect database
        await connectMongoDB();

        //listen to port and apply routes
        httpServer.listen(process.env.PORT);

        //apply routes
        applyRoutes(app);

        console.log(`Server is running on port ${process.env.PORT}`);
    }
    catch (error) {
        console.error(`Error starting server: ${error.message}`);
    }
}

startServer();

