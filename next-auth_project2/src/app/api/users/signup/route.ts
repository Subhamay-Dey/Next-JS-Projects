import {connect} from "@/database/database";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        
        const savedUser = await newUser.save();
        console.log(savedUser);
        
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User created successfully",
            savedUser,
            sucess: true
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, 
            {status: 500}
        )
    }
}

connect();


