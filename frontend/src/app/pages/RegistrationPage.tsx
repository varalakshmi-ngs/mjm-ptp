import { useNavigate } from 'react-router';
import { RegistrationForm } from '../components/RegistrationForm';
import { Building2, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useState } from 'react';
// Use public path for logo image

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg">
                <img src="/b5dc0401-0a74-4242-aad1-2fc3e46169b5-removebg-preview.png" alt="sdvvl" className='h-20 w-20' />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SDVVL</h1>
                <p className="text-sm text-gray-600">Mega Job Mela 2026</p>

              </div>

            </div>

          </div>

        </header>

        {/* Success Message */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Registration Successful! 🎉
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                Thank you for registering for SDVVL Mega Job Mela 2026.
                Your application has been submitted successfully.
              </p>

              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h2 className="font-semibold text-gray-900 mb-3">What's Next?</h2>
                <ul className="text-left space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">1.</span>
                    <span>You will receive a confirmation email shortly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">2.</span>
                    <span>Bring your registration confirmation on event day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">3.</span>
                    <span>Carry multiple copies of your resume and documents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">4.</span>
                    <span>Arrive by 9:00 AM on March 15, 2026</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/')}
                  size="lg"
                  className="px-8"
                >
                  Back to Home
                </Button>
                <Button
                  onClick={() => {
                    setIsSuccess(false);
                    window.location.reload();
                  }}
                  variant="outline"
                  size="lg"
                  className="px-8"
                >
                  Register Another Candidate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg">
                <img src="/b5dc0401-0a74-4242-aad1-2fc3e46169b5-removebg-preview.png" alt="sdvvl" className='h-20 w-20' />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SDVVL</h1>
                <p className="text-sm text-gray-600">Mega Job Mela 2026</p>
              </div>

            </div>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
          <div className="overflow-hidden whitespace-nowrap w-full mt-2 bg-amber-300  rounded-2xl">
            <div className="marquee flex gap-10 text-lg font-bold text-white bg-blue-800">
              {[
                "SDVVL SURVEY & CONSTRUCTION PVT LTD",
                "SDVVL SKILL HUB",
                "NUHVIN GLOBAL SERVICES PVT LTD",
                "PINK MOON TECHNOLOGIES PVT LTD",
                "SRAM SOLUTIONS PVT LTD",
                "FLYEX-CARGO",
                "MIRAV TECHNOLOGIES",
                "BYTESKILLS TECHNOLOGIES PVT LTD",
                "GEONFY SOLUTIONS PVT LTD",
                "AIRTEL BLACK",
                "AIRTEL WIFI",
                "AXIS BANK",
                "VARUN MOTORS",
                "DECCAN FINE CHEMICALS (India) Pvt.Ltd.",
                "Auro Bindo",
                "BOB Cards",
                "SBI Payments",
                "Apollo Pharmacy",
                "SRI GOPAL AUTOMOTIVE LTD",
                "IFB Industries",
                "Muthoot Finance Ltd.",
                "LG Authorised Service Center",
                "DD Solar Solutions",
                "Team Lease",
                "Tata Electronics",
                "KIA",
                "Tech Mahendra",
                "Trident One Associates",
                "Bright Path Education Services",
                "Makers Mind",
                "Golden Manpower Consultants (Dubai)"
              ].map((company, index) => (
                <span key={index} className="inline-block">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Registration Form Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Job Mela Registration Form
            </h1>
            <p className="text-lg text-gray-600">
              Fill in your details to register for the event. All fields marked with * are mandatory.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-900">
              <strong>📌 Important:</strong> Please ensure all information is accurate.
              You will need to bring supporting documents on the event day for verification.
            </p>
          </div>

          <RegistrationForm onSuccess={handleSuccess} />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 SDVVL Company. All rights reserved. | Mega Job Mela 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
