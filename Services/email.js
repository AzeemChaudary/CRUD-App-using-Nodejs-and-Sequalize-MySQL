const nodemailer = require('nodemailer');


const sendResetPasswordEmail = async (email, resetLink) => {
  try {
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Gmail's SMTP server
        port: 587, // Port number for unencrypted (TLS) email communication
        secure: false, // Set to true for SSL/TLS encrypted communication (port 465)
        auth: {
          user: "sender's mail", // Your Gmail email address
          pass: 'mail password', // Your Gmail email password or an application-specific password
        },
      });
      

    
    const mailOptions = {
     // from: 'your_email@example.com',  // It is optional to provide from here App will use auth.user as sender's email if not provided
      to: email,
      subject: 'Password Reset',
      text: `Click on the link to reset your password: ${resetLink}`,
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    };

   
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent');
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

module.exports = { sendResetPasswordEmail };
