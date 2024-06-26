import React, { useState, useEffect, useCallback } from 'react';
import logo from '../../assets';

const About = () => {
  const [logos, setLogos] = useState([]);

  const handleClick = (e) => {
    const newLogo = {
      id: logos.length + 1,
      x: e.clientX - 25,
      y: e.clientY - 25,
      speedX: (Math.random() - 0.5) * 10,
      speedY: (Math.random() - 0.5) * 10,
    };

    setLogos([...logos, newLogo]);
  };

  const moveLogo = useCallback((logo) => {
    let newX = logo.x + logo.speedX;
    let newY = logo.y + logo.speedY;

    if (newX <= 0 || newX >= window.innerWidth - 50) {
      logo.speedX *= -1;
      newX = Math.max(0, Math.min(newX, window.innerWidth - 50));
    }
    if (newY <= 0 || newY >= window.innerHeight - 50) {
      logo.speedY *= -1;
      newY = Math.max(0, Math.min(newY, window.innerHeight - 50));
    }

    return { ...logo, x: newX, y: newY };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLogos((prevLogos) => prevLogos.map(moveLogo));
    }, 16);

    return () => clearInterval(intervalId);
  }, [moveLogo]);

  return (
    <div
      className="min-h-screen w-full bg-black flex items-center justify-center"
      onClick={handleClick}
    >
      {logos.map((img) => (
        <img
          key={img.id}
          src={logo}
          alt="logo"
          width="50px"
          height="50px"
          className="logo absolute"
          style={{ left: img.x, top: img.y }}
        />
      ))}
    </div>
  );
};

export default About;
