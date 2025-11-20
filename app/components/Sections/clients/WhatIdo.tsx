import { useState } from "react";
import { cn } from "@/lib/utils";

interface Service {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  color: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Web Development",
    shortDescription: "Modern websites",
    fullDescription: "I create responsive, high-performance websites using the latest technologies. From landing pages to complex web applications, I ensure your digital presence stands out with clean code and beautiful design.",
    color: "portfolio-yellow",
  },
  {
    id: 2,
    title: "UI/UX Design",
    shortDescription: "User-centered design",
    fullDescription: "Crafting intuitive and visually stunning interfaces that prioritize user experience. I combine aesthetics with functionality to create designs that not only look great but also solve real problems.",
    color: "portfolio-pink",
  },
  {
    id: 3,
    title: "Full-Stack Solutions",
    shortDescription: "End-to-end development",
    fullDescription: "Complete web applications from concept to deployment. I handle both frontend and backend development, ensuring seamless integration, optimal performance, and scalable architecture for your business needs.",
    color: "portfolio-dark",
  },
  {
    id: 4,
    title: "Mobile Development",
    shortDescription: "Cross-platform apps",
    fullDescription: "Building responsive mobile applications that work flawlessly across all devices. Whether it's iOS, Android, or progressive web apps, I deliver smooth, native-like experiences your users will love.",
    color: "portfolio-blue",
  },
  {
    id: 5,
    title: "Consulting",
    shortDescription: "Technical guidance",
    fullDescription: "Strategic technology consulting to help you make informed decisions. From architecture planning to code reviews and performance optimization, I provide expert guidance to elevate your projects.",
    color: "portfolio-green",
  },
];

const ServicesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Start with middle card active

  const handleCardClick = (clickedIndex: number) => {
    setActiveIndex(clickedIndex);
  };

  const getCardPosition = (index: number) => {
    const diff = index - activeIndex;
    const totalCards = services.length;
    
    // Calculate position in circular manner
    let position = diff;
    if (Math.abs(diff) > totalCards / 2) {
      position = diff > 0 ? diff - totalCards : diff + totalCards;
    }
    
    return position;
  };

  const getCardStyle = (index: number) => {
    const position = getCardPosition(index);
    const isActive = position === 0;
    const isAdjacent = Math.abs(position) === 1;
    
    // Base spacing between cards
    const spacing = 190;
    const translateX = position * spacing;
    
    // Scale and opacity based on position
    const scale = isActive ? 1 : 0.85;
    const opacity = Math.abs(position) > 2 ? 0 : 1;
    
    // Height based on position
    const baseHeight = 384;
    const height = isActive ? 480 : isAdjacent ? 440 : baseHeight;
    
    // Adjust vertical position to grow from top (keep bottom aligned)
    const translateY = isActive ? -96 : isAdjacent ? -56 : 0;
    
    // Z-index: center card highest, then decrease as we go to sides
    const zIndex = 10 - Math.abs(position);
    
    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
      opacity,
      zIndex,
      height: `${height}px`,
    };
  };

  return (
    <div className="w-full py-10 px-4 overflow-hidden">
      <div className="max-w-7xl">
        
        <div className="relative h-[40vw] flex items-center justify-center">
          <div className="relative w-full max-w-4xl flex items-center justify-center">
            {services.map((service, index) => {
              const position = getCardPosition(index);
              const isActive = position === 0;
              
              return (
                <div
                  key={service.id}
                  className={cn(
                    "absolute w-64 rounded-3xl p-6 cursor-pointer transition-all duration-700 ease-out flex flex-col bg-card border border-border bg-white text-black",
                    isActive ? "shadow-2xl" : "shadow-lg hover:shadow-xl"
                  )}
                  style={getCardStyle(index)}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="flex flex-col h-full">
                    <h3 className={cn(
                      "font-bold mb-3 transition-all duration-300 text-black",
                      isActive ? "text-2xl" : "text-xl"
                    )}>
                      {service.title}
                    </h3>
                    
                    <div className="overflow-hidden transition-all duration-500 text-black/80">
                      {isActive ? (
                        <div className="space-y-4 animate-fade-in">
                          <p className="text-sm leading-relaxed">
                            {service.fullDescription}
                          </p>
                          <div className="flex items-center gap-2 pt-4">
                            <div className="w-2 h-2 rounded-full bg-black" />
                            <span className="text-xs font-medium uppercase tracking-wider">
                              Learn More
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-black">
                          {service.shortDescription}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Navigation dots */}
        <div className="flex justify-center gap-2 -mt-[7vw]">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                activeIndex === index 
                  ? "bg-black w-8" 
                  : "bg-black/40 hover:bg-muted-black/50"
              )}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesCarousel;
