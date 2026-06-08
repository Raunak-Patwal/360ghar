import { useState, useEffect } from 'react';

export default function TypewriterText({ text, speed = 30, className = '' }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    
    // Add a slight delay before starting to type to make it feel natural
    const startTimeout = setTimeout(() => {
      const intervalId = setInterval(() => {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
        if (i >= text.length) {
          clearInterval(intervalId);
          setIsTyping(false);
        }
      }, speed);
      
      return () => clearInterval(intervalId);
    }, 400);

    return () => clearTimeout(startTimeout);
  }, [text, speed]);

  return (
    <div className={`typewriter-container ${className}`}>
      <span>{displayedText}</span>
      {isTyping && <span className="typewriter-cursor">|</span>}
    </div>
  );
}
