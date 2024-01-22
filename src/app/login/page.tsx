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
        <>
            <div className="flex justify-center items-center h-screen bg-black text-black">
                <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                    <h1 className="text-3xl block text-center font-semibold">
                        <i className="fa-solid fa-user" />
                        {!loading ? "Login" : "Processing"}
                    </h1>
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label
                            htmlFor="username"
                            className="block text-base mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                            placeholder="Enter Email..."
                            value={user.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="mt-3">
                        <label
                            htmlFor="password"
                            className="block text-base mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                            placeholder="Enter Password..."
                            value={user.password}
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                            onKeyDown={handleEnter}
                        />
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                        {/* <div>
                            <input type="checkbox" />
                            <label>Remember Me</label>
                        </div> */}
                        <div className="mt-3 text-sm flex">
                            <Link
                                href="/forgot-password"
                                className="text-indigo-800 font-semibold pr-3"
                            >
                                Forgot Password?
                            </Link>
                            <span>/</span>
                            <Link
                                href="/signup"
                                className="text-indigo-800 font-semibold pl-3"
                            >
                                Signup
                            </Link>
                        </div>
                    </div>
                    <div className="mt-5">
                        <button
                            type="submit"
                            className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                            onClick={onLogin}
                        >
                            <i className="fa-solid fa-right-to-bracket" />
                            &nbsp;&nbsp; {buttonDisabled ? "No Login" : "Login"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

// Main
