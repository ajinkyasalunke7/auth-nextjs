import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import toast from "react-hot-toast";
import jwt from "jsonwebtoken";
connect();

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({
            message: "Logut Successfull",
            success: true,
        });
        response.cookies.set("token", "", {
            httpOnly: true,
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
