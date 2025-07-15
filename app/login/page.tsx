"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "noellegarnier" && password === "juju25") {
      setMessage("");
      router.push("/portfolio");
    } else if (email === "juliettevittori" && password === "bilal25") {
      setMessage("");
      router.push("/portfolio-juliette");
    } else {
      setMessage("Identifiants invalides");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <form onSubmit={handleSubmit} className="bg-black/40 p-8 rounded-xl shadow-lg flex flex-col w-full max-w-sm border border-purple-500/30">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Connexion</h2>
        <label className="text-purple-200 mb-2">Login</label>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mb-4 px-4 py-2 rounded-lg bg-black/30 border border-purple-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Votre login"
          required
        />
        <label className="text-purple-200 mb-2">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-6 px-4 py-2 rounded-lg bg-black/30 border border-purple-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Votre mot de passe"
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-lg font-semibold transition-colors mb-2"
        >
          Connexion
        </button>
        {message && <div className="text-red-400 text-center mt-2">{message}</div>}
      </form>
    </div>
  );
} 