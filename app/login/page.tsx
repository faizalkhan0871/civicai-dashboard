"use client";
import { setToken, setUser } from "@/lib/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    router.replace("/dashboard");
  } else {
    setCheckingAuth(false);
  }
}, [router]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
  setLoading(true);

  const res = await api.post("/auth/login", {
    email,
    password,
  });

  console.log(res.data);

  setToken(res.data.token);
setUser(res.data.user);
  localStorage.removeItem("civicai-copilot-messages");

  toast.success("Welcome back!");

  router.replace("/dashboard");
} catch (err: any) {
  console.log(err);
  console.log(err.response);
  console.log(err.response?.data);

  toast.error(
  err?.response?.data?.message || "Login failed"
);
} finally {
  setLoading(false);
}
  };
  if (checkingAuth) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <p className="text-slate-300 text-lg">Loading...</p>
    </div>
  );
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-xl"
      >
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          CivicAI Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-cyan-500 p-3 font-semibold text-black hover:bg-cyan-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}