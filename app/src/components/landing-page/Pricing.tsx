'use client';
import React, { useState } from 'react';

import { CheckCircleIcon } from '@heroicons/react/20/solid';

const plansData = [
  {
    name: 'Iniciante',
    price: {
      monthly: 10,
      annually: 10 * 11
    },
    discretion: 'O primeiro passo rumo ao sucesso.',
    features: ['15 Pesquisas por mês', 'Criação de conta']
  },
  {
    name: 'Profissional',
    price: {
      monthly: 29,
      annually: 29 * 10
    },
    discretion: 'A experiência avançada para profissionais.',
    features: ['50 Pesquisas por mês', 'Criação de conta', 'Selo Premium']
  },
  {
    name: 'Business',
    price: {
      monthly: 49,
      annually: 49 * 10
    },
    discretion: 'A solução perfeita para o seu negócio.',
    features: [
      'Pesquisas ilimitadas',
      'Criação de conta',
      'Selo Business',
      'Atendimento 24h'
    ]
  }
];

export default function Pricing() {
  const [billPlan, setBillPlan] = useState('monthly');

  const handleBillPlanChange = () => {
    setBillPlan(billPlan === 'monthly' ? 'annually' : 'monthly');
  };

  return (
    <div className="w-full flex flex-col p-5 mb-40">
      <div className="max-w-2xl lg:text-center self-center">
        <h2 className="font-semibold font-inter text-primary">Planos</h2>
        <p className="mt-2 text-3xl font-bold font-poppins sm:text-4xl">
          Encontre a assinatura perfeita para você
        </p>
        <p className="mt-6 text-lg font-inter">
          Explore nossa variedade de planos de assinatura cuidadosamente
          projetados para atender às suas necessidades. Desde opções básicas até
          ofertas premium.
        </p>
        <div className="flex justify-center space-x-4 mt-10 font-inter font-medium">
          <span className="select-none">Mensal</span>
          <input
            type="checkbox"
            className="toggle toggle-secondary"
            checked={billPlan === 'annually'}
            onChange={handleBillPlanChange}
          />
          <span className="select-none">Anual</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-16 space-y-8 lg:flex-row lg:items-stretch lg:space-x-8 lg:space-y-0">
        {plansData.map((plan, i) => (
          <div
            key={i}
            className="flex flex-col w-full max-w-sm p-8 space-y-6 bg-base-200 rounded-xl shadow-md"
          >
            <div className="flex-shrink-0">
              <span
                className={`text-4xl font-semibold ${
                  plan.name === 'Profissional' ? 'text-primary' : ''
                }`}
              >
                R$
                {billPlan === 'monthly'
                  ? plan.price.monthly
                  : plan.price.annually}
              </span>
              <span>{billPlan === 'monthly' ? '/mês' : '/ano'}</span>
            </div>
            <div className="flex-shrink-0 mb-4 space-y-2">
              <h2 className="text-2xl font-semibold font-poppins">
                {plan.name}
              </h2>
              <p className="text-sm font-inter">{plan.discretion}</p>
            </div>
            <div className="divider"></div>
            <ul className="flex-1 space-y-4">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-secondary" />
                  <span className="ml-3 font-inter">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex-shrink-0 pt-4">
              <button
                className={`btn btn-md w-full rounded-full font-inter ${
                  plan.name === 'Profissional' ? 'btn-primary' : 'btn-ghost'
                }`}
              >
                Assinar {plan.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
