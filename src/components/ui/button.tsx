import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'standard' | 'outline' | 'danger';
  children: React.ReactNode;
};

const variantClasses = {
  standard: 'btn-standard',
  outline: 'border border-bb-dark bg-transparent text-bb-dark hover:bg-bb-yellow hover:text-bb-dark',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

export const Button = ({ variant = 'standard', className, children, ...props }: ButtonProps) => (
  <button
    className={clsx(variantClasses[variant], className)}
    {...props}
  >
    {children}
  </button>
);

export default Button;
