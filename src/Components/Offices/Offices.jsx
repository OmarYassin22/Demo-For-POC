import React from "react";
import { Link } from "react-router-dom";
import { Building2, MapPin, Phone } from "lucide-react";
import { useApp } from "../../Context/AppContext";
export default function Offices() {
  const { language } = useApp();

  const offices = [
    {
      id: "64ed91f79d5cf006de8e3471",
      name: "رواق الخليج للأستشارات الهندسيه المعماريه",
      supportedServicesCount: 27,
      tags: [],
    },
    {
      id: "64ed920d9d5cf006de8e34ef",
      name: "شركة عبدالرحمن احمد الجعفري وشركاه للاستشارات الهندسية",
      supportedServicesCount: 27,
      tags: [],
    },
    {
      id: "63c6a7422fac9a1c4020ac1d",
      name: "صروح البناء للاستشارات الهندسية",
      supportedServicesCount: 36,
      tags: [],
    },
  ];

  return (
    <div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">
          {language === "ar" ? "مكاتبنا" : "Our Offices"}
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {offices.map((office) => (
            <div
              key={office.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {office.name}
                </h3>

                <Link
                  to={`/offices/${office.id}/requests`}
                  className="mt-6 block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition duration-300"
                >
                  {language === "ar"
                    ? " عرض طلبات المكتب"
                    : "Show Office Requests"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
