import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, School, Library } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  details: string[];
  icon: React.ReactNode;
}

const educationData: EducationItem[] = [
  {
    id: 'wit',
    institution: 'Walchand Institute of Technology, Solapur',
    degree: 'B.Tech in Computer Science and Engineering',
    duration: '2022–2026',
    details: [
      'Current CGPA: 9.68',
      'Focused on Computer Science fundamentals, Data Structures, Algorithms, and Software Development',
      'Active participation in technical clubs and hackathons'
    ],
    icon: <GraduationCap size={24} className="text-primary-500" />,
  },
  {
    id: 'wcas',
    institution: 'Walchand College of Arts and Science',
    degree: '12th Board (HSC)',
    duration: '2020–2022',
    details: [
      'HSC Percentage: 88.33%',
      'JEE Advanced Rank(AIR): 18K',
      'JEE Advanced Rank(Category): 637',
      'JEE Mains: 97.17%ile',
      'JEE Mains Rank(AIR): 25K',
      'JEE Mains Rank(Category): 747',
      'MHT-CET: 99.66%ile'
    ],
    icon: <School size={24} className="text-primary-500" />,
  },
  {
    id: 'mes',
    institution: 'Mahesh English School, Solapur',
    degree: 'SSC (10th Board)',
    duration: '2019–2020',
    details: [
      'Score: 95%',
      'Strong foundation in Mathematics and Science',
      'Participated in various academic competitions'
    ],
    icon: <Library size={24} className="text-primary-500" />,
  },
];

const Education = () => {
  const [selectedId, setSelectedId] = useState('wit');
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <section id="education" className="py-20 bg-white dark:bg-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="My academic journey and qualifications">
          Education
        </SectionTitle>
        
        <motion.div 
          ref={ref}
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {/* Education List */}
          <div className="md:col-span-1">
            <ul className="space-y-2">
              {educationData.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedId === item.id
                        ? 'bg-primary-50 dark:bg-primary-900/30 border-l-4 border-primary-500'
                        : 'bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/70'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className={`font-medium ${
                          selectedId === item.id 
                            ? 'text-primary-700 dark:text-primary-400' 
                            : 'text-slate-900 dark:text-white'
                        }`}>
                          {item.institution}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {item.duration}
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Education Details */}
          <div className="md:col-span-2">
            {educationData.map((item) => (
              <motion.div
                key={item.id}
                className={`bg-white dark:bg-slate-700 rounded-xl shadow-md p-6 h-full ${
                  selectedId === item.id ? 'block' : 'hidden'
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-2">
                  {item.degree}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-4">
                  {item.institution} | {item.duration}
                </p>
                <ul className="space-y-3 mt-4">
                  {item.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 mr-2"></span>
                      <span className="text-slate-700 dark:text-slate-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;