import React from 'react'

import { cn } from '@/lib/utils'  

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './tooltip'


interface ToolTipProps {
    content: string | React.ReactNode
    align?: "center" | "start" | "end"
    className?: string
    children: React.ReactNode
    contentClass?: string
    asChild?: boolean
}

const InfoToolTip: React.FC<ToolTipProps> = ({ content, children, className, align, contentClass, asChild = false }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className={className} asChild={asChild} type='button'>
                    {children}
                </TooltipTrigger>
                <TooltipContent align={align} className={cn(contentClass,"bg-black text-white")}>
                    {content}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
export default InfoToolTip