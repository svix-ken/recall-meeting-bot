import { EmailTemplate } from './email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req, res){
  try {
    const { data, error } = await resend.emails.send({
      from: 'Svix <svix@whatisawebhook.com>',
      to: ['ken@svix.com'],
      subject: 'Meeting Action Items',
      react: EmailTemplate({ firstName: 'Ken', actionItems: req.body.actionItems }),
    });

    if (error) {
      res.status(400).json({ error });
    }

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }

  return new Response("OK", { status: 200 });
}