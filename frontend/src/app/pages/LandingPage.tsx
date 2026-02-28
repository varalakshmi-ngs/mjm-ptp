import { useNavigate } from 'react-router';
import { Hero } from '../components/Hero';
import { Building2, Users, Briefcase, TrendingUp, MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import logo from "../../../public/b5dc0401-0a74-4242-aad1-2fc3e46169b5-removebg-preview.png"

export default function LandingPage() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg">
                <img src={logo} alt="sdvvl" className='h-20 w-20' />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SDVVL</h1>
                <p className="text-sm text-gray-600">Shaping Digital Ventures</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6 cursor-pointer">
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
              <a href="#event-details" className="text-gray-700 hover:text-blue-600 font-medium">Event Details</a>
              <button
                onClick={() => navigate('/register')}
                className="text-gray-700 hover:bg-amber-300 font-bold cursor-pointer bg-amber-200 h-10 w-40 rounded-xl pb-[2px]"
              >
                Register
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero onRegisterClick={handleRegisterClick} />

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">30+</h3>
              <p className="text-gray-600">Companies</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Briefcase className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">1000+</h3>
              <p className="text-gray-600">Job Openings</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">95%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">50+</h3>
              <p className="text-gray-600">Locations</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About SDVVL Mega Job Mela</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              SDVVL is organizing a Mega Job Mela to bridge the gap between talented candidates
              and leading companies. Our mission is to provide equal employment opportunities
              and help you kickstart your dream career.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Multiple Sectors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Opportunities across IT, Non-IT, Technical, and Support roles from various industries.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>On-the-Spot Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get instant interview opportunities with HR representatives from top companies.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Career Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Free career counseling and resume building sessions by industry experts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section id="event-details" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Event Details</h2>
            <p className="text-lg text-gray-600">Everything you need to know about the Job Mela</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 border border-blue-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Important Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-600 p-2 rounded-lg mt-1">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Venue</h4>
                        <p className="text-gray-700">Suryaraya Degree college</p>
                        <p className="text-gray-600">Pithapuram,Kakinada District, AP, 533450</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-blue-600 p-2 rounded-lg mt-1">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Contact</h4>
                        <p className="text-gray-700">+91 81216 52938 </p>
                        <p className="text-gray-700">+91 88869 68522</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-blue-600 p-2 rounded-lg mt-1">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Email</h4>
                        <p className="text-gray-700">careers@sdvvl.com</p>
                        <p className="text-gray-700">sdvvlcompany@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">What to Bring</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span className="text-gray-700">Multiple copies of your resume (10+ copies)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span className="text-gray-700">Original educational certificates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span className="text-gray-700">Government-issued photo ID proof</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span className="text-gray-700">Passport-size photographs (4-5)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span className="text-gray-700">Registration confirmation (after registering online)</span>
                    </li>
                  </ul>

                  <div className="mt-8 bg-white rounded-lg p-4 border-2 border-blue-300">
                    <p className="text-sm font-semibold text-blue-900 mb-2">⏰ Event Timing</p>
                    <p className="text-2xl font-bold text-blue-600">March 07, 2026</p>
                    <p className="text-gray-700">9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Don't miss this opportunity! Register now and take the first step towards your dream job.
          </p>
          <button
            onClick={handleRegisterClick}
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-lg px-10 py-4 rounded-lg shadow-xl hover:shadow-2xl transition-all"
          >
            Register for Job Mela
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white p-2 rounded-lg">
                  <img src={logo} alt="sdvvl" className='h-20 w-20' />
                </div>
                <h3 className="text-xl font-bold text-white">SDVVL</h3>
              </div>
              <p className="text-gray-400">
                Empowering careers, connecting talent with opportunities.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-blue-400 transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#event-details" className="hover:text-blue-400 transition-colors">Event Details</a></li>
                <li>
                  <button onClick={() => navigate('/admin')} className="hover:text-blue-400 transition-colors">
                    login
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +91 81216 52938
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  careers@sdvvl.com
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Sarpavaram Junction,Kakinada,533005
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2026 SDVVL Company. All rights reserved. | Mega Job Mela 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
