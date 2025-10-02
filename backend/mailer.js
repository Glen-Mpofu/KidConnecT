import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.MAILGUN_HOST,
    port: process.env.MAILGUN_PORT,
    auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_PASS,
    }
});

export async function sendEmail(to, subject, text, html) {
    try{
        let info = await transporter.sendMail({
            from: ` "KidConnecT Support" <${process.env.MAILGUN_USER}>`,
            to, 
            subject,
            text,
            html
        });

        console.log("Email Sent: ", info.messageId)
        return info;
    }catch(err){
        console.error("Error sending email:", err);
        throw err;
    }
}
