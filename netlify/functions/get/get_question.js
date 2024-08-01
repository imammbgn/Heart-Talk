const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    if (event.httpMethod === 'GET') {
        const apiUrl = 'https://parseapi.back4app.com/classes/questions';
        const appId = process.env.APP_ID; // API key disimpan dalam variabel lingkungan
        const restApiKey = process.env.REST_API_KEY;

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'X-Parse-Application-Id': appId,
                    'X-Parse-REST-API-Key': restApiKey,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return {
                statusCode: 200,
                body: JSON.stringify(data)
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error.message })
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }
};
