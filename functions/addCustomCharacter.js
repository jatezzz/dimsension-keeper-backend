const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const data = JSON.parse(event.body);
    try {
        const params = {
            TableName: 'RickAndMortyCharacters',
            Item: data,
        };
        await dynamo.put(params).promise();

        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Character added successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};