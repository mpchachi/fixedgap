import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'secondary-white' | 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  href?: string;
  asChild?: boolean;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'default', href, onClick, asChild = false, className = '', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-[-0.01em] transition-all duration-200 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]';

    const variants = {
      primary: 'bg-brand-blue text-white shadow-[0_1px_2px_rgba(18,22,43,0.12),0_8px_20px_rgba(31,76,156,0.28)] hover:bg-brand-blue-strong hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(18,22,43,0.14),0_14px_28px_rgba(31,76,156,0.32)]',
      secondary: 'border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white',
      'secondary-white': 'border border-white/70 text-white backdrop-blur-sm hover:bg-white hover:text-brand-navy',
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    };

    const sizes = {
      default: 'px-6 py-3 text-[15px]',
      sm: 'px-4 py-2 text-sm',
      lg: 'px-8 py-4 text-base',
    };

    const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

    if (asChild) {
      return <Slot className={classes}>{children}</Slot>;
    }

    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <button onClick={onClick} className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  }
)

Button.displayName = "Button"

export default Button
export { Button }
