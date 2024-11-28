import nodemailer from 'nodemailer';

// Function to send an email
export async function sendEmail({ name, email, message }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email, // Sender's email (can also hardcode this if needed)
    to: 'benjaminkaranja8393official@gmail.com', // Your email
    subject: `Contact Form Submission from ${name}`,
    text: `Message from: ${name} (${email})\n\n${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email' };
  }
}
