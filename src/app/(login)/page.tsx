"use client";
import { useState } from "react";
import { FaUserCircle, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [focus, setFocus] = useState({ username: false, password: false });

  return (
    <div className="relative flex h-screen items-center justify-center bg-gray-100 overflow-hidden">
      <div className="absolute top-[-4rem] left-[-2rem] h-48 w-48 rounded-full bg-gradient-to-b from-blue-900 to-transparent"></div>
      <div className="absolute bottom-[-3rem] right-[-3rem] h-48 w-48 rounded-full bg-gradient-to-b from-blue-900 to-transparent rotate-180"></div>

      <div className="flex flex-col items-center relative z-10 w-full max-w-sm bg-white p-6 shadow-lg rounded-lg">
        <h1 className="mb-10 text-2xl font-medium text-blue-900">Admin Login</h1>

        <img className="w-40 mb-10" src="logo.png" alt="" />
        <div className={`mb-10 flex items-center border-b ${focus.username ? 'border-gray-900' : 'border-blue-400'}`}>
          <FaUserCircle className={`text-xl transition ${focus.username ? 'text-gray-900' : 'text-blue-900'}`} />
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full border-none bg-transparent px-3 py-2 text-lg text-blue-900 focus:outline-none" 
            onFocus={() => setFocus({ ...focus, username: true })}
            onBlur={(e) => setFocus({ ...focus, username: e.target.value !== "" })}
          />
        </div>

        <div className={`mb-6 flex items-center border-b ${focus.password ? 'border-gray-900' : 'border-blue-400'}`}>
          <FaLock className={`text-xl transition ${focus.password ? 'text-gray-900' : 'text-blue-900'}`} />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full border-none bg-transparent px-3 py-2 text-lg text-blue-900 focus:outline-none" 
            onFocus={() => setFocus({ ...focus, password: true })}
            onBlur={(e) => setFocus({ ...focus, password: e.target.value !== "" })}
          />
        </div>

        <a href="#" className="mb-4 block text-right text-sm text-gray-500 hover:text-gray-900">Forgot Password?</a>

        <button className="w-full rounded-lg bg-blue-900 px-4 py-2 text-white transition hover:shadow-lg"
        onClick={() => router.push('/dashboard')}>Login</button>
      </div>
    </div>
  );
}
