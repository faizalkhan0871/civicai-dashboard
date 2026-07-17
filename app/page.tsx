"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // Already logged in
      if (getToken()) {
        router.replace("/dashboard");
        return;
      }

      try {
        const { data } = await api.get("/auth/setup-status");

        if (data.hasUsers) {
          router.replace("/login");
        } else {
          router.replace("/register");
        }
      } catch (error) {
        console.error(error);
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020617] text-white">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-cyan-400">
          Loading CivicAI...
        </h2>

        <p className="mt-3 text-slate-400">
          Checking authentication...
        </p>
      </div>
    </main>
  );
}