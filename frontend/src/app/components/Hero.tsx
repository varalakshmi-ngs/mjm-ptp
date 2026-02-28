import { Briefcase, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';

interface HeroProps {
  onRegisterClick: () => void;
}

export function Hero({ onRegisterClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}></div>
      </div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-medium">🎯 Mega Job Mela 2026</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your Dream Career
              <span className="block text-yellow-300">Starts Here</span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              Join SDVVL's Mega Job Mela and connect with top employers. 
              Register now to grab exciting career opportunities!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={onRegisterClick}
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
              >
                <Briefcase className="mr-2 h-5 w-5" />
                Register Now
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white hover:bg-white hover:text-blue-900 font-semibold text-lg px-8 py-6"
                onClick={() => {
                  document.getElementById('event-details')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Right Content - Event Details Cards */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-400 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Event Date</h3>
                  <p className="text-blue-100">March 15, 2026 | 9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-400 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Venue</h3>
                  <p className="text-blue-100">SDVVL Convention Center, Sector 12, Tech Park</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-400 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-blue-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Contact Us</h3>
                  <p className="text-blue-100">+91 9876543210</p>
                  <p className="text-blue-100 flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4" />
                    careers@sdvvl.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
