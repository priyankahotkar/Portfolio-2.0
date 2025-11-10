import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Layers, Cpu, Server, PenTool as Tool, BarChart, Users } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const skillsData: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: <Code size={24} className="text-primary-500" />,
    skills: ['Java', 'Python', 'C++', 'JavaScript', 'TypeScript'],
  },
  {
    id: 'web',
    title: 'Web Development',
    icon: <Layers size={24} className="text-primary-500" />,
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'HTML', 'CSS', 'Javascript', 'Tailwind CSS'],
  },
  {
    id: 'ai',
    title: 'AI/ML',
    icon: <Cpu size={24} className="text-primary-500" />,
    skills: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning'],
  },
  {
    id: 'backend',
    title: 'Backend & Database',
    icon: <Database size={24} className="text-primary-500" />,
    skills: ['Firebase', 'MongoDB', 'Express', 'Node', 'EJS', 'WebSockets', 'WebRTC', 'MySQL', 'Spring Boot'],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: <Tool size={24} className="text-primary-500" />,
    skills: ['Git', 'GitHub', 'REST APIs', 'Postman', 'Docker', 'CI/CD Pipelines', 'Redis'],
  },
  {
    id: 'os',
    title: 'Operating Systems',
    icon: <Server size={24} className="text-primary-500" />,
    skills: ['Windows', 'Linux (basics)'],
  },
  {
    id: 'concepts',
    title: 'CS Concepts',
    icon: <BarChart size={24} className="text-primary-500" />,
    skills: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Operating Systems', 'Database Management', 'Computer Networks', 'Software Development Life Cycle'],
  },
  {
    id: 'soft',
    title: 'Soft Skills',
    icon: <Users size={24} className="text-primary-500" />,
    skills: ['Team Leadership', 'Communication', 'Problem-Solving', 'Collaboration', 'Consistency', 'Analytical Thinking', 'Discipline'],
  },
];

const Skills = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          subtitle="My technical expertise and professional competencies" 
          align="center"
        >
          Skills & Capabilities
        </SectionTitle>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {skillsData.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/50 mr-3">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {category.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm rounded-full bg-white dark:bg-slate-600 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-500"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;