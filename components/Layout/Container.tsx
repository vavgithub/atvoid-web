import React from 'react'

type ContainerVariant = 'xtraLarge' | 'semilarge' | 'large' | 'medium' | 'small' | 'xsmall' | 'xxSmall';
type ContainerProps = {
  children: React.ReactNode;
  variant?: ContainerVariant;
  className?: string;
  hideFooter?: boolean;
};

function Container({children,variant = 'large', className = '', hideFooter = false,...props }: ContainerProps & React.HTMLAttributes<HTMLDivElement>) {

    const baseClasses = 'w-full mx-auto min-h-screen flex flex-col justify-between'

    const variants = {
        xtraLarge: 'max-w-[1920px]',
        semilarge : 'max-w-[1660px]',
        large: 'max-w-[1344px]',
        medium: 'max-w-[1280px]',
        small: 'max-w-[1090px]',
        xsmall: 'max-w-[768px]',
        xxSmall: 'max-w-[576px]',
    }


    const finalVariant = variants[variant] || variants.small
    const finalClassName = `${baseClasses} ${finalVariant} ${className}`
  return (
    <main className={finalClassName} {...props}>
      <div>
      {children}
      </div>
    </main>
  )
}

export default Container
