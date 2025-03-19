import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransitioningTextProps {
    texts: string[];
    interval?: number;
    className?: string;
}

const TransitioningText: React.FC<TransitioningTextProps> = ({ texts, interval = 4000, className }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, interval);

        return () => clearInterval(timer);
    }, [texts, interval]);



    return (
        <div className="relative text-white font-poppins [font-size:clamp(3rem,18vw,270px)] 2xl:[font-size:clamp(3.5rem,22vw,320px)] font-bold h-[0.9lh] leading-[0.9] -mt-4 -ml-2.5 md:-ml-4 uppercase">
            <AnimatePresence mode="wait">
                <motion.h1
                    animate={{ opacity: 1, y: 0 }}
                    className={className}
                    exit={{ opacity: 0, y: -20 }}
                    initial={{ opacity: 0, y: 20 }}
                    key={currentIndex}
                    transition={{ duration: 0.5 }}
                >
                    {texts[currentIndex]}
                </motion.h1>
            </AnimatePresence>
        </div>
    );
};

export default TransitioningText;