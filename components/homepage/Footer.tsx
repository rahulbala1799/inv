"use client";

export function Footer() {
  return (
    <footer className="py-16 px-6 lg:px-8 border-t-2 border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">I</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">Invozify</span>
          </div>
          
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Support</a>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-200">
          <p>&copy; {new Date().getFullYear()} Invozify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
