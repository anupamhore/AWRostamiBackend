import * as Controller from '../controllers';
import * as Validation from '../utility/validator';

/*
    This function applies the routes to the express app.
    The routes are defined in the controller and the validation files.
    The routes are applied to the express app using the app object.
    The routes are applied using the app object.

*/
const applyRoutes = (app) => {

    app.get('/', (req, res) =>{
        res.send("Server is running fine....");
    })

    //apply routes
    app.post('/api/storeGPS',Validation.validateGPS,Controller.storeGPS);
    app.post('/api/getVehicleLocation',Validation.validateVehicleLocation,Controller.getVehicleLocation);

}

export default applyRoutes;