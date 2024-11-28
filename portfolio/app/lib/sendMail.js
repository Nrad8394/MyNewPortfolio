import nodemailer from 'nodemailer';

// Create the sendMail function
export async function sendMail({ name, email, message }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,  // Your Gmail address
      pass: process.env.GMAIL_PASS,  // Your Gmail App password
    },
  });

  const mailOptions = {
    from: email,  // Sender's email (the one the user enters)
    to: 'benjaminkaranja8393official@gmail.com',  // Your email address
    subject: `Contact Form Submission from ${name}`,  // Subject
    text: `Message from: ${name} (${email})\n\n${message}`,  // Email content
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to send email', error };
  }
}
