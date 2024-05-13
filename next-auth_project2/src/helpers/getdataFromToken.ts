import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function getdataFromToken(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!)

        return decodedToken.id

    } catch (error:any) {
        // return NextResponse.json({error: error.message}, {status: 500})
        throw new error(error.message, {status: 500})
    }
}