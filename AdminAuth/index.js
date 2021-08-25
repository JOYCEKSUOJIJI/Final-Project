const jwt = require ('jsonwebtoken');
const AWS = require('aws-sdk');
const dbClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async function (event) {
    const token = event.authorizationToken;
    console.log('Get Token ' + token);
    const res = jwt.verify(token, 'JingPersonalProject');
    if (res && res.UserId && res.IsAdmin && res.iat) {
        const oldItem = await dbClient.get({TableName: 'adminTable', Key: {"UserId": res.UserId}}).promise();
        if (!oldItem || !oldItem.Item || !oldItem.Item.UserId) {
            throw Error("Unauthorized");
        }
        if (!res.IsAdmin) {
            throw Error("Unauthorized");
        }
        console.log('Successfully auth for ' + res.UserId);
        return generatePolicy('user', 'Allow', event.methodArn);
    }
    throw Error("Unauthorized");
}

// Help function to generate an IAM policy
var generatePolicy = function(principalId, effect, resource) {
    var authResponse = {};
    
    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = '2012-10-17'; 
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; 
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    
    // Optional output with custom properties of the String, Number or Boolean type.
    authResponse.context = {
        "stringKey": "stringval",
        "numberKey": 123,
        "booleanKey": true
    };
    return authResponse;
}