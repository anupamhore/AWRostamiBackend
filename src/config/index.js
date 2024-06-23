import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';


/*
    This function configures the express app.
    It adds the necessary middleware to the app.
    It takes the express app object as input.
    It adds the body-parser middleware to the app.
    It adds the compression middleware to the app.
    It adds the cors middleware to the app.
*/
const configureExpressApp = (app) =>{

    app.use(bodyParser.json({limit:'50mb'}));
    app.use(bodyParser.urlencoded({limit:'50mb', extended: true}));

    app.use(compression(9));

    app.use(cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
}

export default configureExpressApp;