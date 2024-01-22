import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import toast from "react-hot-toast";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        const user = await User.findOne({ email });
        //console.log(user);
        if (!user) {
            toast.error("User not found");
            return NextResponse.json(
                { error: "User does not exist" },
                { status: 400 }
            );
        }

        //Check password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        console.log("Password ", validPassword);
        if (!validPassword) {
            toast.error("Invalid password");
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 400 }
            );
        }

        // Create Token data

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        });
        //console.log("Token :", token);
        const response = NextResponse.json({
            message: "Login Successfull",
            username: user.username,
            success: true,
        });
        response.cookies.set("token", token, {
            httpOnly: true,
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
