import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay when component mounts
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Popup */}
      <div className="relative mx-4 max-w-md md:max-w-2xl w-full">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 bg-gray-200 hover:bg-red-500 text-gray-700 p-2 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Banner Image */}
          <div className="relative w-full h-80 md:h-96 overflow-hidden">
            <img
              src="logos/it-trainings.png"
              alt="Nuhvin Global Services Pvt Ltd"
              className="w-full h-full object-contain bg-white"
            />
          </div>

          {/* Action Button */}
          <div className="p-6 text-center">
            <a href="https://nadt.nuhvin.com/" target="_blank" rel="noopener noreferrer">
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-amber-300 hover:bg-amber-400 text-gray-900 font-bold px-12 py-3 rounded-lg transition-colors cursor-pointer"
            >
              Enroll Now
            </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
