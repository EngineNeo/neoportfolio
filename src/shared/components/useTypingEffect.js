// useTypingEffect.js
import { useState, useEffect } from "react";

export const useTypingEffect = (text, writeSpeed = 60, startTyping = true) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!startTyping) return;

    const timeoutId = setTimeout(() => {
      if (index < text.length) {
        setDisplayedText((prevText) => prevText + text.charAt(index));
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        setIsTyping(false);
      }
    }, writeSpeed);

    return () => clearTimeout(timeoutId);
  }, [text, index, writeSpeed, startTyping]);

  return [displayedText, isTyping];
};
