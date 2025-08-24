import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

const experienceData: ExperienceItem[] = [
  {
    id: 1,
    title: 'SDE Intern',
    company: 'SuccessMagnet',
    location: 'Remote',
    period: 'June 2025 – July 2025',
    description: [
      'Worked on improving company website and user experience',
      'Optimizing web performance and ensuring cross-device compatibility'
    ],
  },
  {
    id: 2,
    title: 'Web Development Intern',
    company: 'Jabsz Gaming Studios LLP',
    location: 'Remote',
    period: 'April 2025 – July 2025',
    description: [
      'Built an e-commerce gaming platform using React, TypeScript, Tailwind, and Firebase',
      'Contributed to website development, internal portals, and game pages',
      'Collaborated with team members to improve user experience and implement new features',
      'Completed the whole agile dev cycle right from prototyping, developing and various kinds of testing',
      'Worked on a client project using Appsheet'
    ],
  },
  {
    id: 3,
    title: 'AI/ML Intern',
    company: 'UptoSkills',
    location: 'Remote',
    period: 'Jan 2025 – April 2025',
    description: [
      'Developed an AI-based proctoring system using Python, OpenCV, and JavaScript',
      'Achieved 20% improvement in detection accuracy through algorithm optimization',
      'Built responsive UI with HTML/CSS/JS, improving user engagement by 30%',
      'Collaborated with a team of 5 developers to implement and test new features'
    ],
  },
  {
    id: 4,
    title: 'Extracurriculars',
    company: 'University Clubs & Activities',
    location: 'Walchand Institute of Technology',
    period: '2022 – Present',
    description: [
      'Active member of ISTE (Indian Society for Technical Education) student chapter',
      'Volunteer at NSS (National Service Scheme) for community service activities',
      'Member of LOL (Learn Out Loud) club focusing on public speaking and soft skills',
      'Skilled in team coordination and event management through various club activities'
    ],
  },
];

const Experience = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="experience" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="My professional journey and work experience">
          Experience
        </SectionTitle>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {experienceData.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group relative"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Timeline marker (only visible on md and up) */}
                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
                <div className="hidden md:flex flex-col items-center w-12">
                  <div className="w-4 h-4 rounded-full bg-primary-500 ring-4 ring-white dark:ring-slate-800 z-10"></div>
                  <div className="w-0.5 flex-grow bg-slate-200 dark:bg-slate-700"></div>
                </div>

                {/* Content */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 md:ml-8 flex-1 transition-all duration-200 hover:shadow-lg group-hover:scale-[1.01] transform">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <div className="flex items-center text-sm text-primary-600 dark:text-primary-400 font-medium mt-2 sm:mt-0">
                      <Briefcase size={16} className="mr-1" />
                      {item.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1 text-slate-400 dark:text-slate-500" />
                      {item.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1 text-slate-400 dark:text-slate-500" />
                      {item.period}
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {item.description.map((desc, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 mr-2"></span>
                        <span className="text-slate-700 dark:text-slate-300">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;