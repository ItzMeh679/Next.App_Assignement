import { useState, useEffect } from 'react';

const TypewriterText = ({ text, delay = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span>{displayText}</span>;
};

const SharinganBackground = ({ isActive }) => {
  if (!isActive) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-0">
      <div className="relative w-[800px] h-[800px] animate-spin-slow">
        <div className="absolute inset-0 bg-red-900/20 rounded-full animate-pulse">
          <div className="absolute w-full h-full rounded-full border-4 border-red-500/40" />
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-16 bg-red-500/40 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 120}deg) translateY(-200px)`,
                transformOrigin: 'bottom center',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

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
      className="fixed w-[200px] h-[200px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: 'radial-gradient(circle, rgba(255, 140, 0, 0.15) 0%, transparent 70%)',
        borderRadius: '50%'
      }}
    />
  );
};

const EnhancedPortfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [sharinganActive, setSharinganActive] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleButtonClick = () => {
    setButtonClicked(true);
    setSharinganActive(true);
    setTimeout(() => {
      window.location.href = '/counter';
    }, 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1b1b1b]">
      <CursorGlow />
      <SharinganBackground isActive={sharinganActive} />

      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#1b1b1b] to-[#2c2c2c] opacity-90">
        <div className="absolute inset-0 bg-[url('/9.png')] bg-center bg-cover bg-no-repeat mix-blend-soft-light filter brightness-95 contrast-105 blur-sm animate-pulse" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-white">
        {/* Header with enhanced animations */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
          <h1 
            className="text-6xl font-bold mb-4 hover:scale-110 transition-transform duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent animate-gradient-x hover:animate-pulse">
              Manan Shah
            </span>
          </h1>
          
          <h2 className="text-4xl font-semibold mb-8">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              <TypewriterText text="EzEx Developer" />
            </span>
          </h2>
        </div>

        {/* Introduction with fade-in */}
        <div className={`max-w-2xl text-center mb-12 space-y-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <p className="text-xl leading-relaxed hover:text-orange-300 transition-colors duration-300">
            <TypewriterText 
              text="Hey there! I'm a 19-year-old tech enthusiast pursuing B.Tech in Artificial Intelligence and Machine Learning. Currently working as a Tournament Organizer at BCG, managing Valorant tournaments with passion and precision." 
              delay={20}
            />
          </p>
        </div>

        {/* Tech stack with hover effects */}
        <div className={`mb-12 text-center transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h3 className="text-2xl font-semibold mb-4 text-orange-400 animate-bounce">Built With</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'Next.js', 'Tailwind CSS', 'JavaScript'].map((tech, index) => (
              <span 
                key={tech}
                className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full text-sm font-medium shadow-lg hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Enhanced Sharingan button */}
        <button 
          onClick={handleButtonClick}
          disabled={buttonClicked}
          className={`group relative px-8 py-4 bg-red-900/80 rounded-lg overflow-hidden transition-all duration-300 hover:bg-red-800/80 hover:shadow-lg hover:shadow-red-500/20 ${
            buttonClicked ? 'scale-150 opacity-0' : ''
          }`}
        >
          {/* Sharingan Animation */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 rounded-full border-2 border-red-500 animate-spin">
              <div className="w-2 h-2 bg-red-500 rounded-full absolute top-1 left-1/2 -translate-x-1/2 transform origin-bottom rotate-0 animate-pulse" />
              <div className="w-2 h-2 bg-red-500 rounded-full absolute bottom-1 right-1 transform origin-top-left rotate-0 animate-pulse" />
              <div className="w-2 h-2 bg-red-500 rounded-full absolute bottom-1 left-1 transform origin-top-right rotate-0 animate-pulse" />
            </div>
          </div>
          
          <span className="relative z-10 text-lg font-semibold text-white group-hover:text-red-200 transition-colors duration-300">
            Wake Up To Reality
          </span>

          {/* Button glow effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-500 via-red-600 to-red-500 opacity-0 group-hover:opacity-30 animate-gradient-x transition-opacity duration-300" />
        </button>
      </div>
    </div>
  );
};

export default EnhancedPortfolio;