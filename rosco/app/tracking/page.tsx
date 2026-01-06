'use client';

import TrackingForm from '@/components/TrackingForm';
import Image from 'next/image';

export default function TrackingPage() {
  return (
    <div className="min-h-screen">
      {/* Tracking Section */}
      <section className="py-16 md:py-20 pt-28 md:pt-32 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          {/* GPS Tracking Hero */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/gpstrack.png"
                alt="GPS tracking system - Real-time shipment location monitoring"
                width={1400}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Track Your Shipment</h1>
              <p className="text-lg text-gray-700">
                Enter your tracking number below to see real-time shipment status.
              </p>
            </div>

            {/* Tracking Form */}
            <TrackingForm />

            {/* IMAGE PLACEHOLDERS 2 & 3: Tracking Process */}
            <div className="grid md:grid-cols-2 gap-6 my-8">
              {/* Delivery Truck In Motion */}
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/movingtruck.png"
                  alt="Delivery truck in motion - Shipment in transit"
                  width={900}
                  height={700}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Delivered/Customer Service */}
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/customerservice.png"
                  alt="Package delivered - Happy customer receiving shipment"
                  width={900}
                  height={700}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>


          </div>
        </div>
      </section>
    </div>
  );
}
