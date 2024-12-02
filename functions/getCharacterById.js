const axios = require('axios');
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { id } = event.pathParameters;
    try {
        // Check if the character exists in custom data
        const params = {
            TableName: 'RickAndMortyCharacters',
            Key: { id },
        };
        const customCharacter = await dynamo.get(params).promise();

        if (customCharacter.Item) {
            return {
                statusCode: 200,
                body: JSON.stringify(customCharacter.Item),
            };
        }

        // Fallback to Rick and Morty API
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: error.message }),
        };
    }
};