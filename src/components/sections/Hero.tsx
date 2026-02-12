import { ChevronDown, FileText, Mail, FolderKanban } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-0 w-1/3 h-1/3 bg-primary-100 dark:bg-primary-900/20 rounded-full filter blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-10 w-1/4 h-1/4 bg-secondary-100 dark:bg-secondary-900/20 rounded-full filter blur-3xl opacity-60"></div>
        <div className="absolute top-1/3 left-1/3 w-1/5 h-1/5 bg-accent-100 dark:bg-accent-900/20 rounded-full filter blur-3xl opacity-50"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-slate-900 dark:text-white leading-tight">
              <span className="block">Hi, I'm</span>
              <span className="text-primary-600 dark:text-primary-400">Priyanka Hotkar</span>
            </h1>
            
            <p className="mt-4 text-xl sm:text-2xl font-medium text-slate-700 dark:text-slate-300">
              Driven CSE undergrad | Full Stack Developer | AI/ML Enthusiast | 1400+ Leetcode Problems | Leetcode contest rating 1758(max) | Newbie @CodeForces
            </p>
            
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              I'm a passionate problem solver skilled in Java, Python, DSA, and full-stack development, 
              driven to build impactful AI-based and web-based solutions.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
            <Button 
  href={`${import.meta.env.BASE_URL}FinalResume2.pdf`} 
  icon={<FileText size={18} />}
  size="lg"
  external
>
  View Resume
</Button>

              <Button 
                href="#contact" 
                variant="outline" 
                icon={<Mail size={18} />}
                size="lg"
              >
                Contact Me
              </Button>
              
              <Button 
                href="#projects" 
                variant="ghost" 
                icon={<FolderKanban size={18} />}
                size="lg"
              >
                Explore Projects
              </Button>
            </div>
          </motion.div>
          
          {/* Profile Image */}
          <motion.div 
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg">
                <img 
                  src={`${import.meta.env.BASE_URL}Myself.jpg`} 
                  alt="Profile Photo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 rounded-full px-4 py-2 shadow-md">
                <span className="text-primary-600 dark:text-primary-400 font-medium">9.65 CGPA</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <a href="#education" aria-label="Scroll down">
            <ChevronDown className="w-10 h-10 text-primary-600 dark:text-primary-400" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;