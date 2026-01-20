"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { VaporwaveBackground } from "@/components/VaporwaveBackground";
import { ShuffleText } from "@/components/ShuffleText";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const users = JSON.parse(localStorage.getItem("pocket_users") || "[]");

      if (isLogin) {
        const user = users.find((u: any) => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem("pocket_user", JSON.stringify(user));
          router.push("/dashboard");
        } else {
          throw new Error("Invalid email or password");
        }
      } else {
        const existingUser = users.find((u: any) => u.email === email);
        if (existingUser) {
          throw new Error("User already exists");
        }

        const newUser = {
          id: crypto.randomUUID(),
          email,
          password
        };

        users.push(newUser);
        localStorage.setItem("pocket_users", JSON.stringify(users));
        localStorage.setItem("pocket_user", JSON.stringify(newUser));
        
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <VaporwaveBackground />
      
      <AnimatePresence>
        {loading && <LoadingScreen message={isLogin ? "AUTHENTICATING" : "CREATING_ACCOUNT"} />}
      </AnimatePresence>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-vapor-dark/80 border-4 border-vapor-pink p-8 relative z-10 shadow-[15px_15px_0px_0px_rgba(255,113,206,0.3)]"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black italic text-vapor-blue mb-2">
            <ShuffleText text={isLogin ? "USER_LOGIN" : "NEW_USER"} />
          </h1>
          <div className="h-1 w-20 bg-vapor-green mx-auto" />
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block text-xs text-vapor-pink uppercase mb-2 font-bold tracking-widest">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-2 border-vapor-blue p-3 text-white focus:outline-none focus:border-vapor-green transition-colors font-mono"
              placeholder="user@vapor.wave"
            />
          </div>

          <div>
            <label className="block text-xs text-vapor-pink uppercase mb-2 font-bold tracking-widest">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-2 border-vapor-blue p-3 text-white focus:outline-none focus:border-vapor-green transition-colors font-mono"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-vapor-pink text-xs font-mono bg-vapor-pink/10 p-2 border border-vapor-pink">
              ERROR: {error.toUpperCase()}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-vapor-blue text-vapor-dark font-black py-4 uppercase tracking-[0.2em] hover:bg-vapor-green hover:translate-x-1 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_#05ffa1]"
          >
            {isLogin ? "Enter System" : "Initialize Account"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-vapor-purple text-xs uppercase font-bold hover:text-vapor-pink transition-colors"
          >
            {isLogin ? ">> Create New Identity <<" : ">> Return to Login <<"}
          </button>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 right-10 text-vapor-green/30 font-mono text-[10px] hidden md:block">
        SECURE_CONNECTION_ESTABLISHED<br />
        ENCRYPTION: LOCAL_STORAGE_V1<br />
        STATUS: WAITING_FOR_INPUT
      </div>
    </main>
  );
}
