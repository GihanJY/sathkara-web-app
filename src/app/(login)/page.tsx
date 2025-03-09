"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaLock } from "react-icons/fa";
import db from '@/lib/firestore';
import { collection, query, where, getDocs } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const router = useRouter();
  const [focus, setFocus] = useState({ email: false, password: false });
  const [em, setEm] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!em || !pw) {
      toast.error("Please fill in both email and password fields.");
      return;
    }

    setLoading(true);

    try {
      const q = query(collection(db, "Hospital_Details"), where("Email", "==", em));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("Invalid email.");
        setLoading(false);
        return;
      }

      const doc = querySnapshot.docs[0];
      const hospitalData = doc.data();

      if (hospitalData.Password === pw) {
        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        toast.error("Invalid email or password.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen items-center justify-center bg-gray-100 overflow-hidden">
      <ToastContainer />
      <div className="absolute top-[-4rem] left-[-2rem] h-48 w-48 rounded-full bg-gradient-to-b from-blue-900 to-transparent"></div>
      <div className="absolute bottom-[-3rem] right-[-3rem] h-48 w-48 rounded-full bg-gradient-to-b from-blue-900 to-transparent rotate-180"></div>

      <div className="flex flex-col items-center relative z-10 w-full max-w-sm bg-white p-6 shadow-lg rounded-lg">
        <h1 className="mb-10 text-2xl font-medium text-blue-900">Admin Login</h1>

        <img className="w-40 mb-10" src="logo.png" alt="Logo" />
        <div className={`mb-10 flex items-center border-b ${focus.email ? "border-gray-900" : "border-blue-400"}`}>
          <FaUserCircle className={`text-xl transition ${focus.email ? "text-gray-900" : "text-blue-900"}`} />
          <input
            type="text"
            placeholder="Username"
            className="w-full border-none bg-transparent px-3 py-2 text-lg text-blue-900 focus:outline-none"
            onFocus={() => setFocus({ ...focus, email: true })}
            onBlur={(e) => setFocus({ ...focus, email: e.target.value !== "" })}
            onChange={(e) => setEm(e.target.value)}
          />
        </div>

        <div className={`mb-6 flex items-center border-b ${focus.password ? "border-gray-900" : "border-blue-400"}`}>
          <FaLock className={`text-xl transition ${focus.password ? "text-gray-900" : "text-blue-900"}`} />
          <input
            type="password"
            placeholder="Password"
            className="w-full border-none bg-transparent px-3 py-2 text-lg text-blue-900 focus:outline-none"
            onFocus={() => setFocus({ ...focus, password: true })}
            onBlur={(e) => setFocus({ ...focus, password: e.target.value !== "" })}
            onChange={(e) => setPw(e.target.value)}
          />
        </div>

        <a href="#" className="mb-4 block text-right text-sm text-gray-500 hover:text-gray-900">
          Forgot Password?
        </a>

        <button
          className="w-full rounded-lg bg-blue-900 px-4 py-2 text-white transition hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
