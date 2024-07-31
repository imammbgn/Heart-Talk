const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        const apiUrl = 'https://parseapi.back4app.com/classes/Question';
        const appId = process.env.APP_ID; // API key disimpan dalam variabel lingkungan
        const restApiKey = process.env.REST_API_KEY;

        const requestBody = JSON.parse(event.body);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'X-Parse-Application-Id': appId,
                    'X-Parse-REST-API-Key': restApiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
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
