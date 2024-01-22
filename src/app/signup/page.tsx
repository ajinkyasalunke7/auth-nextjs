"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const [buttonDisabled, setbuttonDisabled] = useState(true);
    const onSignup = async () => {
        setbuttonDisabled(true);
        try {
            setLoading(true);
            const res = await axios.post("/api/users/signup", user);
            console.log(res.data);
            toast.success("User signed up successfully");
            router.push("/login");
            if (res.status === 200) {
                router.push("/login");
            }
        } catch (error: any) {
            toast.error(error.message);
            console.log("Signup Failed " + error.message);
        } finally {
        }
        setbuttonDisabled(false);
    };

    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.username.length > 0 &&
            user.password.length > 0
        ) {
            setbuttonDisabled(false);
        } else {
            setbuttonDisabled(true);
        }
    }, [user]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{!loading ? "Signup" : "Processing"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
                className="p-2 text-black border-gray-300 rounded-lg mb-2 focus:outline focus:border-gray-300"
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Username"
            />
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
            />
            <button
                className="p-2 border border-red-300  rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                onClick={onSignup}
            >
                {buttonDisabled ? "No Signup" : "Sign up"}
            </button>
            <Link href="/login">Visit Login Page</Link>
        </div>
    );
}
