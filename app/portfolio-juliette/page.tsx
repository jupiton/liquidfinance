"use client";

import React, { useState, useEffect } from 'react';
import { TrendingUp, Calculator, Euro } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PortfolioJuliette() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('my-staking');
  const [calculatorAmount, setCalculatorAmount] = useState('');
  const [selectedPool, setSelectedPool] = useState('');
  const [profits, setProfits] = useState({
    daysElapsed: 0,
    totalProfit: 0,
    dailyProfit: 0,
    endDate: '',
    startDate: ''
  });
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Données des pools disponibles
  const availablePools = [
    {
      id: 'usdt-g',
      name: 'EUR-G M',
      fullName: 'EURC-Gold Monthly',
      minAmount: 90000,
      duration: 31,
      apr: 5.000,
      network: 'ERC20',
      image: '🥇'
    },
    {
      id: 'usdt-s',
      name: 'EURC-S M',
      fullName: 'USDT-Silver Monthly',
      minAmount: 15000,
      duration: 31,
      apr: 2.000,
      network: 'ERC20',
      image: '🥈'
    },
    {
      id: 'usdt-b',
      name: 'EURC-B M',
      fullName: 'USDT-Bronze Monthly',
      minAmount: 2500,
      duration: 31,
      apr: 1.000,
      network: 'ERC20',
      image: '🥉'
    }
  ];

  // Paramètres staking Juliette
  const amountStaked = 12000;
  const monthlyRate = 2; // 2% par mois
  const totalDuration = 31;
  
  // Utiliser useMemo pour éviter la recréation de l'objet Date à chaque rendu
  const stakingStartDate = React.useMemo(() => new Date('2025-08-03'), []);

  useEffect(() => {
    // Utiliser un timeout pour s'assurer que le calcul se fait côté client
    const timer = setTimeout(() => {
      const now = new Date();
      const timeDiff = now.getTime() - stakingStartDate.getTime();
      const daysElapsed = Math.max(0, Math.floor(timeDiff / (1000 * 3600 * 24)));
      const dailyRate = monthlyRate / 100 / 30;
      const totalProfit = amountStaked * dailyRate * daysElapsed;
      const dailyProfit = amountStaked * dailyRate;
      const endDate = new Date(stakingStartDate);
      endDate.setDate(endDate.getDate() + totalDuration);
      setProfits({
        daysElapsed,
        totalProfit: Number(totalProfit.toFixed(2)),
        dailyProfit: Number(dailyProfit.toFixed(2)),
        endDate: endDate.toLocaleDateString('fr-FR'),
        startDate: stakingStartDate.toLocaleDateString('fr-FR')
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [stakingStartDate, monthlyRate, amountStaked, totalDuration]);

  // Calcul des rendements
  const calculateReturns = (amount: number, monthlyRate: number, days: number = 31) => {
    const dailyRate = monthlyRate / 100 / 30;
    const totalReturn = amount * dailyRate * days;
    const dailyReturn = amount * dailyRate;
    return {
      totalReturn: totalReturn.toFixed(3),
      dailyReturn: dailyReturn.toFixed(3),
      finalAmount: (amount + totalReturn).toFixed(3)
    };
  };

  const calculatedReturns = calculatorAmount && selectedPool 
    ? calculateReturns(
        parseFloat(calculatorAmount), 
        availablePools.find(p => p.id === selectedPool)?.apr || 0
      )
    : null;

  // Position active (calcul automatique)
  const myStaking = mounted ? {
    pool: 'EURC-S M',
    fullName: 'USDT-Silver Monthly',
    amountStaked: amountStaked,
    duration: `${profits.daysElapsed} jours`,
    dateRange: `${profits.startDate} - ${profits.endDate}`,
    totalProfit: profits.totalProfit,
    yesterdayProfit: profits.dailyProfit,
    status: 'Staking',
    image: '🥈'
  } : {
    pool: 'EURC-S M',
    fullName: 'USDT-Silver Monthly',
    amountStaked: amountStaked,
    duration: '0 jours',
    dateRange: 'Chargement...',
    totalProfit: 0,
    yesterdayProfit: 0,
    status: 'Staking',
    image: '🥈'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-purple-500/20 relative">
        <button
          onClick={() => router.push('/login')}
          className="absolute right-4 top-4 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-sm font-medium"
        >
          Déconnexion
        </button>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">Juliette Vittori</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Euro className="h-6 w-6 text-green-400" />
              <span className="text-green-400 font-semibold">Portfolio Actif</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Calculateur en haut */}
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Calculator className="h-6 w-6 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Calculateur de Rendements</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Montant à investir (EUR)
              </label>
              <input
                type="number"
                value={calculatorAmount}
                onChange={(e) => setCalculatorAmount(e.target.value)}
                placeholder="Entrez le montant"
                className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Pool sélectionné
              </label>
              <select
                value={selectedPool}
                onChange={(e) => setSelectedPool(e.target.value)}
                className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Choisir un pool</option>
                {availablePools.map(pool => (
                  <option key={pool.id} value={pool.id}>
                    {pool.name} - {pool.apr}% mensuel
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col justify-end">
              {calculatedReturns && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <div className="text-green-400 text-sm font-medium">Rendement estimé (31 jours)</div>
                  <div className="text-white text-lg font-bold">{calculatedReturns.totalReturn} EUR</div>
                  <div className="text-green-300 text-xs">Quotidien: {calculatedReturns.dailyReturn} EUR</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interface principale */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-purple-500/20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Staking Pools</h2>
            </div>
            {/* Tabs */}
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab('my-staking')}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                  activeTab === 'my-staking'
                    ? 'text-purple-400 border-purple-400'
                    : 'text-gray-400 border-transparent hover:text-purple-300'
                }`}
              >
                Mes Stakes
              </button>
              <button
                onClick={() => setActiveTab('available-pools')}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                  activeTab === 'available-pools'
                    ? 'text-purple-400 border-purple-400'
                    : 'text-gray-400 border-transparent hover:text-purple-300'
                }`}
              >
                Pools Disponibles
              </button>
            </div>
          </div>

          {/* Contenu des tabs */}
          <div className="p-6">
            {activeTab === 'my-staking' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-purple-500/20">
                      <th className="text-left py-3 text-sm font-medium text-purple-200">Pool</th>
                      <th className="text-left py-3 text-sm font-medium text-purple-200">Montant Staké</th>
                      <th className="text-left py-3 text-sm font-medium text-purple-200">Durée</th>
                      <th className="text-left py-3 text-sm font-medium text-purple-200">Profit Total</th>
                      <th className="text-left py-3 text-sm font-medium text-purple-200">Profit Hier</th>
                      <th className="text-left py-3 text-sm font-medium text-purple-200">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-purple-500/10">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{myStaking.image}</span>
                          <div>
                            <div className="text-white font-medium">{myStaking.pool}</div>
                            <div className="text-gray-400 text-sm">({myStaking.fullName})</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="text-white font-medium">{myStaking.amountStaked.toLocaleString()}</div>
                        <div className="text-gray-400 text-sm">{myStaking.pool}</div>
                      </td>
                      <td className="py-4">
                        <div className="text-white">{myStaking.duration}</div>
                        <div className="text-gray-400 text-sm">{myStaking.dateRange}</div>
                      </td>
                      <td className="py-4">
                        <div className="text-green-400 font-medium">{myStaking.totalProfit} EUR</div>
                      </td>
                      <td className="py-4">
                        <div className="text-green-400 font-medium">{myStaking.yesterdayProfit} EUR</div>
                      </td>
                      <td className="py-4">
                        <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm">
                          {myStaking.status}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'available-pools' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-purple-500/20">
                      <th className="text-left py-3 text-sm font-medium text-purple-200">Pool</th>
                      <th className="text-left py-3 text-sm font-medium text-purple-200">Montant Minimum</th>
                      <th className="text-left py-3 text-sm font-medium text-purple-200">Réseau</th>
                      <th className="text-left py-3 text-sm font-medium text-purple-200">Durée</th>
                      <th className="text-left py-3 text-sm font-medium text-purple-200">Taux Mensuel</th>
                      <th className="text-left py-3 text-sm font-medium text-purple-200">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availablePools.map((pool) => (
                      <tr key={pool.id} className="border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors">
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{pool.image}</span>
                            <div>
                              <div className="text-white font-medium">{pool.name}</div>
                              <div className="text-gray-400 text-sm">({pool.fullName})</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="text-white font-medium">{pool.minAmount.toLocaleString()}</div>
                          <div className="text-gray-400 text-sm">{pool.name}</div>
                        </td>
                        <td className="py-4 text-white">{pool.network}</td>
                        <td className="py-4 text-white">{pool.duration} jours</td>
                        <td className="py-4">
                          <div className="text-green-400 font-medium">{pool.apr}% mensuel</div>
                        </td>
                        <td className="py-4">
                          <button 
                            onClick={() => setSelectedPool(pool.id)}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
                          >
                            Staker
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Statistiques résumées */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-sm">Total Staké</div>
                <div className="text-white text-xl font-bold">{myStaking.amountStaked.toLocaleString()} EUR</div>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-green-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-sm">Profit Total</div>
                <div className="text-green-400 text-xl font-bold">{myStaking.totalProfit} EUR</div>
              </div>
              <Euro className="h-8 w-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-sm">Rendement Quotidien</div>
                <div className="text-blue-400 text-xl font-bold">{myStaking.yesterdayProfit} EUR</div>
              </div>
              <Calculator className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="mt-8 bg-black/30 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
          <div className="flex space-x-4">
            <button 
              disabled
              className="flex-1 px-6 py-3 bg-gray-600 text-gray-400 rounded-lg font-medium cursor-not-allowed flex items-center justify-center space-x-2 opacity-50"
            >
              <span>💰</span>
              <span>Deposit</span>
            </button>
            <button 
              disabled
              className="flex-1 px-6 py-3 bg-gray-600 text-gray-400 rounded-lg font-medium cursor-not-allowed flex items-center justify-center space-x-2 opacity-50"
            >
              <span>💸</span>
              <span>Withdraw</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 