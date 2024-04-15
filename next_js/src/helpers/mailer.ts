import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId} : any) => {

    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === "VERIFY"){
          await User.findByIdAndUpdate(userId,
            {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000}
          )
        } else if(emailType === "RESET"){
          await User.findByIdAndUpdate(userId,
            {forgetPasswordToken: hashedToken, forgetPasswordTokenExpiry: Date.now() + 3600000}
          )
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 465,
            secure: true,
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

          const mailOptions = {
            from: 'ncdey1966@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // Subject line
            html: "<b>Click here</b>", // html body
          }

          const mailResponse = await transporter.sendMail(mailOptions)
          return mailResponse
        
    } catch (error:any) {

        throw new Error(error.message)
        
    }

}