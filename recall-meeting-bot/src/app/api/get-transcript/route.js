import axios from 'axios';

export async function POST(req) {
    
    const url = `https://us-west-2.recall.ai/api/v1/bot/${req.body.bot_id}/transcript/`;
    
    const body = req.body

    const transcript = ""

    try {
        const response = await axios.get(url, {
            headers: {
              Authorization: `Token ${process.env.RECALL_API_TOKEN}`,
              'Content-Type': 'application/json', // Explicitly set content type
              ...req.headers, // Forward any other headers
            },
          });

        transcript = response.data
    } catch (error) {
        console.error(error)
    }

    try {
        const response = await axios.post(`${process.env.BASE_URL}/api/get-action-items`, {transcript: transcript})
    } catch (error) {
        console.error(error)
    }

    return new Response("OK", { status: 200 });
}
