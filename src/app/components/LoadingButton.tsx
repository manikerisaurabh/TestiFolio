import React from 'react';

interface LoadingButtonProps {
    isLoading: boolean;
    onClick: () => void | null;
    children: React.ReactNode;
    className?: string; // Optional for additional styling
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ isLoading, onClick, children, className }) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className={`
        ${isLoading ? 'bg-gray-400 cursor-not-allowed' : ''}
        ${className}`}
        >
            {isLoading && (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-opacity-50"
                >
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <span className={`${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                {children}
            </span>
        </button>
    );
};

export default LoadingButton;
