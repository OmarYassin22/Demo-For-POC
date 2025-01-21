import React from 'react';
import {
  Trophy,
  Users,
  Star,
  BarChart,
} from "lucide-react";

export default function Home() {

  return (
    <>
      <div
        className={`min-h-screen bg-white
      }`}
        dir="rtl"
      >
        <header className="relative h-screen">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80"
              alt="Construction site"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary bg-opacity-70"></div>
          </div>



          <div className="relative z-10 flex items-center h-full">
            <div className="container mx-auto px-6">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                نبني عالم الغد اليوم              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                التميز في البناء مع أكثر من 25 عاماً من الخبرة في تنفيذ المشاريع التجارية والسكنية المتميزة
              </p>
              <button
                className="bg-white text-primary px-8 py-3 rounded-md font-semibold 
              hover:bg-gray-100 transition duration-300"
              >
                ابدأ معنا            </button>
            </div>
          </div>
        </header>

        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { icon: <Trophy />, number: "250+", label: "مشروع مكتمل" },
                { icon: <Users />, number: "1500+", label: "عميل سعيد" },
                { icon: <Star />, number: "25+", label: "سنوات خبرة" },
                { icon: <BarChart />, number: "50+", label: "جائزة" },
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  {React.cloneElement(stat.icon, { className: "h-8 w-8 mb-4" })}
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 text-primary dark:text-white">
              مشاريعنا            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  image:
                    "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80",
                  title:

                    "برج سكني فاخر"

                },
                {
                  image:
                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80",
                  title:
                    "مجمع تجاري حديث"

                },
                {
                  image:
                    "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80",
                  title: "مركز ثقافي"
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg shadow-lg"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold">
                      {project.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


      </div>
    </>
  )
}
