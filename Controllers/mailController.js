const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: `"Brokod PCRM" ${process.env.EMAIL_USER}`,
        to,
        subject,
        html: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

exports.mailContent = (content) => {
    console.log("check")
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome Email</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    background: linear-gradient(90deg, #eddd229f, #ff000016 52%, #eddd229f);
                }
      
                .body {
                    background: linear-gradient(90deg, #eddd229f, #ff000016 52%, #eddd229f);
                    padding: 10px;
                }
      
                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
      
                .email-header {
                    text-align: center;
                    margin-bottom: 20px;
                }
      
                .email-header h1 {
                    color: #007bff;
                }
      
                .email-content {
                    margin: 20px 0;
                }
      
                .cta-button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: white !important;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 10px;
                }
      
                .cta-button:hover {
                    background-color: #0056b3;
                    color: white;
                }
      
                .footer {
                    margin-top: 20px;
                    text-align: center;
                    font-size: 0.9em;
                    color: #777;
                }
            </style>
        </head>
      
        <body>
            <div class="body">
                <div class="email-container">
                    ${content}
                </div>
            </div>
        </body>
      
        </html>
        `}