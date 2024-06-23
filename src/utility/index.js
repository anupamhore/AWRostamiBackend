
/*
    This file contains the utility functions that are used in the application.
    The functions are used to send response to the client.
    This function prepares the success reponse body and sends it to the client.
*/
const sendResponse = (res, data, message, success, code) =>{

    const responseObj = {
        responseData: data,
        message: message,
        success: success,
        responseCode: code
    };

    res.format({
        json: () => {
            res.send(responseObj);
        }
    });
};


/*
    This function prepares the error reponse body and sends it to the client.
*/
const sendError = (res, data, msg) =>{

    if(!res){
        return false;
    }
    sendResponse(res, data, msg || "Request Failed", false, 400);
};

export { sendResponse, sendError };