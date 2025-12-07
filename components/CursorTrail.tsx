import React, { useState, useEffect } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

const CursorTrail: React.FC = () => {
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 vim-cursor"
      style={{
        left: cursorPos.x,
        top: cursorPos.y,
      }}
    />
  );
};

export default CursorTrail;
