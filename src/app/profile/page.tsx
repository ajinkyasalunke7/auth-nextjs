"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import axios from "axios";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();
    const logut = async () => {
        try {
            const res = await axios.get("/api/users/logout");
            toast.success("Logut Successfull");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <hr />
            <button
                className="p-2 mt-10 border border-red-300  rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                onClick={logut}
            >
                Logut
            </button>
        </div>
    );
}
