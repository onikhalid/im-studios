import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
import Link, { LinkProps } from 'next/link';

import { buttonVariants } from '.';
import { cn } from '@/lib/utils';


type NextLinkProps = Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof LinkProps
> &
    LinkProps & {
        children?: React.ReactNode;
        icon?: React.ReactNode;
    } & React.RefAttributes<HTMLAnchorElement>;



export interface LinkButtonProps
    extends NextLinkProps,
    VariantProps<typeof buttonVariants> {
    icon?: React.ReactNode;
    iconPosition?: "before" | "after"
    justify?: string
}

const iconvar = {
    '': 'bg-primary',
    default: 'bg-primary ',
    destructive: '',
    outline: '',
    secondary: '',
    ghost: '',
    link: '',
    outlined: 'bg-transparent',
    unstyled: '',
    cta: '',
    reverse_cta:''
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
    ({ className, variant, size, icon, iconPosition = "before", href, justify, ...props }, ref) => {
        return (
            <Link
                href={href}
                {...props}
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
            >
                <div className={cn("flex items-center gap-2 w-full h-full", justify ? justify : "justify-center")}>
                    {icon && iconPosition === "before" && <span className={cn(iconvar[variant!], 'flex items-center justify-center rounded-[0.4rem]')} >{icon}</span>}
                    {props.children}
                    {icon && iconPosition === "after" && <span className={cn(iconvar[variant!], 'flex items-center justify-center rounded-[0.4rem]')} >{icon}</span>}

                </div>
            </Link>
        );
    }
);
LinkButton.displayName = 'LinkButton';

export default LinkButton;