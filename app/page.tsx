"use client";

import React, { useState, useEffect } from 'react';
import { TrendingUp, Calculator, Euro } from 'lucide-react';

const StakingCalculator = () => {
  const [activeTab, setActiveTab] = useState('my-staking');
  const [calculatorAmount, setCalculatorAmount] = useState('');
  const [selectedPool, setSelectedPool] = useState('');
  const [isClient, setIsClient] = useState(false);

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

  // Date de début du staking (3 juillet 2025)
  const stakingStartDate = new Date('2025-07-03');
  const initialAmount = 46650;
  const monthlyRate = 2; // 2% mensuel pour EURC-S M
  const dailyRate = monthlyRate / 100 / 30; // Taux quotidien

  // Calcul automatique des profits basé sur le temps écoulé
  const calculateAutomaticProfits = () => {
    if (!isClient) {
      return {
        totalProfit: '0.000',
        dailyProfit: '31.100',
        daysElapsed: 0,
        remainingDays: 31,
        endDate: '03/08/25',
        startDate: '03/07/25'
      };
    }
    
    const now = new Date();
    const timeDiff = now.getTime() - stakingStartDate.getTime();
    const daysElapsed = Math.max(0, timeDiff / (1000 * 3600 * 24)); // Nombre de jours écoulés
    
    // Calcul du profit total (somme des rendements quotidiens)
    const totalProfit = initialAmount * dailyRate * daysElapsed;
    
    // Calcul du profit quotidien actuel
    const dailyProfit = initialAmount * dailyRate;
    
    // Calcul de la durée restante
    const totalDuration = 31; // 31 jours
    const remainingDays = Math.max(0, totalDuration - (daysElapsed % 31));
    
    // Date de fin calculée
    const endDate = new Date(stakingStartDate);
    endDate.setDate(endDate.getDate() + totalDuration);
    
    return {
      totalProfit: totalProfit.toFixed(3),
      dailyProfit: dailyProfit.toFixed(3),
      daysElapsed: Math.floor(daysElapsed),
      remainingDays: Math.floor(remainingDays),
      endDate: endDate.toLocaleDateString('fr-FR'),
      startDate: stakingStartDate.toLocaleDateString('fr-FR')
    };
  };

  // Mise à jour automatique toutes les secondes
  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      // Timer pour forcer le re-render et mettre à jour les calculs
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Position active avec calculs automatiques
  const profits = calculateAutomaticProfits();
  const myStaking = {
    pool: 'EURC-S M',
    fullName: 'USDT-Silver Monthly',
    amountStaked: initialAmount,
    duration: `${profits.daysElapsed} jours`,
    dateRange: `${profits.startDate} - ${profits.endDate}`,
    totalProfit: parseFloat(profits.totalProfit),
    yesterdayProfit: parseFloat(profits.dailyProfit),
    status: 'Staking',
    image: '🥈'
  };

  // Calcul des rendements
  const calculateReturns = (amount: number, monthlyRate: number, days: number = 31) => {
    const dailyRate = monthlyRate / 100 / 30; // Taux mensuel divisé par 30 jours
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">Noelle Garnier</h1>
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
          {/* Header avec recherche */}
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
      </div>
    </div>
  );
};

export default StakingCalculator;