import { useNavigate } from 'react-router';
import { Hero } from '../components/Hero';
import { WelcomePopup } from '../components/WelcomePopup';
import { Building2, Users, Briefcase, TrendingUp, MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Welcome Popup */}
      <WelcomePopup />
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
                <p className="text-sm text-gray-600">Shaping Digital Ventures</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6 cursor-pointer">
              <button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 hover:text-blue-600 font-medium">Home</button>
              <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 hover:text-blue-600 font-medium">About</button>
              <button onClick={() => document.getElementById('companies')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 hover:text-blue-600 font-medium">Companies</button>
              <button onClick={() => document.getElementById('event-details')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 hover:text-blue-600 font-medium">Event Details</button>
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
      {/* Companies Section */}
      <section id="companies" className="py-8 md:py-12 bg-amber-50 px-3 sm:px-5">
        <div className="grid grid-cols-1 lg:grid-cols-[20%_50%_20%] gap-4 md:gap-8">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-900 text-center col-span-full">
            Our Companies
          </h1>

          {/* LEFT SIDE - SDVVL */}
          <div className="lg:col-span-1 flex items-start justify-center order-1 lg:order-none lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg border-2 border-amber-400 px-4 sm:px-8 py-6 sm:py-10 w-full">
              <div className="flex flex-col items-center gap-2">
                <img src="/logos/sdvvl.png" alt="SDVVL logo" className="h-14 md:h-16" />
                <span className="text-lg md:text-xl font-bold text-blue-600 text-center border-b-2">
                  <b>SDVVL SKILL HUB</b>
                </span>
                {/* <span className="text-lg md:text-xl font-bold text-amber-900 text-center">
                  SDVVL SURVEY & CONSTRUCTION PVT LTD

                </span> */}
                <a href="https://sdvvl.com" target="_blank" className="text-blue-500 text-sm md:text-base">
                  www.sdvvl.com
                </a>
                <p className="text-xs md:text-sm">sdvvlcompany@gmail.com</p>
                <p className="text-xs md:text-sm">+91 81216 52938</p>
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-amber-200 w-full text-xs text-gray-600 text-center">
                  <p className="font-semibold text-xs md:text-sm text-black mb-1">RS. 12,000/- TO RS. 25,000/-</p>
                  <p className="mb-1 text-xs"><span className="font-semibold">Designations:</span> SOFTWARE ENGINEER, HR EXECUTIVE, BPO, TEACHING TRAINEE</p>
                  <p className="mb-1 text-xs"><span className="font-semibold">Qualification:</span> Any Degree</p>
                  <p className="text-xs"><span className="font-semibold">Address:</span> Kakinada</p>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER - OTHER COMPANIES */}
          <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 order-2 lg:order-none">
            {[
              {
                name: "SDVVL SURVEY & CONSTRUCTION PVT LTD",
                logo: "/logos/sdvvl.png",
                salary: "12,000/- TO 18,000/-",
                designation: "Survey Engineer, Site Engineer,Designing Engineer,Site Supervisor",
                qualification: "Diploma, B.TECH, M.TECH",
                address: "Kakinada,AP & Telangana"
              },
              {
                name: "PINKMOON TECHNOLOGIES",
                logo: "/logos/pinkmoon.png",
                salary: "3.2 LPA to 6 LPA",
                designation: "DATA ANALYST, BUSINESS EXECUTIVE DEVELOPER, SOFTWARE DEVELOPER, APPLICATION DEVELOPER, SYSTEM ANALYST, JR DEVELOPER, WEB DEVELOPER, QUALITY ASSURANCE TESTER, DATA ENGINEER, BUSINESS ANALYST, More IT & Non IT Roles",
                qualification: "B.TECH, M.TECH",
                address: "HYDERABAD & VIJAYAWADA"
              },
              {
                name: "Byte Skills Technology pvt ltd",
                logo: "/logos/byteskills.png",
                salary: "2.8 LPA to 8 LPA",
                designation: "DATA ANALYST, BUSINESS EXECUTIVE DEVELOPER, SOFTWARE DEVELOPER, APPLICATION DEVELOPER, SYSTEM ANALYST, JR DEVELOPER, WEB DEVELOPER, QUALITY ASSURANCE TESTER, DATA ENGINEER, BUSINESS ANALYST, More IT & Non IT Roles",
                qualification: "B.TECH, M.TECH",
                address: "Vijayawada"
              },
              {
                name: "Mirav Technologies",
                logo: "/logos/mirav.png",
                salary: "12,000/- to 18,000/-",
                designation: "Application Developer,System Analyst,QA Tester",
                qualification: "Any Degree",
                address: "Addanki"
              },
              {
                name: "Geonify Solutions Pvt Ltd",
                logo: "/logos/geonify.png",
                salary: "15,000/- to 20,000/-",
                designation: "React Native Developer,AI/ML Engineer,Python Developer",
                qualification: "B.TECH, M.TECH,MBA",
                address: "Vijayawada"
              },
              {
                name: "Cognito Insights Solutions Pvt Ltd",
                logo: "/logos/cognito.png",
                salary: "15,000/- to 30,000/-",
                designation: "Jr.Frontend Engineer, Jr. Backend Engineer",
                qualification: "Graduation & Above",
                address: "Rajahmundry"
              },
              {
                name: "SRAM SOLUTIONS",
                logo: "/logos/sram.png",
                salary: "3.2 LPA to 6 LPA",
                designation: "DATA ANALYST, BUSINESS EXECUTIVE DEVELOPER, SOFTWARE DEVELOPER, APPLICATION DEVELOPER, SYSTEM ANALYST, JR DEVELOPER, WEB DEVELOPER, QUALITY ASSURANCE TESTER, DATA ENGINEER, BUSINESS ANALYST,Digital Marketing Executive",
                qualification: "B.TECH, M.TECH",
                address: "HYDERABAD"
              },
              {
                name: "Ashvee Tech Solutions Pvt Ltd",
                logo: "/logos/aashvee.png",
                salary: "15,000/- to 30,000/-",
                designation: "Jr.AI&ML Engineer, Jr.Computer Vision Engineer",
                qualification: "Graduation & Above",
                address: "Rajahmundry"
              },
              
              {
                name: "Makers Mind Soft Solutions Pvt Ltd",
                logo: "/logos/makersmind.jpg",
                salary: "10,000/- to 15,000/-",
                designation: "Multiple IT Roles",
                qualification: "Any Degree",
                address: "Kakinada"
              },
              {
                name: "Airtel Black",
                logo: "/logos/airtel-black.jpg",
                salary: "16,000/-",
                designation: "Voice Process",
                qualification: "Any Degree",
                address: "Hyderabad"
              },
              {
                name: "Airtel Wifi",
                logo: "/logos/airtel-wifi.jpg",
                salary: "14,000/- to 17,500/-",
                designation: "Voice Process",
                qualification: "Any Degree",
                address: "Hyderabad"
              },
              {
                name: "Axis Bank",
                logo: "/logos/axis-bank.png",
                salary: "15,000/- to 20,000/-",
                designation: "Customer Support Executive",
                qualification: "Intermediate, Any Degree",
                address: "Hyderabad"
              },
              {
                name: "Varun Motors",
                logo: "/logos/varun-motors.jpg",
                salary: "14,000/- to 28,000/- + Incentives",
                designation: "Executive- Sales",
                qualification: "Any Degree",
                address: "Kakinada,Yeleswaram,Annavaram,Rajahmundry"
              },
              {
                name: "Deccan Fine Chemicals India Pvt Ltd",
                logo: "/logos/deccan.jpg",
                salary: "18000/-",
                designation: "Trainee Chemist",
                qualification: "BSc Chemistry / Diploma in Chemical",
                address: "Tuni"
              },
              {
                name: "BOB Cards",
                logo: "/logos/bob-card.jpg",
                salary: "18000/- to 22,000/- + Incentives",
                designation: "Customer Relationship Executive",
                qualification: "Any Graduation",
                address: "Kakinada & East Godavari"
              },
              {
                name: "SBI Payments",
                logo: "/logos/sbi-payments.png",
                salary: "11000/- to 19,500/- + Incentives",
                designation: "Sales Assistants,Senior Sales Assistants,Team Leaders",
                qualification: "Inter & Above",
                address: "Kakinada & East Godavari"
              },
              {
                name: "Appollo Pharmacy",
                logo: "/logos/apollo.jpg",
                salary: "11,500/- to 22,000/-",
                designation: "Pharmacist,Retail Associate",
                qualification: "B.Pharm, D.Pharm",
                address: "Multiple Locations"
              },
              {
                name: "Sri Gopal Automotive ltd",
                logo: "/logos/sree-gopal.jpg",
                salary: "12000/- to 14,000/-",
                designation: "Sales Executive,Branch Incharge",
                qualification: "Inter / Any Degree / Diploma",
                address: "Multiple Locations"
              },
              {
                name: "IFB Industries",
                logo: "/logos/ifb.png",
                salary: "15000/- + Incentives",
                designation: "Service Technicians",
                qualification: "SSC to Any Degree",
                address: "Multiple Locations In AP "
              },
              {
                name: "Muthoot Finance Ltd",
                logo: "/logos/muthoot.png",
                salary: "10,000/- to 20,000/-",
                designation: "Internship",
                qualification: "Any Degree",
                address: "Kakinada"
              },
              {
                name: "LG Authorised Service Center",
                logo: "/logos/lg.jpg",
                salary: "15,000/- + Incentives",
                designation: "Field Engineer, Customer Care Officer",
                qualification: "ITI/Diploma/Any Degree",
                address: "Anakapalli"
              },
              {
                name: "DD Solar Solutions",
                logo: "/logos/dd-solar.png",
                salary: "15,000/- + Incentives",
                designation: "Field Technicians",
                qualification: "ITI / Diploma",
                address: "Anakapalli"
              },
              {
                name: "Team Lease",
                logo: "/logos/team-lease.webp",
                salary: "15000/- to 16,000/-",
                designation: "Branch Relationship Executive",
                qualification: "Inter / Any Degree",
                address: "kakinada, Rajahmundry, Tuni"
              },
              {
                name: "Tata Electronics",
                logo: "/logos/tata-electronics.png",
                salary: "19128/- CTC per month",
                designation: "Mobile Operator",
                qualification: "10th/12th/Any Degree",
                address: "Bangalore"
              },
              {
                name: "Tech Mahindra",
                logo: "/logos/tech-mahindra.png",
                salary: "17000/-",
                designation: "Customer Support Associate (Voice Process)",
                qualification: "Graduation & Above",
                address: "Visakhapatnam"
              },
              

              {
                name: "FLYEX CARGO",
                logo: "/logos/flyex.png",
                salary: "20,000/- to 30,000/-",
                designation: "Business Development Executive",
                qualification: "Any Degree",
                address: "Goa"
              },
              {
                name: "Tam Tam Robotics school",
                logo: "/logos/tamtam.png",
                salary: "12,500/- to 25,000/-",
                designation: "Teaching",
                qualification: "B.Ed,Degree",
                address: "Piduguralla"
              },
              {
                name: "PhonePe",
                logo: "/logos/phonpe.png",
                salary: "18,000/-",
                designation: "Marketing Executive",
                qualification: "10th to Any Degree",
                address: "Kakinada,Rajahmundry"
              },
              {
                name: "Kia Motors",
                logo: "/logos/kia.png",
                salary: "15000/- to 18,000/- + On duty Food & Transport",
                designation: "PRODUCTION (SMT), QUALITY, TESTING",
                qualification: "SSC, INTER, ITI, DIPLOMA, DEGREE, B.TECH",
                address: "Anantapur"
              },

              {
                name: "Micromax",
                logo: "/logos/micromax.png",
                salary: "15000/- to 18,000/- + On duty Food & Transport",
                designation: "PRODUCTION (SMT), QUALITY, TESTING",
                qualification: "SSC, INTER, ITI, DIPLOMA, DEGREE, B.TECH",
                address: "HYDERABAD"
              },
              {
                name: "Skyfri Energy Pvt Ltd",
                logo: "/logos/skyfri.png",
                salary: "13,500/- + PF, ESI",
                designation: "PRODUCTION (SMT), QUALITY, TESTING",
                qualification: "SSC, INTER, ITI, DIPLOMA, DEGREE, B.TECH",
                address: "Tirupati,Kadapa & Nellore"
              },
              {
                name: "Renewsys Pvt Ltd",
                logo: "/logos/renewsys.png",
                salary: "Upto 20,000/-",
                designation: "PRODUCTION (SMT), QUALITY, TESTING",
                qualification: "SSC, INTER, ITI, DIPLOMA, DEGREE, B.TECH",
                address: "HYDERABAD"
              },
              {
                name: "AIL DIXON",
                logo: "/logos/dixon.png",
                salary: "13,500/- TO 23,000/- + FOOD & TRANSPORT",
                designation: "PRODUCTION (SMT), QUALITY, TESTING",
                qualification: "SSC, INTER, ITI, DIPLOMA, DEGREE, B.TECH",
                address: "KADAPA"
              },
              {
                name: "Auro bindo Pharmaceuticals",
                logo: "/logos/auro-bindo.png",
                salary: "17,500/-",
                designation: "Multiple Roles in Pharma",
                qualification: "B Sc / B Pharma",
                address: "HYDERABAD"
              },
              {
                name: "Apitoria Pharma",
                logo: "/logos/apitoria.png",
                salary: "17,500/-",
                designation: "Multiple Roles in Pharma",
                qualification: "B Sc / B Pharma",
                address: "HYDERABAD"
              },
              {
                name: "Honour Lab Limited",
                logo: "/logos/honour.svg",
                salary: "18800/-",
                designation: "Multiple Roles in Pharma",
                qualification: "ANY DEGREE",
                address: "Hyderabad"
              },
              {
                name: "Raichem Medicare",
                logo: "/logos/raichem.webp",
                salary: "21500/-",
                designation: "Multiple Roles in Pharma",
                qualification: "B Sc / B Pharma",
                address: "KARNATAKA"
              },
              {
                name: "Shakthi Hormann",
                logo: "/logos/hormann.png",
                salary: "",
                designation: "PRODUCTION (SMT), QUALITY, TESTING",
                qualification: "ITI Fitters & Electricians",
                address: "Hyderabad"
              },
              {
                name: "Voith Turbo Private Limited",
                logo: "/logos/voith.svg",
                salary: "",
                designation: "PRODUCTION (SMT), QUALITY, TESTING",
                qualification: "ITI / B Tech / Diploma",
                address: "HYDERABAD"
              },
              {
                name: "Neuland Laboratories Ltd",
                logo: "/logos/neulan.svg",
                salary: "18,000/-",
                designation: "Multiple Roles in Pharma",
                qualification: "BSC",
                address: "Hyderabad"
              },

              {
                name: "PREMIER ENERGIES",
                logo: "/logos/premier.png",
                salary: "14,000/- TO 21,000/- + FOOD & TRANSPORT",
                designation: "GET, DET, PRODUCTION",
                qualification: "ITI, DIPLOMA, B.TECH (ECE, EEE, MECH)",
                address: "HYDERABAD"
              },
              {
                name: "RADIANT ELECTRONICS",
                logo: "/logos/radiant.png",
                salary: "14,000/- TO 20,000/- + FOOD & TRANSPORT",
                designation: "PRODUCTION (SMT), QUALITY, TESTING",
                qualification: "SSC, INTER, ITI, DIPLOMA, DEGREE, B.TECH",
                address: "HYDERABAD"
              },
              {
                name: "SKY QUARD ELECTRONICS",
                logo: "/logos/resolute.png",
                salary: "14,000/- TO 20,000/- + FOOD & TRANSPORT",
                designation: "PRODUCTION (SMT), QUALITY, TESTING",
                qualification: "SSC, INTER, ITI, DIPLOMA, DEGREE, B.TECH",
                address: "HYDERABAD"
              },
              {
                name: "Mahendra Mithaiwala Pvt LTD",
                logo: "/logos/mahendra-mithaiwala.png",
                salary: "12,000/- to 15,000/-",
                designation: "Retail Sales Associates, Packing Helpers",
                qualification: "10th & Above",
                address: "Kakinada"
              },
              {
                name: "DBS Bank",
                logo: "/logos/dbs.png",
                salary: "1.98 LPA to 3.18 LPA",
                designation: "Gold Loan Sales Officer",
                qualification: "Degree and above",
                address: "Multiple Locations in AP"
              },              


            ].map((company) => (
              <div
                key={company.name}
                className="bg-white rounded-xl shadow hover:shadow-lg p-3 md:p-4 flex flex-col items-center justify-center text-center font-semibold text-gray-800 border border-amber-200 min-h-[80px] md:min-h-[100px]"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-12 md:h-16 mb-2 object-contain"
                />
                <span className="text-xs md:text-sm">{company.name}</span>
                <span className="text-xs md:text-sm text-black-500 mt-1">{company.salary}</span>
                <span className="text-xs text-gray-600"><b className='text-sm text-grey-100'>Designation :</b> {company.designation}</span>
                <span className="text-xs text-gray-600">Qualification: {company.qualification}</span>
                <span className="text-xs text-gray-600">Address: {company.address}</span>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - NGS */}
          <div className="lg:col-span-1 flex items-start justify-center order-3 lg:order-none lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg border-2 border-amber-400 px-4 sm:px-8 py-6 sm:py-10 w-full">
              <div className="flex flex-col items-center gap-2">
                <img src="/logos/ngs.png" alt="NGS logo" className="h-12 md:h-16" />
                <span className="text-lg md:text-xl font-bold text-[#ff6600] text-center">
                  Nuhvin Global Services Pvt Ltd
                </span>
                <a href="https://nuhvin.com" target="_blank" className="text-blue-500 text-sm md:text-base">
                  www.nuhvin.com
                </a>
                <p className="text-xs md:text-sm">ngsinfo@nuhvin.com</p>
                <p className="text-xs md:text-sm">+91 93922 96850</p>
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-amber-200 w-full text-xs text-gray-600 text-center">
                  <p className="font-semibold text-xs md:text-sm text-black mb-1">RS. 18,000/- TO RS. 25,000/-</p>
                  <p className="mb-1 text-xs"><span className="font-semibold">Designations:</span> SOFTWARE ENGINEER, BUSINESS EXECUTIVE, MARKETING EXECUTIVE, DATA ANALYST, BUSINESS</p>
                  <p className="mb-1 text-xs"><span className="font-semibold">Qualification:</span> Any Degree</p>
                  <p className="text-xs"><span className="font-semibold">Address:</span> KAKINADA, HYDERABAD, VIJAYAWADA</p>
                </div>
              </div>
            </div>
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
                        <p className="text-gray-700"><b>SDVVL SKILL HUB </b></p>
                        <p className="text-gray-600">Kakinada Andhra Pradesh, 533005</p>


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
                      <span className="text-gray-700">Educational certificates</span>
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
                    <p className="text-2xl font-bold text-blue-600"><b>April 27, 2026</b></p>
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
                  <img src="/b5dc0401-0a74-4242-aad1-2fc3e46169b5-removebg-preview.png" alt="sdvvl" className='h-20 w-20' />
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
                <li><button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-400 transition-colors">Home</button></li>
                <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-400 transition-colors">About Us</button></li>
                <li><button onClick={() => document.getElementById('event-details')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-400 transition-colors">Event Details</button></li>
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
