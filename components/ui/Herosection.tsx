'use client'
import React, { useState, useEffect } from 'react';
import { Code, Database, Server } from 'lucide-react';

const HeroSection = () => {
  const [terminalText, setTerminalText] = useState('');
  const fullText = '\> Welcome to my portfolion \n> Exploring backend magic...\n> npm install awesome-dev';
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTerminalText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length) clearInterval(timer);
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const handleServerClick = () => {
    setShowEasterEgg(!showEasterEgg);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen flex flex-col justify-center items-center p-4 overflow-y-hidden">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Backend Wizard & Code Conjurer</h1>
        <p className="text-xl md:text-2xl mb-8">Turning coffee into scalable systems since {"[2021]"}</p>
        
        <div className="bg-black p-4 rounded-lg mb-8 font-mono text-green-400">
          <pre>{terminalText}</pre>
          <span className="animate-pulse">_</span>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center bg-gray-700 p-3 rounded-full">
            <Code className="mr-2" /> Frontend
          </div>
          <div className="flex items-center bg-gray-700 p-3 rounded-full">
            <Database className="mr-2" /> Database
          </div>
          <div 
            className="flex items-center bg-gray-700 p-3 rounded-full cursor-pointer hover:bg-gray-600 transition-colors"
            onClick={handleServerClick}
          >
            <Server className="mr-2" /> Backend
          </div>
        </div>

        {showEasterEgg && (
          <div className="bg-gray-700 p-4 rounded-lg animate-fadeIn">
            <h3 className="text-xl font-semibold mb-2">Backend Easter Egg!</h3>
            <p>🐰 Congratulations! You've discovered the hidden backend realm. Here's a sneak peek of my backend skills:</p>
            <ul className="list-disc list-inside mt-2">
              <li>RESTful API design</li>
              <li>Database optimization</li>
              <li>Microservices architecture</li>
              <li>CI/CD pipeline maestro</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;