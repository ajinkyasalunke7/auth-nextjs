import User from "@/models/user.model";
import nodemailer from "nodemailer";

import bycryptjs from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }: any) => {
    try {
        //hashed token
        const hashedToken = await bycryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_TRAP_USER,
                pass: process.env.MAIL_TRAP_PASS,
            },
        });
        const msg = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;
        const mailOptions = {
            from: "ajinkya@gmail.com",
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "Verify your email"
                    : "Reset your password",
            html: `<p>Click <a href="${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToken}">here</a> to ${
                emailType === "VERIFY"
                    ? "Verify your email"
                    : "Reset your password"
            }</p>
            <p>${msg}</p>
            <p>If you did not make this request, please ignore this email.</p>`,
        };
        const mailResponse = await transport.sendMail(mailOptions);
        //console.log("Mail Response ", mailResponse);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
