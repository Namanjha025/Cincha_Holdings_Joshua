import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const InterestCard = ({ title, imageUrl, description, visible, isActive, onClick, isMobile }) => {
  if (isMobile) {
    return (
      <div 
        onClick={onClick}
        className={`bg-white rounded-xl shadow-sm mb-3 overflow-hidden transition-all duration-300
          ${isActive ? 'ring-2 ring-purple-400' : 'opacity-90'}`}
      >
        {/* Header */}
        <div className="flex items-center p-4 cursor-pointer">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="rounded-lg object-cover"
              sizes="64px"
            />
          </div>
          <h3 className="ml-4 text-lg font-semibold text-gray-800 flex-grow">{title}</h3>
          <ChevronRight 
            className={`transform transition-transform duration-500 ease-in-out ${
              isActive ? 'rotate-90' : ''
            }`} 
            size={20}
          />
        </div>

        {/* Content */}
        <div 
          className={`transform transition-all duration-500 ease-in-out origin-top ${
            isActive ? 'max-h-48' : 'max-h-0'
          } overflow-hidden`}
        >
          <div className="p-4 pt-0">
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Desktop/tablet card
  return (
    <div
      className={`bg-white rounded-lg flex flex-col items-center p-4 py-6 shadow-md transition-all duration-300 hover:shadow-lg ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-full h-40 relative mb-4">
        <Image 
          src={imageUrl} 
          alt={title} 
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>
      <h3 className="text-xl font-medium mb-3 text-center">{title}</h3>
      <p className="text-sm text-gray-600 text-center">{description}</p>
    </div>
  );
};

const CoreInterestsSection = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [activeInterest, setActiveInterest] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  const interests = [
    // US Interests
    {
      title: "Affordable Housing",
      imageUrl: "/affordablehousing.jpg",
      description: "Dedicated to creating accessible and sustainable housing solutions for all communities, ensuring everyone has a place to call home.",
      category: "US"
    },
    {
      title: "Distressed",
      imageUrl: "/foodSec.jpg",
      description: "Strategic investments in distressed assets with potential for significant value creation through restructuring and revitalization.",
      category: "US"
    },
    {
      title: "Private Credit",
      imageUrl: "/wasteManage.jpg",
      description: "Providing flexible financing solutions to businesses and real estate projects with attractive risk-adjusted returns.",
      category: "US"
    },
    {
      title: "GP Investing",
      imageUrl: "/renewEnergy.jpg",
      description: "Strategic partnerships with exceptional fund managers through general partner investments.",
      category: "US"
    },
    // Cross Border Interests
    {
      title: "LATAM",
      imageUrl: "/inclFintech.jpg",
      description: "Investments in Latin American markets with high growth potential and strategic advantages.",
      category: "Cross Border"
    },
    {
      title: "Emerging Market Tech",
      imageUrl: "/education.jpg",
      description: "Supporting innovative technology solutions addressing unique challenges in emerging markets.",
      category: "Cross Border"
    },
    {
      title: "O&G Exploration",
      imageUrl: "/commHealth.jpg",
      description: "Strategic investments in oil and gas exploration projects with significant potential returns.",
      category: "Cross Border"
    },
    {
      title: "Equestrian Facilities",
      imageUrl: "/sustainable.jpg",
      description: "Development and management of premium equestrian facilities and related investments.",
      category: "Cross Border"
    }
  ];

  useEffect(() => {
    // Check if mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Animation for cards
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const interval = setInterval(() => {
            setVisibleCards((prev) => {
              const next = prev.length;
              if (next < interests.length) {
                return [...prev, next];
              } else {
                clearInterval(interval);
                return prev;
              }
            });
          }, 200);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [interests.length]);

  return (
    <div ref={sectionRef} className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          CORE INTERESTS
        </h2>
        
        {/* Mobile View */}
        {isMobile && (
          <div className="md:hidden space-y-4">
            {interests
              .filter(interest => interest.category === "US")
              .map((interest, index) => (
                <InterestCard
                  key={index}
                  {...interest}
                  isActive={activeInterest === index}
                  onClick={() => setActiveInterest(activeInterest === index ? null : index)}
                  isMobile={true}
                />
              ))}
              
            <h3 className="text-2xl font-semibold text-center mb-4 mt-8">CROSS BORDER</h3>
            {interests
              .filter(interest => interest.category === "Cross Border")
              .map((interest, index) => (
                <InterestCard
                  key={index + 4}
                  {...interest}
                  isActive={activeInterest === (index + 4)}
                  onClick={() => setActiveInterest(activeInterest === (index + 4) ? null : (index + 4))}
                  isMobile={true}
                />
              ))}
          </div>
        )}
        
        {/* Desktop/Tablet View */}
        {!isMobile && (
          <>
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {interests
                  .filter(interest => interest.category === "US")
                  .map((interest, index) => (
                    <InterestCard
                      key={index}
                      {...interest}
                      visible={visibleCards.includes(index)}
                      isActive={activeInterest === index}
                      onClick={() => setActiveInterest(activeInterest === index ? null : index)}
                      isMobile={false}
                    />
                  ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8">CROSS BORDER</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {interests
                  .filter(interest => interest.category === "Cross Border")
                  .map((interest, index) => (
                    <InterestCard
                      key={index + 4}
                      {...interest}
                      visible={visibleCards.includes(index + 4)}
                      isActive={activeInterest === (index + 4)}
                      onClick={() => setActiveInterest(activeInterest === (index + 4) ? null : (index + 4))}
                      isMobile={false}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoreInterestsSection;