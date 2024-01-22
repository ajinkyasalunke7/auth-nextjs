"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Redirect from "../components/Redirect";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const logout = async () => {
        try {
            const res = await axios.get("/api/users/logout");
            toast.success("Logout Successfull");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };
    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/currentUser");
        console.log(res.data);
        setData(res.data.data.username);
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="p-3 mt-5 rounded bg-green-600">
                {data === "nothing" ? (
                    "Nothing"
                ) : (
                    <Link href={`/profile/${data}`}>{data}</Link>
                )}
            </h2>
            <hr />
            <button
                className="p-2 mt-10 border border-red-300  rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                onClick={logout}
            >
                Logout
            </button>
            <button
                className="p-2 mt-10 border border-white  rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                onClick={() => {
                    alert("button Invoked");
                }}
            >
                Get Data
            </button>
        </div>
    );
}
