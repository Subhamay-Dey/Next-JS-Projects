import {connect} from "@/database/database";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getdataFromToken } from "@/helpers/getdataFromToken";

connect();

export async function POST(request:NextRequest) {

    const userid = await getdataFromToken(request)
    const user = await User.findOne({_id: userid}).select("-password")

    return NextResponse.json({
        message: "User found",
        data: user
    })
}