'use client'

import React, { useRef, useEffect, useState } from 'react'

interface BackgroundPerLineProps {
    text: string
    backgroundColor?: string
    textColor?: string
    padding?: string
    fontSize?: string
    lineHeight?: string
}

export default function BackgroundPerLine({
    text,
    backgroundColor = 'bg-[#403f3f]',
    textColor = 'text-white',
    padding = ' p-2 md:py-4',
    fontSize = 'text-xl md:text-3xl lg:text-[3.125rem] xl:text-[3.25rem]',
    lineHeight = 'leading-relaxed'
}: BackgroundPerLineProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [lines, setLines] = useState<string[]>([])

    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current
            const words = text.split('/n')
            const computedStyle = window.getComputedStyle(container)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const lineHeightValue = parseFloat(computedStyle.lineHeight)
            const containerWidth = container.offsetWidth

            let currentLine = ''
            let currentLineWidth = 0
            const newLines: string[] = []

            const tempSpan = document.createElement('span')
            tempSpan.style.visibility = 'hidden'
            tempSpan.style.position = 'absolute'
            tempSpan.style.whiteSpace = 'nowrap'
            tempSpan.style.font = computedStyle.font
            container.appendChild(tempSpan)

            words.forEach((word, index) => {
                tempSpan.textContent = word
                const wordWidth = tempSpan.offsetWidth

                if (currentLineWidth + wordWidth <= containerWidth) {
                    currentLine += (currentLine ? ' ' : '') + word
                    currentLineWidth += wordWidth + (currentLine ? tempSpan.offsetWidth : 0)
                } else {
                    if (currentLine) newLines.push(currentLine)
                    currentLine = word
                    currentLineWidth = wordWidth
                }

                if (index === words.length - 1 && currentLine) {
                    newLines.push(currentLine)
                }
            })

            container.removeChild(tempSpan)
            setLines(newLines)
        }
    }, [text])

    return (
        <div
            ref={containerRef}
            className={`inline-block max-md:!max-w-[40ch] !max-w-[35ch] ${fontSize} ${lineHeight} ${textColor}`}
            // style={{ maxWidth: '100%' }}
        >
            {lines.map((line, index) => (
                <span
                    key={index}
                    className={`inline-block ${backgroundColor} ${padding}`}
                    style={{
                        boxDecorationBreak: 'clone',
                        WebkitBoxDecorationBreak: 'clone' as const,
                        marginBottom: '0.25em'
                    }}
                >
                    {line}
                </span>
            ))}
        </div>
    )
}

