import { sendError } from './index';
import * as yup from 'yup';


module.exports = {

    /*
        This function validates the request body for the create vehicle API.
    */
    validateGPS: async (req, res, next)=>{

        const schema = yup.object().shape({
            vehicleId: yup.string().required(),
            location: yup.object().shape({
                type: yup.string().required().equals(["Point"]),
                coordinates: yup.array().of(yup.number()).min(2).max(2).required()
            })
        });
        await validate(schema, req.body, res, next);
    },

    /*
        This function validates the request body for the get vehicle location API.
    */
    validateVehicleLocation: async (req, res, next)=>{

        const schema = yup.object().shape({
            vehicleId: yup.string().required()
        });
        await validate(schema, req.body, res, next);
    },
}


/*
    This function validates the request body against the schema.
    If the request body is valid, it calls the next middleware.
    If the request body is invalid, it sends an error response to the client.
*/
const validate = async (schema, reqData, res, next)=>{
    try {
        await schema.validate(reqData,{abortEarly: false});
        next();
    } catch (error) {
        const errors = error.inner.map(({path, message, value})=>({
            path, 
            message,
            value
        }));
        sendError(res, errors, "Invalid request");
    }
}