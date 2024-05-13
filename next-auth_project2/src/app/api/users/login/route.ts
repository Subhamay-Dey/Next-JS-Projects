import {connect} from "@/database/database";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email})
        
        if(!user) {
            return NextResponse.json({message: "User not find",}, {status: 500})
        }
        console.log("User exists");

        const validPassword = await bcryptjs.compare(password, user.password)

        if(!validPassword) {
            return NextResponse.json({message: "Password Incorrect"},
            {status: 400}
            )
        }

        const tokendata = {
            id: user._id,
            email: user.email,
            username: user.username
        }

        const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET!, { expiresIn: '1d' })
        
        const response = NextResponse.json(
            {message: "User Successfuly logged In",
            success: true},
            {status: 400}
        )

        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;

    } catch (error:any) {

        return NextResponse.json({error: error.message},
        {status: 500})
    }
}