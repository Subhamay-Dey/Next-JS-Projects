import {connectToDatabase} from "@/Database/dbConfig"
import User from "@/models/userModel"
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"

connectToDatabase()

export async function POST(request: NextRequest) {
    try {
        const reqBody = request.json()
        const {username, email, password} = reqBody
        console.log(reqBody);

        const user = await User.findOne({email})

        if(user) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt = await bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hashSync(password, salt)

        const newUser = new User ({
            username,
            email,
            hashedPassword,
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        })

        return NextResponse.json({message: "User created successfully"}, {status: 201})

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}