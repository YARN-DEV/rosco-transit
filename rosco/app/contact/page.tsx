'use client';

import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Contact / Support Section */}
      <section className="py-16 md:py-20 pt-32 md:pt-36 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Customer Service Hero Image */}
          <div className="max-w-4xl mx-auto mb-12 mt-8">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/images/customerservice.png" 
                alt="Customer Service Team" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Contact & Support</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-3">
              Need help with custom routes, special pricing, or bulk/export questions? 
              We're here to assist you.
            </p>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Our team specializes in Europe ↔ Americas ↔ Africa trade corridors and can help with customs, documentation, and shipping logistics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">Send Us a Message</h2>
              <ContactForm />
            </div>

            {/* Direct Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-slate-800">Direct Contact</h2>
                
                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Email Support</p>
                      <a href="mailto:roscoshippingllcc@mail.com" className="text-blue-600 hover:underline break-all">
                        roscoshippingllcc@mail.com
                      </a>
                      <p className="text-xs text-gray-500 mt-1">Response within 24 hours</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-lg mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Phone / WhatsApp</p>
                      <a href="tel:+1234567890" className="text-green-600 hover:underline block">
                        +1 (234) 567-8900
                      </a>
                      <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline text-sm">
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Office Hours</p>
                      <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM (CET)</p>
                      <p className="text-gray-600">Sat: 10:00 AM - 2:00 PM (CET)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-3">Common Questions?</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/routes" className="text-blue-600 hover:underline">Which routes do you support?</a>
                  </li>
                  <li>
                    <a href="/quote" className="text-blue-600 hover:underline">How do I get a quote?</a>
                  </li>
                  <li>
                    <a href="/tracking" className="text-blue-600 hover:underline">How can I track my shipment?</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
