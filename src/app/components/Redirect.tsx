"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./Redirect.css";

export default function Redirect({ to }: any) {
    const [countdown, setCountdown] = useState(5);
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000); // Change interval to 1000 milliseconds (1 second)

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (countdown <= 0) {
            // Redirect only when countdown reaches 0 or less
            console.log("Redirecting");
            router.push(to);
        }
    }, [countdown, router, to]);

    return (
        <div className="flex flex-col items-center justify-center">
            <h2>{countdown > 0 && <div>Redirecting in {countdown}...</div>}</h2>
        </div>
    );
}
