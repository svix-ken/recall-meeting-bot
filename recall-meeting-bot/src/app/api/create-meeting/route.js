const axios = require('axios');

export async function POST(req) {
  try {
    // Parse the request body (assuming it's JSON)
    const body = await req.json();

    // Forward the request to the Recall AI API
    const apiResponse = await axios.post('https://us-west-2.recall.ai/api/v1/bot', body, {
      headers: {
        Authorization: `Token ${process.env.RECALL_API_TOKEN}`,
        'Content-Type': 'application/json', // Explicitly set content type
        ...req.headers, // Forward any other headers
      },
    });

    // Return the API response to the client
    return new Response(JSON.stringify(apiResponse.data), { status: 200 });
  } catch (err) {
    // Handle errors and return the appropriate status and message
    return new Response(
      JSON.stringify({
        error: err.response?.data || err.message,
      }),
      {
        status: err.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
