import React from 'react';

interface LogoCarouselProps {
    customerLogos: string[];
}

const LogoCarousel: React.FC<LogoCarouselProps> = ({ customerLogos }) => {
    return (
        <div className="overflow-hidden bg-white py-12">
            <div className="mx-0 w-full px-0">
                <div className="relative overflow-hidden whitespace-nowrap">
                    <div className="animate-scroll inline-flex space-x-12">
                        {customerLogos.map((logo, index) => (
                            <div key={index} className="flex-shrink-0">
                                <img
                                    alt={logo}
                                    className="h-24 object-contain p-4 grayscale filter transition-all duration-300 hover:scale-105 hover:grayscale-0"
                                    src={logo}
                                />
                            </div>
                        ))}
                        {/* Duplicazione per loop infinito */}
                        {customerLogos.map((logo, index) => (
                            <div key={index + customerLogos.length} className="flex-shrink-0">
                                <img
                                    alt={logo}
                                    className="h-24 object-contain p-4 grayscale filter transition-all duration-300 hover:scale-105 hover:grayscale-0"
                                    src={logo}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoCarousel;
