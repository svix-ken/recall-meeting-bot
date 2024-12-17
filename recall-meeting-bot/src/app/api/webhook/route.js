import axios from 'axios';

const crypto = require('crypto');

export async function POST(req) {
    const svix_id = req.headers.get("svix-id") ?? "";
    const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
    const svix_signature = req.headers.get("svix-signature") ?? "";

    const body = await req.text();

    const signedContent = `${svix_id}.${svix_timestamp}.${body}`;
    const secret = process.env.WEBHOOK_SECRET;

    // Decode the secret
    const secretBytes = Buffer.from(secret.split('_')[1], "base64");
    const computedSignature = crypto
        .createHmac('sha256', secretBytes)
        .update(signedContent)
        .digest('base64');

    try {
        const expectedSignatures = svix_signature.split(' ').map(sig => sig.split(',')[1]);

        const isValid = expectedSignatures.some(expectedSignature => expectedSignature === computedSignature);

        if (!isValid) {
            throw new Error("Invalid signature");
        }
    } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return new Response("Bad Request", { status: 400 });
    }

    const status = JSON.parse(body).data.status.code

    if (status === "done") {

      try {
        const response = await axios.post(`${process.env.BASE_URL}/api/get-transcript`, {bot_id: JSON.parse(body).data.bot_id})
      } catch (error) {
        console.error(error)
      }
    }

    return new Response("OK", { status: 200 });
}
