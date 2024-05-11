import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

export const sendEmail = async({email, emailType, userId}: any) => {
    try {

      // create a hased token
      const hashedToken = await bcryptjs.hash(userId.toString(), 10)

      if (emailType === "VERIFY") {
          await User.findByIdAndUpdate(userId, 
              {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
      } else if (emailType === "RESET"){
          await User.findByIdAndUpdate(userId, 
              {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
      }

      
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 465,
            secure: false, 
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

          const mailOptions = {
            from: 'ncdey1966@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
          }

          const mailResponse = await transporter.sendMail(mailOptions)
          return mailResponse;

    } catch (error:any) {
        throw new Error(error.message)
    }
}