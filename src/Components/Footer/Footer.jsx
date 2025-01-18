import { Building2 } from "lucide-react";
import React from "react";
import { useApp } from "../../Context/AppContext";

export default function Footer({language}) {
      
  return (
    <>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <Building2 className="h-6 w-6" />
            <span className="text-xl font-bold">
              {language === "ar" ? "تيم الباك" : "Back-end Team"}
            </span>
          </div>
          <p className="text-gray-400">
            © 2024 {language === "ar" ? "تيم الباك" : "Back-end Team"}.{" "}
            {language === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved"}.
          </p>
        </div>
      </footer>
    </>
  );
}
