'use client'
import React, { useEffect, useRef } from "react";

interface AnimatedFitTextProps {
    containerRef: React.RefObject<HTMLDivElement>;
}
export const AnimatedFitText: React.FC<AnimatedFitTextProps> = ({ containerRef }) => {
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        resizeText();

        window.addEventListener("resize", resizeText);

        return () => {
            window.removeEventListener("resize", resizeText);
        };
    }, []);

    const resizeText = () => {
        const container = containerRef.current;
        const text = textRef.current;

        if (!container || !text) {
            return;
        }

        const containerWidth = container.offsetWidth;
        let min = 1;
        let max = 2500;

        while (min <= max) {
            const mid = Math.floor((min + max) / 2);
            text.style.fontSize = mid + "px";

            if (text.offsetWidth <= containerWidth) {
                min = mid + 1;
            } else {
                max = mid - 1;
            }
        }

        text.style.fontSize = max + "px";
    };

    return (

        <span
            className="absolute bottom-0 left-0 mx-auto whitespace-nowrap text-center font-bold uppercase text-white"
            ref={textRef}
        >
            RYTHM
        </span>

    );
};