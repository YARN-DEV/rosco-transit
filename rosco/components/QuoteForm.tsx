'use client';

import { useState, FormEvent } from 'react';

interface FormData {
  originRegion: string;
  destinationRegion: string;
  originCity: string;
  destinationCity: string;
  shipmentType: string;
  weight: string;
  speed: string;
  notes: string;
}

interface EstimateResult {
  price: number;
  currency: string;
  transitTime: string;
  routeSummary: string;
}

export default function QuoteForm() {
  const [formData, setFormData] = useState<FormData>({
    originRegion: '',
    destinationRegion: '',
    originCity: '',
    destinationCity: '',
    shipmentType: '',
    weight: '',
    speed: '',
    notes: ''
  });

  const [result, setResult] = useState<EstimateResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.originRegion) newErrors.originRegion = 'Please select origin region';
    if (!formData.destinationRegion) newErrors.destinationRegion = 'Please select destination region';
    if (!formData.originCity.trim()) newErrors.originCity = 'Please enter origin city/port';
    if (!formData.destinationCity.trim()) newErrors.destinationCity = 'Please enter destination city/port';
    if (!formData.shipmentType) newErrors.shipmentType = 'Please select shipment type';
    if (!formData.weight || parseFloat(formData.weight) <= 0) newErrors.weight = 'Please enter valid weight';
    if (!formData.speed) newErrors.speed = 'Please select shipping speed';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate realistic pricing for startup freight forwarder
  const calculateEstimate = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const weight = parseFloat(formData.weight);

    // Base price per shipment type (includes operational costs + carrier fees + margin)
    let basePrice = 0;
    
    if (formData.shipmentType === 'Parcel (0-30 kg)') {
      // Small parcel via courier (DHL, FedEx rates)
      basePrice = 85; // Base: $45 cost + ~47% margin
    } else if (formData.shipmentType === 'Pallet') {
      // LCL or pallet freight
      basePrice = 425; // Base: $250 cost + ~41% margin
    } else if (formData.shipmentType === 'Container') {
      // FCL container
      basePrice = 2850; // Base: $1800 cost + ~37% margin (competitive for startups)
    }

    // Distance/corridor multiplier (based on actual shipping routes)
    let distanceMultiplier = 1.0;
    const corridorKey = [formData.originRegion, formData.destinationRegion].sort().join('-');
    
    if (formData.originRegion === formData.destinationRegion) {
      distanceMultiplier = 0.6; // Domestic/regional
    } else {
      const corridorMultipliers: Record<string, number> = {
        'Africa-Europe': 0.95,           // Shorter routes
        'Europe-North America': 1.1,     // Transatlantic
        'North America-South America': 0.85, // Americas corridor
        'Europe-South America': 1.3,     // Longer ocean route
        'Africa-North America': 1.4,     // Less common, higher cost
        'Africa-South America': 1.5,     // Emerging route, premium
      };
      distanceMultiplier = corridorMultipliers[corridorKey] || 1.2;
    }

    // Weight pricing (per kg for parcels/pallets, flat for containers)
    let weightCharge = 0;
    if (formData.shipmentType === 'Parcel (0-30 kg)') {
      // $3-5 per kg for small parcels
      if (weight <= 5) weightCharge = weight * 4.5;
      else if (weight <= 20) weightCharge = weight * 3.8;
      else weightCharge = weight * 3.2;
    } else if (formData.shipmentType === 'Pallet') {
      // $1.2-2 per kg for pallet freight
      if (weight <= 100) weightCharge = weight * 1.8;
      else if (weight <= 500) weightCharge = weight * 1.4;
      else weightCharge = weight * 1.1;
    } else {
      // Container: weight matters less, mostly volumetric
      if (weight > 10000) weightCharge = (weight - 10000) * 0.15; // Extra for overweight
    }

    // Speed/service level adjustment
    let speedMultiplier = 1.0;
    let transitTime = '';
    
    if (formData.speed === 'Express') {
      speedMultiplier = 1.75; // Air freight premium
      transitTime = '3–5 days';
    } else if (formData.speed === 'Standard') {
      speedMultiplier = 1.0; // Standard ocean/land
      transitTime = '10–15 days';
    } else if (formData.speed === 'Economy') {
      speedMultiplier = 0.82; // Slow boat, consolidation
      transitTime = '20–35 days';
    }

    // Calculate subtotal
    const subtotal = (basePrice + weightCharge) * distanceMultiplier * speedMultiplier;

    // Add fuel surcharge (typical 10-15% in freight industry)
    const fuelSurcharge = subtotal * 0.12;

    // Add insurance (0.5% of declared value, minimum $15)
    const insurance = Math.max(15, subtotal * 0.005);

    // Calculate total before tax
    const beforeTax = subtotal + fuelSurcharge + insurance;

    // Add VAT/Sales Tax (average 15% - varies by region)
    const taxRate = 0.15;
    const tax = beforeTax * taxRate;

    // Final price with all fees
    const finalPrice = beforeTax + tax;
    const roundedPrice = Math.round(finalPrice * 100) / 100;

    // Create route summary
    const routeSummary = `${formData.originCity}, ${formData.originRegion} → ${formData.destinationCity}, ${formData.destinationRegion}`;

    setResult({
      price: roundedPrice,
      currency: 'USD',
      transitTime,
      routeSummary
    });

    // Scroll to result
    setTimeout(() => {
      document.getElementById('quote-result')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={calculateEstimate} className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Origin Region */}
          <div>
            <label htmlFor="originRegion" className="block text-sm font-semibold text-slate-800 mb-2">
              Origin Region *
            </label>
            <select
              id="originRegion"
              name="originRegion"
              value={formData.originRegion}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 bg-white ${
                errors.originRegion ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="" className="text-gray-500">Select origin region</option>
              <option value="Europe" className="text-slate-900">Europe</option>
              <option value="North America" className="text-slate-900">North America</option>
              <option value="South America" className="text-slate-900">South America</option>
              <option value="Africa" className="text-slate-900">Africa</option>
            </select>
            {errors.originRegion && <p className="text-red-500 text-sm mt-1">{errors.originRegion}</p>}
          </div>

          {/* Destination Region */}
          <div>
            <label htmlFor="destinationRegion" className="block text-sm font-semibold text-slate-800 mb-2">
              Destination Region *
            </label>
            <select
              id="destinationRegion"
              name="destinationRegion"
              value={formData.destinationRegion}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 bg-white ${
                errors.destinationRegion ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="" className="text-gray-500">Select destination region</option>
              <option value="Europe" className="text-slate-900">Europe</option>
              <option value="North America" className="text-slate-900">North America</option>
              <option value="South America" className="text-slate-900">South America</option>
              <option value="Africa" className="text-slate-900">Africa</option>
            </select>
            {errors.destinationRegion && <p className="text-red-500 text-sm mt-1">{errors.destinationRegion}</p>}
          </div>

          {/* Origin City/Port */}
          <div>
            <label htmlFor="originCity" className="block text-sm font-semibold text-slate-800 mb-2">
              Origin City/Port *
            </label>
            <input
              type="text"
              id="originCity"
              name="originCity"
              value={formData.originCity}
              onChange={handleChange}
              placeholder="e.g., Hamburg, Rotterdam"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 bg-white placeholder-gray-500 ${
                errors.originCity ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.originCity && <p className="text-red-500 text-sm mt-1">{errors.originCity}</p>}
          </div>

          {/* Destination City/Port */}
          <div>
            <label htmlFor="destinationCity" className="block text-sm font-semibold text-slate-800 mb-2">
              Destination City/Port *
            </label>
            <input
              type="text"
              id="destinationCity"
              name="destinationCity"
              value={formData.destinationCity}
              onChange={handleChange}
              placeholder="e.g., Nairobi, New York"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 bg-white placeholder-gray-500 ${
                errors.destinationCity ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.destinationCity && <p className="text-red-500 text-sm mt-1">{errors.destinationCity}</p>}
          </div>

          {/* Shipment Type */}
          <div>
            <label htmlFor="shipmentType" className="block text-sm font-semibold text-slate-800 mb-2">
              Shipment Type *
            </label>
            <select
              id="shipmentType"
              name="shipmentType"
              value={formData.shipmentType}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 bg-white ${
                errors.shipmentType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="" className="text-gray-500">Select shipment type</option>
              <option value="Parcel (0-30 kg)" className="text-slate-900">Parcel (0–30 kg)</option>
              <option value="Pallet" className="text-slate-900">Pallet</option>
              <option value="Container" className="text-slate-900">Container</option>
            </select>
            {errors.shipmentType && <p className="text-red-500 text-sm mt-1">{errors.shipmentType}</p>}
          </div>

          {/* Weight */}
          <div>
            <label htmlFor="weight" className="block text-sm font-semibold text-slate-800 mb-2">
              Approx. Weight (kg) *
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="e.g., 25"
              min="0.1"
              step="0.1"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 bg-white placeholder-gray-500 ${
                errors.weight ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
          </div>

          {/* Speed */}
          <div className="md:col-span-2">
            <label htmlFor="speed" className="block text-sm font-semibold text-slate-800 mb-2">
              Shipping Speed *
            </label>
            <select
              id="speed"
              name="speed"
              value={formData.speed}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 bg-white ${
                errors.speed ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="" className="text-gray-500">Select shipping speed</option>
              <option value="Express" className="text-slate-900">Express (3–5 days)</option>
              <option value="Standard" className="text-slate-900">Standard (7–14 days)</option>
              <option value="Economy" className="text-slate-900">Economy (14–30 days)</option>
            </select>
            {errors.speed && <p className="text-red-500 text-sm mt-1">{errors.speed}</p>}
          </div>

          {/* Optional Notes */}
          <div className="md:col-span-2">
            <label htmlFor="notes" className="block text-sm font-semibold text-slate-800 mb-2">
              Optional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Special handling, deadlines, Incoterms, customs info, etc."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none text-slate-900 bg-white placeholder-gray-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Calculate Estimate
          </button>
        </div>
      </form>

      {/* Result Display */}
      {result && (
        <div id="quote-result" className="mt-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg p-6 md:p-8 border-2 border-green-200 animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Estimated Quote</h3>
          </div>

          <div className="space-y-4">
            {/* Route Summary */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm font-semibold text-gray-600 mb-1">Route</p>
              <p className="text-lg text-slate-800">{result.routeSummary}</p>
            </div>

            {/* Price */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm font-semibold text-gray-600 mb-1">Estimated Price</p>
              <p className="text-3xl font-bold text-green-600">
                {result.currency} ${result.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            {/* Transit Time */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm font-semibold text-gray-600 mb-1">Estimated Transit Time</p>
              <p className="text-lg text-slate-800">{result.transitTime}</p>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-yellow-800 mb-1">Important Note</p>
                  <p className="text-sm text-yellow-700">
                    This is an automated estimate for product design purposes, not a final freight quote. 
                    Contact our team for a detailed, binding quote with exact pricing and terms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setResult(null)}
              className="flex-1 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Calculate Another Quote
            </button>
            <button
              onClick={() => window.location.href = '/contact'}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact for Final Quote
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
