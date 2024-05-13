import {connect} from "@/database/database";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {token} = reqBody
        console.log(token);
        
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry:{$gt: Date.now()}
        })

        if(!user) {
            return NextResponse.json({error: "Invalid token or your token has expired."},
            {status: 400})
        }
        console.log(user);

        user.isVerfied = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save();

        return NextResponse.json({
            message: "User successfully verified",
            success: true
        }, {status: 400})
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},
        {status: 500})
    }
}
