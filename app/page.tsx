"use client";

import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526]">
      {/* Effet crypto décoratif */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" className="absolute left-0 top-0 opacity-30 blur-xl" style={{zIndex:0}}>
          <circle cx="80%" cy="20%" r="180" fill="#8b5cf6" fillOpacity="0.25" />
          <circle cx="20%" cy="80%" r="140" fill="#06b6d4" fillOpacity="0.18" />
          <circle cx="50%" cy="60%" r="100" fill="#facc15" fillOpacity="0.12" />
        </svg>
        <svg width="100%" height="100%" className="absolute right-0 bottom-0 opacity-20 blur-2xl" style={{zIndex:0}}>
          <rect x="70%" y="70%" width="200" height="200" rx="40" fill="#fff" fillOpacity="0.04" />
        </svg>
      </div>
      <div className="z-10 flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-yellow-300 drop-shadow-lg mb-8 text-center">
          Liquid Finance
        </h1>
        <button
          onClick={() => router.push('/login')}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 via-cyan-500 to-yellow-400 hover:from-purple-700 hover:to-yellow-500 text-white rounded-xl text-xl font-semibold shadow-2xl transition-colors border-2 border-white/10 backdrop-blur-lg"
        >
          Se connecter
        </button>
      </div>
    </div>
  );
}