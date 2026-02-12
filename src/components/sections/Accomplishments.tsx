import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Code, Users, Award, Zap, GitBranch, Star } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

interface Accomplishment {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const accomplishmentsData: Accomplishment[] = [
  {
    id: 'leetcode',
    title: '1400+ DSA Problems',
    description: 'Solved over 1400 coding challenges on LeetCode, demonstrating strong problem-solving and algorithmic skills. Solving more on Gfg and Codeforces',
    icon: <Code size={24} className="text-yellow-500" />,
  },
  {
    id: 'sih',
    title: 'SIH 2024 Team Leader',
    description: 'Led a team in Smart India Hackathon 2024, developing a Traffic Lights Automation System with AI-based vehicle detection.',
    icon: <Users size={24} className="text-green-500" />,
  },
  {
    id: 'orchathon',
    title: 'Orchathon 2025 Finalist',
    description: 'Reached the finals of Orchathon 2025 with MentorConnect, a platform connecting mentors and mentees with scheduling and video conferencing.',
    icon: <Trophy size={24} className="text-primary-500" />,
  },
  {
    id: 'hackathon',
    title: 'Outlier Virtual Hackathon 2025',
    description: 'Participated in the Outlier Virtual Hackathon 2025, building innovative solutions under time constraints.',
    icon: <Zap size={24} className="text-purple-500" />,
  },
  {
    id: 'dsa',
    title: 'DSA Contest Participant',
    description: 'Ranked in the top 9% globally with a peak rating of 1758 in Leetcode Contests, secured Rank 1706 / 30,706 in LeetCode Weekly Contest 482, and achieved a Top 20 rank in Unstop contests. Advanced to the final round, placing among the Top 10 students out of 300 participants across Solapur in COD-A-THON, organized by Savali and Eshwar Foundation.',
    icon: <Award size={24} className="text-accent-500" />,
  },
  {
    id: 'team-leader',
    title: 'Team Leader in College Projects',
    description: 'Led various college-level project teams and actively participated in events, showcasing leadership and collaboration skills.',
    icon: <Users size={24} className="text-blue-500" />,
  },
  {
    id: 'open-source',
    title: 'Open Source Contributions',
    description: 'Contributed to HashSlap Summer of Code 2025, HacktoberFest 2025, and actively collaborated on personal projects including DSA Mastery and Design Nova. Dedicated to advancing open source initiatives and community-driven development.',
    icon: <GitBranch size={24} className="text-orange-500" />,
  },
  {
    id: 'github-stats',
    title: 'GitHub Stats: B Grade',
    description: 'Achieved B Grade on GitHub Stats, reflecting consistent contributions, repository quality, and active participation in the developer community.',
    icon: <Star size={24} className="text-indigo-500" />,
  },
];

const Accomplishments = () => {
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
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="accomplishments" className="py-20 bg-white dark:bg-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          subtitle="Key achievements and recognition in my development journey" 
          align="center"
        >
          Accomplishments
        </SectionTitle>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {accomplishmentsData.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-700"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm">
                {item.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-center text-slate-900 dark:text-white mb-3">
                {item.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 text-center">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Accomplishments;