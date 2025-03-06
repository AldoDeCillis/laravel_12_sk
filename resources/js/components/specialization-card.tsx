import React from 'react';

interface SpecializationCardProps {
    description: string;
    icon: string;
    title: string;
}

const SpecializationCard: React.FC<SpecializationCardProps> = ({ description, icon, title }): React.ReactElement => {
    return (
        <div className="group border-secondary-500 flex flex-col items-center justify-between border-b-2 bg-white p-6 shadow-lg transition-shadow duration-200 hover:shadow-xl">
            <div className="group-hover:border-secondary-500 mb-4 border-2 border-transparent transition-all duration-200">
                <i className={`fa-regular ${icon} text-primary-600 p-2 text-4xl sm:text-5xl md:text-6xl`}></i>
            </div>
            <div className="flex flex-auto flex-col text-center">
                <h4 className="text-primary-600 mb-2 text-base font-bold sm:text-lg">{title}</h4>
                <p className="mb-4 text-sm text-gray-600 sm:text-base">{description}</p>
            </div>
            <a className="text-primary-600 hover:text-secondary-500 flex w-full cursor-pointer items-center justify-center font-semibold transition-colors duration-200">
                Scopri di più
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
            </a>
        </div>
    );
};

export default SpecializationCard;
