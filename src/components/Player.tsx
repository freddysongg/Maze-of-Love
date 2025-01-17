import React, { useEffect, useState } from 'react';

interface PlayerProps {
  position: [number, number];
  isMoving: boolean;
}

const Player: React.FC<PlayerProps> = ({ position, isMoving }) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isMoving) {
      interval = setInterval(() => {
        setFrame((current) => (current + 1) % 24);
      }, 50);
    } else {
      setFrame(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMoving]);

  return (
    <div
      className="absolute transition-all duration-200"
      style={{
        top: `${position[0] * 48}px`,
        left: `${position[1] * 48}px`,
        width: '48px',
        height: '48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Shadow */}
      <div
        style={{
          position: 'absolute',
          top: '42px',
          left: '26px',
          width: '48px',
          height: '23px',
          imageRendering: 'pixelated',
          backgroundImage: `url('../../assets/shadow.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          zIndex: 1
        }}
      />

      {/* Dino Sprite */}
      <div
        style={{
          position: 'absolute',
          top: '15px',
          left: '15px',
          width: '48px',
          height: '48px',
          imageRendering: 'pixelated',
          backgroundImage: `url('../../assets/dino.png')`,
          backgroundPosition: `${-48 * frame}px 0`,
          backgroundSize: 'auto 100%',
          backgroundRepeat: 'no-repeat',
          zIndex: 2
        }}
      />
    </div>
  );
};

export default Player;
