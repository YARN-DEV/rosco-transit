'use client';

import QuoteForm from '@/components/QuoteForm';
import Image from 'next/image';

export default function QuotePage() {
  return (
    <div className="min-h-screen">
      {/* Quote Form Section */}
      <section className="py-16 md:py-20 pt-32 md:pt-36 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          {/* Quote Calculator Hero */}
          <div className="max-w-4xl mx-auto mb-12 mt-8">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/calculatorquote.png"
                alt="Shipping quote calculator - Get instant pricing estimates"
                width={1400}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
              Request a Shipping Estimate
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-2">
              We support routes between Europe ↔ Americas ↔ Africa.
            </p>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Estimates are for guidance only. Contact us for a detailed, binding quote with exact pricing and terms.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Parcel Box Image */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/parcel.png"
                alt="Parcel box package - Small shipment shipping"
                width={800}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Wooden Pallet Image */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/woodenpallet.png"
                alt="Wooden pallet - Pallet freight shipping"
                width={800}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Spacer for visual balance */}
            <div className="hidden lg:block"></div>
          </div>

          <QuoteForm />
        </div>
      </section>
    </div>
  );
}
