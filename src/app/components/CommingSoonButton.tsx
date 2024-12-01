import React from "react";

interface ComingSoonButtonProps {
    text: string; // Text to display on the button
}

const ComingSoonButton: React.FC<ComingSoonButtonProps> = ({ text }) => {
    return (
        <div className="relative group">
            <button
                className="px-4 py-2 bg-slate-700 text-white rounded opacity-50 cursor-not-allowed"
                disabled
            >
                {text}
            </button>
            {/* Tooltip */}
            <span className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Working on it!
            </span>
        </div>
    );
};

export default ComingSoonButton;
