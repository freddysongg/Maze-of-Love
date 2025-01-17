import React from 'react';

interface HeartProps {
  position: [number, number];
  opacity: number;
}

const Heart: React.FC<HeartProps> = ({ position, opacity }) => {
  return (
    <div
      className="absolute transition-all duration-300"
      style={{
        top: `${position[0] * 48 + 28}px`,
        left: `${position[1] * 48 + 28}px`,
        width: '24px',
        height: '24px',
        opacity,
        imageRendering: 'pixelated',
        backgroundImage: `url('../../assets/heart2.png')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        filter: `drop-shadow(0 0 10px rgba(255, 0, 0, ${opacity}))`,
        zIndex: 2
      }}
    />
  );
};

export default Heart;
