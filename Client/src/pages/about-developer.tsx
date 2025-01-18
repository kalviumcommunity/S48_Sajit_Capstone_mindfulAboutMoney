import React, { useState } from "react";
import { Camera, Gamepad2, Car, Bike, Coffee, Laptop } from "lucide-react";

const AboutDeveloper: React.FC = () => {
  const [activeGallery, setActiveGallery] = useState<
    "bikes" | "friends" | "doggos"
  >("bikes");
  const [hoveredInterest, setHoveredInterest] = useState<number | null>(null);

  const interestSections = [
    {
      icon: Camera,
      title: "Photography",
      description:
        "Capturing moments and exploring visual storytelling through my lens.",
    },
    {
      icon: Gamepad2,
      title: "Gaming",
      description:
        "Immersive gaming experiences and strategic multiplayer challenges.",
    },
    {
      icon: Laptop,
      title: "Tech Enthusiast",
      description:
        "Always exploring the latest in technology and innovative solutions.",
    },
    {
      icon: Car,
      title: "Automobiles",
      description:
        "Passionate about automotive design, engineering, and performance.",
    },
  ];

  const bikeImages = [
    {
      src: "/assets/about-developer/bike/bike1.webp",
      alt: "Old School Vintage Vibe",
    },
    {
      src: "/assets/about-developer/bike/bike3.webp",
      alt: "Bike Ride Home",
    },
    {
      src: "/assets/about-developer/bike/bike2.webp",
      alt: "Into the Wilderness",
    },
  ];

  const friendsImages = [
    {
      src: "/assets/about-developer/frens/frens1.webp",
      alt: "Peak Heat Moment",
    },
    {
      src: "/assets/about-developer/frens/frens3.webp",
      alt: "Random Meetup",
    },
    {
      src: "/assets/about-developer/frens/frens2.webp",
      alt: "Failed Plan to Hike",
    },
  ];

  const doggos = [
    {
      src: "/assets/about-developer/doggos/chainz.webp",
      alt: "Chainz",
    },
    {
      src: "/assets/about-developer/doggos/dusty.webp",
      alt: "Dusty",
    },
    {
      src: "/assets/about-developer/doggos/campus-pups-2.webp",
      alt: "Pups of RVU",
    },
  ];

  return (
    <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100'>
      <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
        <div className='bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl'>
          {/* Profile Header */}
          <div className='flex flex-col md:flex-row items-center p-8 bg-emerald-50/50'>
            <div className='w-64 h-64 mb-6 md:mb-0 md:mr-10 relative'>
              <img
                src='/assets/about-developer/developer.png'
                alt='Sajit Profile'
                className='w-full h-full object-cover rounded-full border-4 border-emerald-100 shadow-lg transform hover:scale-105 transition-transform duration-300'
              />
            </div>
            <div className='text-center md:text-left'>
              <h1 className='text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 mb-4'>
                Sajit
              </h1>
              <h2 className='text-slate-600 mb-4'>
                Tech Enthusiast & Developer
              </h2>
              <p className='text-slate-700 max-w-md'>
                Hey there! I'm a 22-year-old computer science student based in
                Bangalore, currently in my second year of college. When I'm not
                coding or building digital solutions, you'll find me exploring
                my passions.
              </p>
              <div className='flex justify-center md:justify-start space-x-4 mt-6'>
                <div className='flex items-center space-x-3'>
                  <Coffee className='text-emerald-600 h-6 w-6' />
                  <span className='text-slate-700'>Chai runs in the blood</span>
                </div>
                <div className='flex items-center space-x-3'>
                  <Bike className='text-emerald-600 h-6 w-6' />
                  <span className='text-slate-700'>Biker</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interests Section */}
          <div className='p-8 bg-emerald-50/50'>
            <h3 className='text-2xl font-bold text-slate-800 text-center mb-8'>
              My Interests
            </h3>
            <div className='grid md:grid-cols-2 gap-6'>
              {interestSections.map((interest, index) => (
                <div
                  key={index}
                  className={`relative group overflow-hidden rounded-xl p-6 transition-all duration-300 ${
                    hoveredInterest === index ? "bg-emerald-100" : "bg-white"
                  }`}
                  onMouseEnter={() => setHoveredInterest(index)}
                  onMouseLeave={() => setHoveredInterest(null)}
                >
                  <div className='relative z-10 text-center'>
                    <div
                      className={`bg-white p-3 rounded-full inline-block mb-4 transform transition-transform ${
                        hoveredInterest === index ? "scale-110" : ""
                      }`}
                    >
                      <interest.icon
                        className={`h-8 w-8 ${
                          hoveredInterest === index
                            ? "text-emerald-700"
                            : "text-emerald-600"
                        }`}
                      />
                    </div>
                    <h4 className='font-bold text-slate-800 mb-2'>
                      {interest.title}
                    </h4>
                    <p className='text-slate-600 text-sm'>
                      {interest.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Section */}
          <div className='p-8 bg-white/50'>
            <div className='flex justify-center space-x-4 mb-8'>
              <button
                onClick={() => setActiveGallery("bikes")}
                className={`px-6 py-2 rounded-lg transition-all ${
                  activeGallery === "bikes"
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                }`}
              >
                Artemis
              </button>
              <button
                onClick={() => setActiveGallery("friends")}
                className={`px-6 py-2 rounded-lg transition-all ${
                  activeGallery === "friends"
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                }`}
              >
                People & Travel
              </button>
              <button
                onClick={() => setActiveGallery("doggos")}
                className={`px-6 py-2 rounded-lg transition-all ${
                  activeGallery === "doggos"
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                }`}
              >
                Doggos
              </button>
            </div>

            <div className='grid md:grid-cols-3 gap-6'>
              {(activeGallery === "bikes"
                ? bikeImages
                : activeGallery === "friends"
                ? friendsImages
                : doggos
              ).map((image, index) => (
                <div
                  key={index}
                  className='overflow-hidden rounded-2xl group relative'
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className='w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300'
                  />
                  <div className='absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4'>
                    <p className='text-white text-sm'>{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDeveloper;
