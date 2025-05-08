import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: ReactNode;
  external?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  className = '',
  icon,
  external = false,
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500';
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 border border-transparent',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 border border-transparent',
    outline: 'bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900',
    ghost: 'bg-transparent text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 border border-transparent',
  };
  
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-5 py-2.5',
    lg: 'text-lg px-6 py-3',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  if (href) {
    return (
      <a 
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </a>
    );
  }
  
  return (
    <button 
      type={type} 
      className={classes} 
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;