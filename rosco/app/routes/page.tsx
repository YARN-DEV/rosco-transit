'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Region = 'All' | 'Europe' | 'North America' | 'South America' | 'Africa';

interface Corridor {
  id: string;
  name: string;
  regions: string[];
  modes: string[];
  samplePorts: string[];
  transitTimes: {
    sea?: string;
    air?: string;
  };
  icon: string;
  color: string;
}

const corridors: Corridor[] = [
  {
    id: 'eu-na',
    name: 'Europe ↔ North America',
    regions: ['Europe', 'North America'],
    modes: ['Sea Freight (FCL/LCL)', 'Air Freight', 'Express Parcels'],
    samplePorts: ['Rotterdam ⇄ New York', 'Hamburg ⇄ Montreal', 'Antwerp ⇄ Boston'],
    transitTimes: { sea: '14–18 days', air: '3–5 days' },
    icon: '🌊',
    color: 'blue'
  },
  {
    id: 'eu-af',
    name: 'Europe ↔ Africa',
    regions: ['Europe', 'Africa'],
    modes: ['Sea Freight (FCL/LCL)', 'Air Freight', 'Express Parcels'],
    samplePorts: ['Hamburg ⇄ Nairobi', 'Rotterdam ⇄ Cape Town', 'Marseille ⇄ Casablanca'],
    transitTimes: { sea: '18–25 days', air: '4–6 days' },
    icon: '🚢',
    color: 'green'
  },
  {
    id: 'eu-sa',
    name: 'Europe ↔ South America',
    regions: ['Europe', 'South America'],
    modes: ['Sea Freight (FCL/LCL)', 'Air Freight', 'Express Parcels'],
    samplePorts: ['Santos ⇄ Antwerp', 'Buenos Aires ⇄ Rotterdam', 'Valparaíso ⇄ Hamburg'],
    transitTimes: { sea: '20–28 days', air: '5–7 days' },
    icon: '⚓',
    color: 'purple'
  },
  {
    id: 'na-af',
    name: 'North America ↔ Africa',
    regions: ['North America', 'Africa'],
    modes: ['Sea Freight (FCL/LCL)', 'Air Freight', 'Express Parcels'],
    samplePorts: ['New York ⇄ Nairobi', 'Miami ⇄ Johannesburg', 'Houston ⇄ Accra'],
    transitTimes: { sea: '22–30 days', air: '6–8 days' },
    icon: '✈️',
    color: 'orange'
  },
  {
    id: 'na-sa',
    name: 'North America ↔ South America',
    regions: ['North America', 'South America'],
    modes: ['Sea Freight (FCL/LCL)', 'Air Freight', 'Express Parcels', 'Land Transport'],
    samplePorts: ['Miami ⇄ Santos', 'Houston ⇄ Buenos Aires', 'Los Angeles ⇄ Valparaíso'],
    transitTimes: { sea: '12–20 days', air: '3–5 days' },
    icon: '🚛',
    color: 'red'
  },
  {
    id: 'sa-af',
    name: 'South America ↔ Africa',
    regions: ['South America', 'Africa'],
    modes: ['Sea Freight (FCL/LCL)', 'Air Freight'],
    samplePorts: ['Santos ⇄ Cape Town', 'Buenos Aires ⇄ Nairobi', 'Rio de Janeiro ⇄ Durban'],
    transitTimes: { sea: '18–25 days', air: '8–10 days' },
    icon: '🌍',
    color: 'teal'
  }
];

const colorMap: Record<string, { bg: string; border: string; text: string; badgeBg: string; badgeText: string }> = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-600', text: 'text-blue-600', badgeBg: 'bg-blue-100', badgeText: 'text-blue-700' },
  green: { bg: 'bg-green-50', border: 'border-green-600', text: 'text-green-600', badgeBg: 'bg-green-100', badgeText: 'text-green-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-600', text: 'text-purple-600', badgeBg: 'bg-purple-100', badgeText: 'text-purple-700' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-600', text: 'text-orange-600', badgeBg: 'bg-orange-100', badgeText: 'text-orange-700' },
  red: { bg: 'bg-red-50', border: 'border-red-600', text: 'text-red-600', badgeBg: 'bg-red-100', badgeText: 'text-red-700' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-600', text: 'text-teal-600', badgeBg: 'bg-teal-100', badgeText: 'text-teal-700' }
};

export default function RoutesPage() {
  const [selectedRegion, setSelectedRegion] = useState<Region>('All');

  const filteredCorridors = selectedRegion === 'All' 
    ? corridors 
    : corridors.filter(corridor => corridor.regions.includes(selectedRegion));

  return (
    <div className="min-h-screen">
      {/* Routes / Corridors Section */}
      <section className="py-16 md:py-20 pt-32 md:pt-36 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Route Map Hero */}
          <div className="max-w-5xl mx-auto mb-12 mt-8">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/world map.png"
                alt="Global trade routes map - Shipping corridors between continents"
                width={1600}
                height={700}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
              Global Trade Corridors
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-2">
              We cover routes between Europe, North America, South America, and Africa.
            </p>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              More ports and lanes can be added as demand grows. Contact us for custom route inquiries.
            </p>
          </div>

          {/* Shipping Modes Image */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/cargo ship.png"
                alt="Cargo ship container vessel - Sea freight shipping"
                width={1400}
                height={550}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Filter Dropdown */}
          <div className="max-w-md mx-auto mb-8 md:mb-12">
            <label htmlFor="region-filter" className="block text-sm font-semibold text-slate-700 mb-2">
              Filter by Region:
            </label>
            <select
              id="region-filter"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value as Region)}
              className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
            >
              <option value="All">All Regions</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Africa">Africa</option>
            </select>
            <p className="mt-2 text-sm text-gray-600">
              {filteredCorridors.length} {filteredCorridors.length === 1 ? 'corridor' : 'corridors'} found
            </p>
          </div>

          {/* Corridor Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredCorridors.map((corridor) => {
              const colors = colorMap[corridor.color];
              return (
                <div 
                  key={corridor.id}
                  className={`bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border-t-4 ${colors.border} transform hover:-translate-y-1`}
                >
                  {/* Corridor Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${colors.badgeBg} rounded-lg flex items-center justify-center text-2xl`}>
                        {corridor.icon}
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-slate-800">{corridor.name}</h2>
                    </div>
                  </div>
                  
                  {/* Modes */}
                  <div className="mb-4">
                    <p className="font-semibold text-slate-800 text-sm mb-2">Typical Modes:</p>
                    <div className="flex flex-wrap gap-2">
                      {corridor.modes.map((mode, idx) => (
                        <span 
                          key={idx} 
                          className={`${colors.badgeBg} ${colors.badgeText} text-xs px-3 py-1 rounded-full font-medium`}
                        >
                          {mode}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Sample Ports */}
                  <div className={`${colors.bg} rounded-lg p-4 border ${colors.border.replace('border-', 'border-').replace('-600', '-200')} mb-4`}>
                    <p className="font-semibold text-slate-800 mb-2 text-sm flex items-center gap-2">
                      <span className={`w-2 h-2 ${colors.border.replace('border-', 'bg-')} rounded-full`}></span>
                      Sample Port Pairs:
                    </p>
                    {corridor.samplePorts.map((port, idx) => (
                      <p key={idx} className="text-sm text-gray-700">{port}</p>
                    ))}
                  </div>

                  {/* Transit Times */}
                  <div className="space-y-2">
                    <p className="font-semibold text-slate-800 text-sm">Typical Transit Times:</p>
                    {corridor.transitTimes.sea && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                        <span className="text-sm text-gray-700">
                          <strong>Sea:</strong> {corridor.transitTimes.sea}
                        </span>
                      </div>
                    )}
                    {corridor.transitTimes.air && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <span className="text-sm text-gray-700">
                          <strong>Air:</strong> {corridor.transitTimes.air}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Port Operations Image */}
          <div className="max-w-3xl mx-auto mt-16 mb-12">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/busyport.png"
                alt="Busy container port operations - International shipping terminal"
                width={1400}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Ship on These Lanes?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get instant quotes for any of our supported corridors. Our pricing is transparent and competitive.
            </p>
            <Link
              href="/quote"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Get a Quote for These Lanes →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
