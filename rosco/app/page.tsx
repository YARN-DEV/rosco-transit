'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-20 pt-32 md:pt-36 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left side - Main content */}
            <div className="order-2 lg:order-1">
              {/* Main headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                Ship goods between Europe, North America, South America & Africa without stress.
              </h1>
              
              {/* Supporting paragraph */}
              <p className="text-lg md:text-xl text-gray-300 mb-4 leading-relaxed">
                Compare routes, get instant estimates, and track your cargo in real-time—all from one powerful portal.
              </p>
              <p className="text-base md:text-lg text-gray-400 mb-6 md:mb-8">
                Built for individuals, SMEs, and exporters who need reliable international shipping solutions across continents.
              </p>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quote"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 text-center"
                >
                  Get a Shipping Quote
                </Link>
                <Link
                  href="/tracking"
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-200 text-center"
                >
                  Track Shipment
                </Link>
              </div>
            </div>

            {/* Right side - Hero Image & Trade lanes */}
            <div className="order-1 lg:order-2 space-y-6">
              {/* Hero Image */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl mt-6">
                <Image
                  src="/images/1ST PIC ROSCO.png"
                  alt="Cargo ship at sea - International freight shipping"
                  width={1200}
                  height={900}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-xl p-6 md:p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-green-400">Popular Trade Lanes</h3>
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <div className="space-y-4">
                  {/* Example route 1 */}
                  <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 hover:border-green-500 transition-all duration-200 hover:shadow-lg">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-base md:text-lg font-semibold">Hamburg → Nairobi</span>
                      </div>
                      <span className="bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full whitespace-nowrap">Sea Freight</span>
                    </div>
                    <p className="text-gray-400 text-sm pl-4">Reliable ocean freight services</p>
                  </div>

                  {/* Example route 2 */}
                  <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 hover:border-green-500 transition-all duration-200 hover:shadow-lg">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-base md:text-lg font-semibold">Rotterdam → New York</span>
                      </div>
                      <span className="bg-purple-600 text-white text-xs px-2.5 py-1 rounded-full whitespace-nowrap">Sea & Air</span>
                    </div>
                    <p className="text-gray-400 text-sm pl-4">Flexible multi-modal shipping</p>
                  </div>

                  {/* Example route 3 */}
                  <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 hover:border-green-500 transition-all duration-200 hover:shadow-lg">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-base md:text-lg font-semibold">São Paulo → Madrid</span>
                      </div>
                      <span className="bg-orange-600 text-white text-xs px-2.5 py-1 rounded-full whitespace-nowrap">Express Parcel</span>
                    </div>
                    <p className="text-gray-400 text-sm pl-4">Fast international delivery</p>
                  </div>
                </div>

                {/* View all routes link */}
                <Link
                  href="/routes"
                  className="mt-6 block text-center bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-lg py-3 px-4 transition-colors duration-200"
                >
                  <span className="text-green-400 font-semibold">View All Routes →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Warehouse Operations Image */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/Modern warehouse PIC.png"
                alt="Modern warehouse logistics operations"
                width={1600}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">How It Works</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              A simple 4-step flow to move your cargo across continents.
            </p>
          </div>

          {/* Four Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Request Quote</h3>
              <p className="text-gray-600 mb-4">
                Tell us where and what you are shipping.
              </p>
              <Link href="/quote" className="text-blue-600 hover:underline font-semibold text-sm">
                Get Quote →
              </Link>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Confirm Booking</h3>
              <p className="text-gray-600">
                We match you with a carrier and confirm final rate & schedule.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Handover Cargo</h3>
              <p className="text-gray-600">
                Drop off or arrange pickup at your nearest depot.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                4
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Track & Receive</h3>
              <p className="text-gray-600 mb-4">
                Follow your shipment online till it's delivered.
              </p>
              <Link href="/tracking" className="text-purple-600 hover:underline font-semibold text-sm">
                Track Now →
              </Link>
            </div>
          </div>

          {/* Visual connector line */}
          <div className="hidden lg:flex justify-center mt-12 px-12">
            <div className="flex items-center max-w-5xl w-full">
              <div className="flex-1 h-1 bg-gradient-to-r from-blue-600 to-green-600"></div>
              <div className="flex-1 h-1 bg-gradient-to-r from-green-600 to-orange-600"></div>
              <div className="flex-1 h-1 bg-gradient-to-r from-orange-600 to-purple-600"></div>
            </div>
          </div>

          {/* Global Network Map */}
          <div className="max-w-3xl mx-auto mb-12 mt-16">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/WORLD MAP IMAGE.png"
                alt="Global shipping network - Trade routes between continents"
                width={1400}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Ship Your Cargo?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get started today with instant quotes and real-time tracking across all our trade routes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Get Instant Quote
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
