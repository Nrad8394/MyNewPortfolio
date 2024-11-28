import { sendMail } from "../../lib/sendMail";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Call the sendMail function
    const result = await sendMail({ name, email, message });

    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(500).json({ message: result.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
