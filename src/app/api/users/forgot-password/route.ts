import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import toast from "react-hot-toast";

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
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const filter = { email: email };
        const update = { password: hashedPassword };
        // Use findOneAndUpdate to find and update the user
        User.findOneAndUpdate(filter, update, { new: true })
            .then((updatedUser) => {
                if (updatedUser) {
                    console.log("User updated successfully:", updatedUser);
                } else {
                    console.log("User not found.");
                }
            })
            .catch((error) => {
                console.error("Error updating user:", error);
            });

        const response = NextResponse.json({
            message: "Password Changed Sucessfully",
            username: user.username,
            success: true,
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
