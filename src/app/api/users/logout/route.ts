import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import toast from "react-hot-toast";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
connect();

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({
            message: "Logout Successfull",
            success: true,
        });
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        // cookies().delete("token");
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
