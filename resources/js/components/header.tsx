import React from 'react';

interface HeaderProps {
    bgImage: string;
    children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ bgImage, children }) => {
    return (
        <div
            className="relative"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex items-center justify-center px-6 py-20 sm:px-12">{children}</div>
        </div>
    );
};

export default Header;
