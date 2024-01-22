"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
    const handleEnter = (event: any) => {
        if (event.key === "Enter") {
            // Call your function here
            onLogin();
        }
    };
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [buttonDisabled, setbuttonDisabled] = useState(true);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const onLogin = async () => {
        setbuttonDisabled(true);
        try {
            setLoading(true);
            const res = await axios.post("/api/users/login", user);
            ///console.log("username", res.data);
            console.log(res.data.username);
            toast.success("User logged in successfully");
            if (res.status === 200) {
                // router.push(`/profile/${res.data.username}`);
                router.push("/profile");
            }
        } catch (error: any) {
            toast.error(error.message);
            console.log("Login Failed " + error.message);
        } finally {
        }
        setbuttonDisabled(false);
    };
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setbuttonDisabled(false);
        } else {
            setbuttonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{!loading ? "Login" : "Processing"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input
                className="p-2 text-black border-gray-300 rounded-lg mb-2 focus:outline focus:border-gray-300"
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />
            <label htmlFor="password">password</label>
            <input
                className="p-2 text-black border-gray-300 rounded-lg mb-2 focus:outline focus:border-gray-300"
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
                onKeyDown={handleEnter}
            />
            <button
                className="p-2 border border-red-300  rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                onClick={onLogin}
            >
                {buttonDisabled ? "No Login" : "Login"}
            </button>
            <Link href="/signup">Visit Signup Page</Link>
        </div>
    );
}

// Main
