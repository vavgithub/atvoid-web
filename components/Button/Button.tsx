import React, { forwardRef } from 'react';


type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'danger'
  | 'default';

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  className?: string;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    type = 'button',
    variant = 'primary',
    className = '',
    icon,
    iconPosition = 'left',
    iconSize = 18,
    ...props
  },
  ref
) {
  const baseClasses =
    'h-11 rounded-lg font-semibold text-base cursor-pointer px-4 py-4 flex items-center justify-center';

  const variantClasses = {
    primary: 'button-primary',
    secondary: 'button-secondary',
    tertiary: 'button-tertiary',
    error: 'button-error',
    danger: 'button-danger',
    default: 'border-0 bg-transparent text-text-primary !h-fit !p-0',
  };

  const combinedClassName = [
    baseClasses,
    children && icon ? 'gap-2' : '',
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderIcon = () => {
    if (!icon) return null;

    // Check if icon is already a rendered React element
    if (React.isValidElement(icon)) {
      return (
        <span
          className={
            'flex-shrink-0 flex items-center justify-center ' +
            (variant === 'error' ? 'text-error-900' : '')
          }
        >
          {icon}
        </span>
      );
    }

    return (
      <span
        className={
          'flex-shrink-0 flex items-center justify-center ' +
          (variant === 'error' ? 'text-error-900' : '')
        }
      >
        {icon}
      </span>
    );
  };

  return (
    <button ref={ref} type={type} className={combinedClassName} {...props}>
      {iconPosition === 'left' && renderIcon()}
      {children && <span>{children}</span>}
      {iconPosition === 'right' && renderIcon()}
    </button>
  );
});

export default Button;
