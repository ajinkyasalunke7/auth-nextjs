import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        //console.log(reqBody);
        if (!username || !email || !password) {
            // console.log("Invalid username or email or password");
        }

        //Check user
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        //console.log(newUser);
        const savedUser = await newUser.save();
        //console.log(savedUser);

        //send email to verify
        await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({
            message: "User Created Successfully",
            success: true,
            savedUser,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
