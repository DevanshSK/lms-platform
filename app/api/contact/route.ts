import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {name, email, message} = await req.json();
    const data = await resend.emails.send({
      from: `addtrends69@gmail.com`,
      to: 'addtrends69@gmail.com',
      subject: 'Message from Add Learn',
      react: EmailTemplate({ name: name, email: email, message: message }) as React.ReactElement,
    });

    console.log(data)
    return Response.json(data);
  } catch (error) {
    console.log(error)
    return Response.json({ error });
  }
}
