"use client";

import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <h1 className="text-3xl font-bold text-white mb-8">Bienvenue sur Liquid Finance</h1>
      <button
        onClick={() => router.push('/login')}
        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-lg font-semibold shadow-lg transition-colors"
      >
        Se connecter
      </button>
    </div>
  );
}