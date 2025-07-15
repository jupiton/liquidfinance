"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const USERS = [
  { username: "Noelle Garnier", password: "ngier25" },
  { username: "Juillette Vittori", password: "jvit06" },
];

export default function LoginPage() {
  const [selectedUser, setSelectedUser] = useState(USERS[0].username);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = USERS.find(
      (u) => u.username === selectedUser && u.password === password
    );
    if (user) {
      if (typeof window !== "undefined") {
        localStorage.setItem("loggedUser", selectedUser);
      }
      router.push("/");
    } else {
      setError("Identifiants invalides");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-purple-500/30 w-full max-w-sm shadow-lg"
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Connexion</h1>
        <label className="block text-purple-200 mb-2">Utilisateur</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-black/30 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {USERS.map((u) => (
            <option key={u.username} value={u.username}>
              {u.username}
            </option>
          ))}
        </select>
        <label className="block text-purple-200 mb-2">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-black/30 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {error && <div className="text-red-400 mb-4 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
} 