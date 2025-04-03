"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/adminDashboard",
      });
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error("Erreur lors de la connexion");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full md:-ml-64">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Connexion Admin</h1>
      <form className="flex flex-col gap-4 min-w-60" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-orange-400 text-white px-4 py-2 rounded font-semibold border-2 border-orange-400 hover:text-orange-400 hover:bg-white"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
