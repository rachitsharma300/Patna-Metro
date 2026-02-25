import React from 'react';
import { motion } from 'framer-motion';

const RenderEngine = ({ xOffset, isBack = false }) => {
    const transform = `translate(${xOffset}, 0) ${isBack ? 'scale(-1, 1) translate(-170, 0)' : ''}`;

    return (
        <g transform={transform}>
            {/* Base Shape (Warm Beige) */}
            <path d="M 20 50 Q 5 50 5 30 Q 5 10 20 10 L 170 10 L 170 50 Z" fill="#E6A15C" />

            {/* Maroon Upper Stripe */}
            <path d="M 20 10 L 170 10 L 170 24 L 8 24 Q 4 15 20 10 Z" fill="#8B1E2D" />

            {/* Dark Charcoal Front Cabin */}
            <path d="M 20 50 Q 5 50 5 30 Q 5 10 20 10 L 45 10 L 35 50 Z" fill="#2C2C2C" />

            {/* Front Windshield */}
            <path d="M 15 30 Q 10 20 20 12 L 35 12 L 28 30 Z" fill="#1A1A1A" />

            {/* Roof line */}
            <rect x="20" y="6" width="150" height="4" rx="2" fill="#BDBDBD" />
            {/* Undercarriage dark trim */}
            <rect x="15" y="47" width="155" height="3" fill="#424242" />

            {/* Headlight */}
            <circle cx="10" cy="40" r="2" fill="#FFFFCC" />
            <path d="M 8 40 L 0 35 L 0 45 Z" fill="#FFFFCC" opacity="0.4" />

            {/* Patna Metro Text Highlight */}
            <text
                transform={isBack ? "scale(-1, 1)" : ""}
                x={isBack ? "-105" : "105"}
                y="19"
                fill="#FFFFFF"
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle"
                style={{ fontFamily: 'Arial, sans-serif' }}
            >
                PATNA METRO
            </text>

            {/* Windows */}
            <rect x="55" y="24" width="22" height="14" rx="2" fill="#1A1A1A" />
            <rect x="100" y="24" width="22" height="14" rx="2" fill="#1A1A1A" />
            <rect x="145" y="24" width="20" height="14" rx="2" fill="#1A1A1A" />

            {/* Door 1 */}
            <rect x="82" y="20" width="14" height="27" rx="1" fill="#C4C4C4" />
            <line x1="89" y1="20" x2="89" y2="47" stroke="#333" strokeWidth="0.5" />
            <rect x="83.5" y="24" width="4.5" height="12" rx="0.5" fill="#1A1A1A" />
            <rect x="90" y="24" width="4.5" height="12" rx="0.5" fill="#1A1A1A" />

            {/* Door 2 */}
            <rect x="127" y="20" width="14" height="27" rx="1" fill="#C4C4C4" />
            <line x1="134" y1="20" x2="134" y2="47" stroke="#333" strokeWidth="0.5" />
            <rect x="128.5" y="24" width="4.5" height="12" rx="0.5" fill="#1A1A1A" />
            <rect x="135" y="24" width="4.5" height="12" rx="0.5" fill="#1A1A1A" />

            {/* Texture / Patterns */}
            <path d="M 50 45 L 60 45 L 55 35 Z" fill="#8B1E2D" opacity="0.3" />
            <path d="M 60 45 L 70 45 L 65 35 Z" fill="#FFFFFF" opacity="0.4" />

            {/* Wheels */}
            <circle cx="50" cy="55" r="5" fill="#333333" />
            <circle cx="50" cy="55" r="2" fill="#777777" />
            <circle cx="70" cy="55" r="5" fill="#333333" />
            <circle cx="70" cy="55" r="2" fill="#777777" />

            <circle cx="130" cy="55" r="5" fill="#333333" />
            <circle cx="130" cy="55" r="2" fill="#777777" />
            <circle cx="150" cy="55" r="5" fill="#333333" />
            <circle cx="150" cy="55" r="2" fill="#777777" />
        </g>
    );
};

const RenderCoach = ({ xOffset }) => {
    return (
        <g transform={`translate(${xOffset}, 0)`}>
            {/* Main Body (Warm Beige) */}
            <rect x="0" y="10" width="170" height="40" fill="#E6A15C" />

            {/* Maroon Stripe */}
            <rect x="0" y="10" width="170" height="14" fill="#8B1E2D" />

            {/* Roof line */}
            <rect x="0" y="6" width="170" height="4" rx="2" fill="#BDBDBD" />
            {/* Undercarriage dark trim */}
            <rect x="0" y="47" width="170" height="3" fill="#424242" />

            {/* Windows */}
            <rect x="15" y="24" width="22" height="14" rx="2" fill="#1A1A1A" />
            <rect x="60" y="24" width="22" height="14" rx="2" fill="#1A1A1A" />
            <rect x="105" y="24" width="22" height="14" rx="2" fill="#1A1A1A" />
            <rect x="150" y="24" width="15" height="14" rx="2" fill="#1A1A1A" />

            {/* Door 1 */}
            <rect x="42" y="20" width="14" height="27" rx="1" fill="#C4C4C4" />
            <line x1="49" y1="20" x2="49" y2="47" stroke="#333" strokeWidth="0.5" />
            <rect x="43.5" y="24" width="4.5" height="12" rx="0.5" fill="#1A1A1A" />
            <rect x="50" y="24" width="4.5" height="12" rx="0.5" fill="#1A1A1A" />

            {/* Door 2 */}
            <rect x="87" y="20" width="14" height="27" rx="1" fill="#C4C4C4" />
            <line x1="94" y1="20" x2="94" y2="47" stroke="#333" strokeWidth="0.5" />
            <rect x="88.5" y="24" width="4.5" height="12" rx="0.5" fill="#1A1A1A" />
            <rect x="95" y="24" width="4.5" height="12" rx="0.5" fill="#1A1A1A" />

            {/* Door 3 */}
            <rect x="132" y="20" width="14" height="27" rx="1" fill="#C4C4C4" />
            <line x1="139" y1="20" x2="139" y2="47" stroke="#333" strokeWidth="0.5" />
            <rect x="133.5" y="24" width="4.5" height="12" rx="0.5" fill="#1A1A1A" />
            <rect x="140" y="24" width="4.5" height="12" rx="0.5" fill="#1A1A1A" />

            {/* Texture / Patterns */}
            <path d="M 20 45 L 30 45 L 25 35 Z" fill="#8B1E2D" opacity="0.3" />
            <path d="M 30 45 L 40 45 L 35 35 Z" fill="#FFFFFF" opacity="0.4" />
            <path d="M 105 45 L 115 45 L 110 35 Z" fill="#8B1E2D" opacity="0.3" />

            {/* Wheels */}
            <circle cx="25" cy="55" r="5" fill="#333333" />
            <circle cx="25" cy="55" r="2" fill="#777777" />
            <circle cx="45" cy="55" r="5" fill="#333333" />
            <circle cx="45" cy="55" r="2" fill="#777777" />

            <circle cx="125" cy="55" r="5" fill="#333333" />
            <circle cx="125" cy="55" r="2" fill="#777777" />
            <circle cx="145" cy="55" r="5" fill="#333333" />
            <circle cx="145" cy="55" r="2" fill="#777777" />
        </g>
    );
};

const RenderConnector = ({ xOffset }) => {
    return (
        <g transform={`translate(${xOffset}, 0)`}>
            <rect x="0" y="25" width="10" height="20" fill="#2C2C2C" />
            <rect x="0" y="20" width="10" height="30" fill="#1A1A1A" opacity="0.8" />
            <line x1="0" y1="40" x2="10" y2="40" stroke="#000" strokeWidth="2" />
            <line x1="0" y1="44" x2="10" y2="44" stroke="#000" strokeWidth="2" />
        </g>
    );
};

const AnimatedMetro = () => {
    return (
        <div className="w-full relative overflow-hidden h-20 flex items-end bg-transparent">
            {/* Animated Train Container */}
            <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-0 w-[800px] h-[70px]"
            >
                <svg width="800" height="70" viewBox="0 0 800 70">
                    <g transform="translate(10, 5)">
                        <RenderEngine xOffset={0} />
                        <RenderConnector xOffset={170} />
                        <RenderCoach xOffset={180} />
                        <RenderConnector xOffset={350} />
                        <RenderCoach xOffset={360} />
                        <RenderConnector xOffset={530} />
                        <RenderEngine xOffset={540} isBack={true} />
                    </g>
                </svg>
            </motion.div>

            {/* Static Track */}
            <div className="w-full h-4 absolute bottom-0 left-0">
                <svg width="100%" height="16" viewBox="0 0 1000 16" preserveAspectRatio="none">
                    <line x1="0" y1="8" x2="1000" y2="8" stroke="#424242" strokeWidth="4" />
                    {Array.from({ length: 50 }).map((_, i) => (
                        <line
                            key={i}
                            x1={i * 20}
                            y1="8"
                            x2={i * 20}
                            y2="16"
                            stroke="#333"
                            strokeWidth="2"
                        />
                    ))}
                </svg>
            </div>
        </div>
    );
};

export default AnimatedMetro;
