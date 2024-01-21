import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        console.log("11111111111111111111", user.username);
        return NextResponse.json({
            message: "User found",
            data: user,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message,
            },
            { status: 400 }
        );
    }
}
