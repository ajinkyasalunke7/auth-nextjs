import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { Router } from "next/router";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json(
                {
                    error: "Invalid token",
                    status: 500,
                },
                { status: 400 }
            );
        }

        user.isVerified = true;
        //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        user.verfiyToken = undefined;
        user.verifyTokenExpiry = undefined;
        const isVerifiedRes = await user.save();

        return NextResponse.json({
            message: "Email verifed successfully",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}
