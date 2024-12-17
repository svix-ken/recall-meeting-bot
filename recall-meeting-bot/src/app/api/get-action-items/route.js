const OpenAI = require("openai");
import axios from 'axios';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const actionItems = ""
const data = ""

export async function POST(req) {
    const meetingTranscript = req.body.transcript
    try {
        const items = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            response_format: { type: "json_object" },
            messages: [
                {role: "system",
                content: `You will be provided with a meeting transcript. For each participant in the meeting, you must extract at least one action item. Action items are short, concise statements that describe a task that needs to be completed. Format the output as a JSON array where each object represents a participant and their action items. Transcript: ${meetingTranscript} Output format: {meeting_data: [{"user": "participant name", "action_items": ["action item 1", "action item 2", ...]}, {"user": "participant name", "action_items": ["action item 1", "action item 2", ...]}, ...]}`,
                },
            ],
        })
        actionItems = items
        ;
    } catch (error) {
        console.error(error)
    }

    try {
        const response = await axios.post(`${process.env.BASE_URL}/api/send-email`, {actionItems: actionItems})
        data = JSON.parse(response.choices[0].message.content).meeting_data;
    } catch (error) {
        console.error(error)
    }
        
    
    return new Response("OK", { status: 200 });
};