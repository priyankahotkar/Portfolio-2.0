import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import TechBadge from '../ui/TechBadge';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  demo?: string;
  featured: boolean;
}

const projectsData: Project[] = [
  {
    id: 'traffic-lights',
    title: 'Traffic Lights Automation System',
    description: 'Smart traffic system that reduced congestion by 25% using real-time AI and hardware coordination. Accuracy over 80%.',
    image: 'https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg?cs=srgb&dl=pexels-pixabay-210182.jpg&fm=jpg',
    tech: ['Python', 'OpenCV', 'Yolo', 'ESP32', 'Raspberry Pi'],
    github: 'https://github.com/SAMKIT-CHOPDA/SIH',
    demo: 'https://drive.google.com/file/d/10y4O3v_hkpO9UXrEuGUjy_LbNhyHB4bz/view?usp=sharing',
    featured: true,
  },
  {
    id: 'mentor-connect',
    title: 'MentorConnect Platform',
    description: 'A mentorship platform with scheduling, video conferencing, chat, FAQ, and discussion forums. Finalist at Orchathon hackathon.',
    image: 'https://images.pexels.com/photos/7437489/pexels-photo-7437489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tech: ['MERN Stack', 'Google Calendar API', 'Jitsi Meet', 'Firebase'],
    github: 'https://github.com/priyankahotkar/mentorconnect',
    demo: 'https://mentorconnect-fd483.web.app',
    featured: true,
  },
  {
    id: 'calendar',
    title: 'FullCalenderNextVersion',
    description: 'A calendar app clone supporting real-time events, scheduling, push notifications, and video calls.',
    image: 'https://www.lifewire.com/thmb/rEjebep0JHTFDN_53tkV-3ZSYjQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/free-online-calendars-1357935-41eafe4b4d484e6f8f7593cd5514e071.png',
    tech: ['Firebase', 'Jitsi', 'JavaScript', 'HTML/CSS'],
    github: 'https://github.com/priyankahotkar/fullcalenderNextVersion',
    demo: 'https://fullcalender-1bddf.web.app/',
    featured: true,
  },
  {
    id: 'chatbot',
    title: 'AI-Driven Chatbot',
    description: 'Developed a chatbot that provides accurate, fast, context-aware responses with an intuitive UI/UX using Google Search API.',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tech: ['Google Search API', 'JavaScript', 'HTML/CSS', 'Node.js'],
    github: 'https://github.com/priyankahotkar/GoogleChatbot',
    featured: false,
  },
];

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'featured'>('featured');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredProjects = selectedFilter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.featured);

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
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Showcasing my technical projects and applications">
          Key Projects
        </SectionTitle>

        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-full bg-slate-200 dark:bg-slate-700">
            <button
              onClick={() => setSelectedFilter('featured')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                selectedFilter === 'featured'
                  ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600/50'
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600/50'
              }`}
            >
              All Projects
            </button>
          </div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full"
            >
              <div className="h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 mb-4 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <TechBadge key={tech} tech={tech} />
                  ))}
                </div>
                
                <div className="flex gap-3 mt-auto">
                  <Button
                    href={project.github}
                    variant="outline"
                    size="sm"
                    icon={<Github size={16} />}
                    external
                  >
                    GitHub
                  </Button>
                  
                  {project.demo && (
                    <Button
                      href={project.demo}
                      size="sm"
                      icon={<ExternalLink size={16} />}
                      external
                    >
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <Button 
            href="https://github.com/priyankahotkar" 
            variant="ghost" 
            size="lg"
            icon={<Github size={20} />}
            external
          >
            See More on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;