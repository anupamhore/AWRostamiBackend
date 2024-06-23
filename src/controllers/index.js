import Tracker from '../model/tracker';
import { sendResponse, sendError} from '../utility';
import Logger from '../logger/logger';
import 'dotenv/config';


module.exports = {
    

    /*
        This function stores the GPS data in the database.
        It takes the request object and response object as input.
        It extracts the vehicleId and location from the request body.
        It creates a new Tracker object and saves it in the database.
        It sends a success response to the client.
        In case of any error, it sends an error response to the client.
    */
    storeGPS: async (req, res) => {
    
        try {

            const requestData = req.body;

            // Check if requestData is empty
            if (Object.keys(requestData).length === 0) {
                // Handle the case where requestData is empty
                return res.status(400).send({ error: 'Request data is empty' });
            }
            
            Logger.info(`GeoLocation Data for ${requestData.vehicleId}: ${JSON.stringify(requestData)}`);


            const newLocation = new Tracker({
                vehicleId: requestData.vehicleId,
                location: {
                    type: 'Point',
                    coordinates: requestData.location.coordinates
                }
            });
            await newLocation.save();

            const resObj = {
                vehicleId: requestData.vehicleId,
                success: true
            };

            sendResponse(res, resObj, "Location stored successfully", true, 200);

        } catch (error) {

            Logger.info(`Error storing location: ${error.message}`);
            sendError(res, error.message, "Problem storing location");
        }
            
    
    
    },


    /*
        This function retrieves the latest location of a vehicle from the database.
        It takes the request object and response object as input.
        It extracts the vehicleId from the request body.
        It queries the database for the latest location of the vehicle.
        It sends the location data to the client based on the page number.
        Limit is set to 1, so only one record is sent to the client.
        In case of any error, it sends an error response to the client.
    */
    getVehicleLocation: async (req, res) => {
        try {
            const { vehicleId, pageNo } = req.body;

            const page = parseInt(pageNo) || 1;
            const limit = 1;
            const skip = (page - 1) * limit;

            Logger.info(`Getting Vehicle Location for ${vehicleId}, Page: ${page}, Limit: ${limit}`);
    

            const aggregationPipeline = [
                { $match: { vehicleId: vehicleId } },
                { $sort: { timestamp: 1 } },
                { $project: { location: 1, timestamp: 1 } }, 
                {
                    $facet: {
                        paginatedResults: [{ $skip: skip }, { $limit: limit }],
                        totalCount: [{ $count: "count" }]
                    }
                }
            ];


            const result = await Tracker.aggregate(aggregationPipeline);

            if (!result[0].paginatedResults.length) {
                sendError(res, "No new location found", "No new location found", 404);
                return;
            }

            const vehicleLocation = result[0].paginatedResults[0];
            const totalRecords = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;

            const resObj = {
                vehicleId,
                location: vehicleLocation.location,
                timestamp: vehicleLocation.timestamp,
                totalRecords
            };
    
            sendResponse(res, resObj, "Vehicle location retrieved successfully", true, 200);
    
        } catch (error) {
            Logger.info(`Error sending Vehicle Location: ${error.message}`);
            sendError(res, "Error fetching vehicle location", error.message, 500);
        }
    },
}