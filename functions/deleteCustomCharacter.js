const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { id } = event.pathParameters;
    try {
        const params = {
            TableName: 'RickAndMortyCharacters',
            Key: { id },
        };
        await dynamo.delete(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Character deleted successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};