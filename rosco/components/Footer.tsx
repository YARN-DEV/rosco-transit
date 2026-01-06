export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-white py-8 border-t border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {currentYear} ROSCO Network. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              GlobalShip Network – Europe ⇄ Americas ⇄ Africa freight portal.
            </p>
            <a href="mailto:roscoshippingllcc@mail.com" className="text-gray-400 hover:text-white text-xs mt-1 block">
              roscoshippingllcc@mail.com
            </a>
          </div>
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors text-sm"
              aria-label="Terms and Conditions"
            >
              Terms & Conditions
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors text-sm"
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
