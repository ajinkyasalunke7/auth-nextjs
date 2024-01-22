// import Link from "next/link";

// export default function TempCheck() {
//     return (
//         <>
//             <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
//                 {/* Component Start */}
//                 <h1 className="font-bold text-2xl">Welcome Back :)</h1>
//                 <form
//                     className="flex flex-col bg-white rounded shadow-lg p-20 mt-12"
//                     action=""
//                 >
//                     <h1 className="flex flex-col items-center justify-center mb-10 text-2xl font-bold">
//                         {!loading ? "Login" : "Processing"}
//                     </h1>
//                     <i className="fa-solid fa-right-to-bracket"></i>

//                     <label
//                         className="font-semibold text-sm"
//                         htmlFor="usernameField"
//                     >
//                         Email
//                     </label>
//                     <input
//                         className="flex items-center h-12 px-4 w-80 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
//                         type="text"
//                         placeholder="Enter email"
//                         id="email"
//                         value={user.email}
//                         onChange={(e) =>
//                             setUser({ ...user, email: e.target.value })
//                         }
//                     />
//                     <label
//                         className="font-semibold text-sm mt-3"
//                         htmlFor="passwordField"
//                     >
//                         Password
//                     </label>
//                     <input
//                         className="flex items-center h-12 px-4 w-70 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
//                         type="password"
//                         placeholder="Enter password"
//                         id="password"
//                         value={user.password}
//                         onChange={(e) =>
//                             setUser({ ...user, password: e.target.value })
//                         }
//                     />
//                     <button
//                         className="flex items-center justify-center h-12 px-6 w-70 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
//                         onClick={onLogin}
//                     >
//                         {buttonDisabled ? "Check Input Fields" : "Login"}
//                     </button>
//                     <div className="flex mt-6 justify-center text-sm">
//                         <Link
//                             className="text-blue-400 hover:text-blue-500"
//                             href="/forget-password"
//                         >
//                             Forget Password
//                         </Link>
//                         <span className="mx-2 text-gray-300">/</span>

//                         <Link
//                             className="text-blue-400 hover:text-blue-500"
//                             href="/signup"
//                         >
//                             Visit Signup Page
//                         </Link>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// }
