import {connect} from "@/database/database";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { Jwt } from "jsonwebtoken";

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


        
    } catch (error:any) {

        return NextResponse.json({error: error.message},
        {status: 500})
    }
}