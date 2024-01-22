"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Redirect from "../components/Redirect";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            console.log("verifyemail");
            setVerified(true);
            setInterval(() => {
                router.push("/profile");
            }, 2000);
        } catch (err: any) {
            setError(true);
            console.log(err.response.data);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
        console.log(token, "From UseEffect");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    console.log(error);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            {/* <h2 className="p-2 bg-orange-500 text-black">
                {token ? `${token}` : "No token"}
            </h2> */}

            {verified && (
                <div className="m-3">
                    <h2 className="text-2xl m-5 p-3 bg-slate-500 rounded-lg text-white">
                        Email Verified ✅
                    </h2>
                    {/* <Redirect to="/login" /> */}
                    <Link
                        className="text-lg  rounded-lg text-white"
                        href="/login"
                    >
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl m-5 p-3 bg-slate-500 rounded-lg text-white">
                        Error ❌
                    </h2>
                    <h3 className="text-lg  rounded-lg text-white">
                        <Link href="/login">Go Back to /Login</Link>
                    </h3>
                </div>
            )}
        </div>
    );
}
