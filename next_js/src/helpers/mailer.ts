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

        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "564a2c38258e23", 
            pass: "9bbccd984dba2f"
          }
        });

          const mailOptions = {
            from: 'ncdey1966@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // Subject line
            html: `<p>Click <a href="$">here</a> to ${emailType === 'VERIFY' ? "Verify your email" : "Reset your password"} </p>`, // html body
          }

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse
        
    } catch (error:any) {

        throw new Error(error.message)
        
    }

}