import { Building2, Phone, Mail, MapPin, ExternalLink, Github, Linkedin, Twitter } from "lucide-react";
import { getConfigValue, getThemeColor } from "../../config/clientConfigUtils";

export default function Footer() {
  const clientName = getConfigValue('name', 'Modern IT SA');
  const slogan = getConfigValue('footer.slogan', 'توفير حلول تقنية مبتكرة لاصدار رخص المبانى في جميع أنحاء المملكة العربية السعودية.');
  const copyright = getConfigValue('footer.copyright', '© 2024 Modern IT SA - جميع الحقوق محفوظة');
  const accentColor = getThemeColor('accent', '#2f9a4f'); 
  
  const socialLinks = {
    github: getConfigValue('footer.socialLinks.github', 'https://github.com/OmarYassin22/Demo-For-POC'),
    linkedin: getConfigValue('footer.socialLinks.linkedin', 'https://www.linkedin.com/company/modern-information-technologies/posts/?feedView=all'),
    twitter: getConfigValue('footer.socialLinks.twitter', '')
  };

  const contact = {
    address: getConfigValue('contact.address', 'الرياض, المملكة العربية السعودية'),
    phone: getConfigValue('contact.phone', '+966 12 345 6789'),
    email: getConfigValue('contact.email', 'contact@modernitsa.com')
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12 z-50" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <Building2 className={`h-7 w-7 text-[${accentColor}]`} />
              <span className="text-2xl font-bold text-white">{clientName}</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md mx-auto md:mx-0 text-start">
              {slogan}
            </p>
            <div className="flex space-x-4 items-center justify-center md:justify-start">
              {socialLinks.github && (
                <a href={socialLinks.github} className={`hover:text-[${accentColor}] transition-colors`}>
                  <Github className="h-5 w-5 m-2" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} className={`hover:text-[${accentColor}] transition-colors`}>
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} className={`hover:text-[${accentColor}] transition-colors`}>
                  <Twitter className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h3 className={`text-xl font-semibold mb-4 text-[${accentColor}]`}>وصول سريع</h3>
            <ul className="space-y-2">
              <li><a href="https://modernit.sa/#services" className="text-gray-300 hover:text-white hover:underline transition-colors flex items-center justify-center md:justify-start">
                <ExternalLink className="h-4 w-4 mr-2" /> خدمات
              </a></li>
              <li><a href="https://modernit.sa/#about" className="text-gray-300 hover:text-white hover:underline transition-colors flex items-center justify-center md:justify-start">
                <ExternalLink className="h-4 w-4 mr-2" /> نبذة عنا
              </a></li>
              <li><a href="https://modernit.sa/#projects" className="text-gray-300 hover:text-white hover:underline transition-colors flex items-center justify-center md:justify-start">
                <ExternalLink className="h-4 w-4 mr-2" />  مشاريعنا
              </a></li>
              <li><a href="https://modernit.sa/#contact" className="text-gray-300 hover:text-white hover:underline transition-colors flex items-center justify-center md:justify-start">
                <ExternalLink className="h-4 w-4 mr-2" />  اتصل بنا
              </a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h3 className={`text-xl font-semibold mb-4 text-[${accentColor}]`}>تواصل معانا</h3>
            <div className="space-y-3">
              <p className="flex items-center justify-center md:justify-start">
                <MapPin className={`h-5 w-5 mr-2 text-[${accentColor}]`} />
                <span className="text-gray-300">{contact.address}</span>
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <Phone className={`h-5 w-5 mr-2 text-[${accentColor}]`} />
                <span className="text-gray-300">{contact.phone}</span>
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <Mail className={`h-5 w-5 mr-2 text-[${accentColor}]`} />
                <span className="text-gray-300">{contact.email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-400">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
