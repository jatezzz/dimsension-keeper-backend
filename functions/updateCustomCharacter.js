const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { id } = event.pathParameters;
    const data = JSON.parse(event.body);

    try {
        // Dynamically build UpdateExpression based on provided fields
        let updateExpression = 'set ';
        const expressionAttributeNames = {};
        const expressionAttributeValues = {};

        // Map fields to UpdateExpression
        if (data.name) {
            updateExpression += '#name = :name, ';
            expressionAttributeNames['#name'] = 'name';
            expressionAttributeValues[':name'] = data.name;
        }
        if (data.species) {
            updateExpression += 'species = :species, ';
            expressionAttributeValues[':species'] = data.species;
        }
        if (data.status) {
            updateExpression += '#status = :status, ';
            expressionAttributeNames['#status'] = 'status';
            expressionAttributeValues[':status'] = data.status;
        }
        if (data.gender) {
            updateExpression += 'gender = :gender, ';
            expressionAttributeValues[':gender'] = data.gender;
        }
        if (data.type) {
            updateExpression += '#type = :type, '; // Use a placeholder for 'type'
            expressionAttributeNames['#type'] = 'type'; // Map '#type' to 'type'
            expressionAttributeValues[':type'] = data.type;
        }

        // Remove trailing comma and space
        updateExpression = updateExpression.slice(0, -2);

        const params = {
            TableName: 'RickAndMortyCharacters',
            Key: { id },
            UpdateExpression: updateExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
        };

        await dynamo.update(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Character updated successfully' }),
        };
    } catch (error) {
        console.error('Error updating character:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};