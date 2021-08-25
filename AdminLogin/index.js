const jwt = require ('jsonwebtoken');
const AWS = require('aws-sdk');
const dbClient = new AWS.DynamoDB.DocumentClient();

const crosHeaders = {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
        };
        
const invalidParaResponse = {
    statusCode: 500,
    headers: crosHeaders,
    body: JSON.stringify('Invalid parameters in requestBody, please contains UserId and Password')
}

const resourceNotFoundResponse = {
    statusCode: 501,
    headers: crosHeaders,
    body: JSON.stringify('Account does not exist')
}

const passwordErrorResponse = {
    statusCode: 503,
    headers: crosHeaders,
    body: JSON.stringify('Password is invalid')
}

const incorrectFormatResponse = {
    statusCode: 502,
    headers: crosHeaders,
    body: JSON.stringify('Format of requested item is incorrect')
}
exports.handler = async (event) => {
    // TODO implement
    const requestBody = JSON.parse(event.body);
    console.log(requestBody);
    if (!requestBody.UserId || !requestBody.Password) {
        return invalidParaResponse;
    }
    const oldItem = await dbClient.get({TableName: 'adminTable', Key: {"UserId": requestBody.UserId}}).promise();
    if (!oldItem || !oldItem.Item || !oldItem.Item.UserId) {
        return resourceNotFoundResponse;
    }
    if (oldItem.Item.Password != requestBody.Password) {
        return passwordErrorResponse;
    }
    const token = jwt.sign({UserId: requestBody.UserId, IsAdmin: true}, 'JingPersonalProject');
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(token),
        headers: crosHeaders
    };
    return response;
};