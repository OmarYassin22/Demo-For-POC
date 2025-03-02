import { Building2, Phone, Mail, MapPin, ExternalLink, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12 z-50">
      <div className="container mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <Building2 className="h-7 w-7 text-green-400" />
              <span className="text-2xl font-bold text-white">Modern IT SA</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md mx-auto md:mx-0">
              Providing innovative technology solutions to businesses across Saudi Arabia and beyond.
            </p>
            <div className="flex space-x-4 items-center justify-center md:justify-start">
              <a href="https://github.com/OmarYassin22/Demo-For-POC" className="hover:text-green-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/modern-information-technologies/posts/?feedView=all" className="hover:text-green-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4 text-green-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white hover:underline transition-colors flex items-center justify-center md:justify-start">
                <ExternalLink className="h-4 w-4 mr-2" /> Services
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-white hover:underline transition-colors flex items-center justify-center md:justify-start">
                <ExternalLink className="h-4 w-4 mr-2" /> About Us
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-white hover:underline transition-colors flex items-center justify-center md:justify-start">
                <ExternalLink className="h-4 w-4 mr-2" /> Careers
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-white hover:underline transition-colors flex items-center justify-center md:justify-start">
                <ExternalLink className="h-4 w-4 mr-2" /> Contact
              </a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4 text-green-400">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-center justify-center md:justify-start">
                <MapPin className="h-5 w-5 mr-2 text-green-400" /> 
                <span className="text-gray-300">Riyadh, Saudi Arabia</span>
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <Phone className="h-5 w-5 mr-2 text-green-400" /> 
                <span className="text-gray-300">+966 12 345 6789</span>
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <Mail className="h-5 w-5 mr-2 text-green-400" /> 
                <span className="text-gray-300">contact@modernitsa.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-400">
            © 2024 Modern IT SA - جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}
