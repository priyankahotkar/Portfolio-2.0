interface TechBadgeProps {
  tech: string;
}

const TechBadge = ({ tech }: TechBadgeProps) => {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300">
      {tech}
    </span>
  );
};

export default TechBadge;