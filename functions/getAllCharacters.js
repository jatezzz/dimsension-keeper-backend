const axios = require('axios');

exports.handler = async (event) => {
    try {
        // Extract query parameters from the event
        const queryParams = event.queryStringParameters || {};

        // Build the query string for the API request
        const apiQueryString = Object.entries(queryParams)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        // Make the API request with the query filters
        const response = await axios.get(`https://rickandmortyapi.com/api/character?${apiQueryString}`);

        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        console.error("Error fetching characters:", error.message);
        return {
            statusCode: error.response?.status || 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};