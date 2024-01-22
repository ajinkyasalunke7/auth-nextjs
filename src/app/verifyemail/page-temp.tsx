"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log("Verify Email Page :", error.response.data);
        }
    };

    // useEffect to extract token from URL
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    // useEffect to verify email when token changes
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token, verifyUserEmail]);

    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen py-3">
                <h1 className="text-4xl">Verify Email</h1>
                <h3 className="p-2 bg-orange-500 text-black">
                    {token ? `${token}` : "No token"}
                </h3>
                {verified && (
                    <div>
                        <h2 className="text-2xl">Email Verified</h2>
                        <Link href="/login">Login</Link>
                    </div>
                )}

                {error && (
                    <div>
                        <h2 className="text-2xl bg-red-500">Error</h2>
                        <Link href="/login">Login</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
