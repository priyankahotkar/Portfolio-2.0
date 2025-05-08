import { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionTitle = ({ 
  children, 
  subtitle, 
  align = 'left' 
}: SectionTitleProps) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`mb-12 ${alignmentClasses[align]}`}>
      <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
        {children}
      </h2>
      {subtitle && (
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`h-1 w-20 bg-primary-500 mt-4 rounded ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`}></div>
    </div>
  );
};

export default SectionTitle;