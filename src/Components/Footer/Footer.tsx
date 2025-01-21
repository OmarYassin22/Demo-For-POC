import { Building2 } from "lucide-react";


export default function Footer() {

  return (
    <>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <Building2 className="h-6 w-6" />
            <span className="text-xl font-bold">
              تيم الباك
            </span>
          </div>
          <p className="text-gray-400">
            © 2024 تيم الباك
            جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </>
  );
}
