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
  details?: string; // <-- Add this line
}

const projectsData: Project[] = [
  {
    id: 'traffic-lights',
    title: 'Smart AI-Based Traffic Signal Management System',
    description: 'An intelligent real-time traffic management system for SIH 2024, dynamically controlling signals using AI-based vehicle detection and microcontroller integration.',
    image: 'https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg?cs=srgb&dl=pexels-pixabay-210182.jpg&fm=jpg',
    tech: ['Python', 'OpenCV', 'Yolo', 'ESP32', 'Raspberry Pi'],
    github: 'https://github.com/SAMKIT-CHOPDA/SIH',
    demo: 'https://drive.google.com/file/d/10y4O3v_hkpO9UXrEuGUjy_LbNhyHB4bz/view?usp=sharing',
    featured: true,
    details: `<div>
  <p><strong>🚦 Smart AI-Based Traffic Signal Management System – SIH 2024</strong></p>
  <p>An intelligent, real-time traffic management system designed for <b>Smart India Hackathon 2024</b>. Dynamically controls traffic signals using AI-based vehicle detection and microcontroller integration to reduce congestion, pollution, and response time at urban intersections.</p>
  <ul style='margin-top:1em;margin-bottom:1em;'>
    <li>🎯 <b>Objective:</b> Scalable, cost-effective system that detects vehicles in real-time and allocates green signal time based on density.</li>
    <li>🧠 <b>Tech Stack:</b> ESP32, Raspberry Pi 4, IR Sensors, Cameras, Python (OpenCV, NumPy), Arduino (C++), Flask, YOLOv5/Haarcascade</li>
    <li>🔗 <b>Communication:</b> Wi-Fi (ESP-NOW/MQTT), Serial/UART</li>
    <li>📊 <b>System Architecture:</b> 4 ESP32s (one per lane) count vehicles, send data to a central Raspberry Pi, which computes optimal green light duration.</li>
    <li>🔄 <b>Signal Cycle:</b> Lane A → Yellow (3s) → Next Lane, loop with dynamic updates.</li>
    <li>🖥️ <b>Optional Dashboard:</b> Real-time status and logs monitoring.</li>
  </ul>
  <h4 style='margin-top:1em;'>Setup & Demo</h4>
  <ul>
    <li>Clone: <code>git clone https://github.com/your-username/sih-traffic-system.git</code></li>
    <li>Install Python libs: <code>pip install opencv-python flask numpy</code></li>
    <li>Upload Arduino sketch to ESP32s for vehicle counting</li>
    <li>Run controller: <code>python3 main_controller.py</code> on Raspberry Pi</li>
  </ul>
  <div style='margin-top:1em;'>
    <a href='https://drive.google.com/file/d/10y4O3v_hkpO9UXrEuGUjy_LbNhyHB4bz/view?usp=sharing' target='_blank' rel='noopener noreferrer' style='color:#0ea5e9;font-weight:bold;text-decoration:underline;'>🎬 Demo Video</a> &nbsp;|&nbsp;
    <a href='https://github.com/SAMKIT-CHOPDA/SIH' target='_blank' rel='noopener noreferrer' style='color:#0ea5e9;font-weight:bold;text-decoration:underline;'>GitHub Repo</a>
  </div>
  <div style='margin-top:1em;font-size:0.95em;color:#64748b;'>
    <b>Impact:</b> Reduces congestion, idle emissions, and improves urban traffic flow using affordable hardware and AI.
  </div>
</div>`
  },
  {
    id: 'unlimitly',
    title: 'Unlimitly',
    description: 'A free, AI-driven online mentoring platform with automated scheduling, built-in video conferencing, real-time chat, community forums, faqs, Roadmap based free resources and progressive learning through badges and rewards for developers and much more.',
    image: 'https://images.pexels.com/photos/7437489/pexels-photo-7437489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tech: ['React.js', 'Node.js', 'Express.js', 'Firebase', 'Google Calendar API', 'Jitsi Meet'],
    github: 'https://github.com/priyankahotkar/Unlimitly',
    demo: 'https://unlimitly-c1506.web.app/',
    featured: true,
    details: `<div>
  <p><strong>Unlimitly</strong> is a <span style='color:#0ea5e9;font-weight:bold;'>free, AI-powered mentoring platform</span> that connects mentees and mentors for career growth, skill development, and networking—all in one seamless experience.</p>
  <ul style='margin-top:1em;margin-bottom:1em;'>
    <li>🎯 <b>Mission:</b> Make mentorship accessible, structured, and engaging for everyone.</li>
    <li>💡 <b>Why Unlimitly?</b> No more costly subscriptions, scattered tools, or scheduling headaches. Everything you need is built-in and free.</li>
  </ul>
  <h4 style='margin-top:1em;'>Key Features</h4>
  <ul>
    <li>🗓️ <b>Automated Scheduling</b> (Google Calendar integration)</li>
    <li>🎥 <b>Built-in Video Calls</b> (Jitsi Meet)</li>
    <li>💬 <b>Real-Time Chat</b> (Firebase)</li>
    <li>🧑‍🤝‍🧑 <b>Group & 1:1 Mentoring</b></li>
    <li>🏆 <b>Badges & Progress Tracking</b> (DSA, ML, and more)</li>
    <li>📊 <b>LeetCode-Style Activity Grid</b></li>
    <li>📚 <b>Curated Resources</b> for placements, tutorials, and projects</li>
    <li>📝 <b>Discussion Forums & FAQs</b></li>
    <li>🔒 <b>Secure Auth & Protected Routes</b></li>
    <li>✨ <b>Modern, Professional UI/UX</b></li>
  </ul>
  <h4 style='margin-top:1em;'>Tech Stack</h4>
  <ul>
    <li>⚛️ React.js &nbsp;|&nbsp; 🔥 Firebase &nbsp;|&nbsp; 🟦 Node.js & Express.js &nbsp;|&nbsp; 📅 Google Calendar API &nbsp;|&nbsp; 🎦 Jitsi Meet</li>
  </ul>
  <h4 style='margin-top:1em;'>Impact</h4>
  <ul>
    <li>🌍 <b>Accessible</b> to all, no paywalls</li>
    <li>⚡ <b>Efficient</b>—no third-party tools needed</li>
    <li>🚀 <b>Career Growth</b> for mentees and mentors</li>
    <li>🤝 <b>Inclusive</b> and community-driven</li>
  </ul>
  <div style='margin-top:1.5em;'>
    <a href='https://unlimitly-c1506.web.app/' target='_blank' rel='noopener noreferrer' style='color:#0ea5e9;font-weight:bold;text-decoration:underline;'>🌐 Live Website</a> &nbsp;|&nbsp;
    <a href='https://github.com/priyankahotkar/Unlimitly' target='_blank' rel='noopener noreferrer' style='color:#0ea5e9;font-weight:bold;text-decoration:underline;'>GitHub Repo</a>
  </div>
  <div style='margin-top:1em;font-size:0.95em;color:#64748b;'>
    <b>Recent Highlights:</b> Badges, activity grid, role-based profiles, unified UI, and blazing-fast authentication.
  </div>
</div>`
  },
  {
    id: 'calendar',
    title: 'FullCalendar.io Clone',
    description: 'A feature-rich calendar app inspired by FullCalendar.io, with smart scheduling, real-time chat, video calls, and push notifications.',
    image: 'https://www.lifewire.com/thmb/rEjebep0JHTFDN_53tkV-3ZSYjQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/free-online-calendars-1357935-41eafe4b4d484e6f8f7593cd5514e071.png',
    tech: ['React', 'TypeScript', 'Firebase', 'Jitsi', 'JavaScript', 'HTML/CSS'],
    github: 'https://github.com/priyankahotkar/fullcalenderNextVersion',
    demo: 'https://fullcalender-1bddf.web.app/',
    featured: true,
    details: `<div>
  <p><strong>FullCalendar.io Clone</strong> — <span style='color:#0ea5e9;font-weight:bold;'>Powered by Firebase + React + TypeScript</span></p>
  <p>A modern, feature-rich calendar app inspired by FullCalendar.io, supercharged with smart scheduling, real-time chat, video calls, and push notifications.</p>
  <ul style='margin-top:1em;margin-bottom:1em;'>
    <li>🔐 <b>Firebase Authentication</b> (Email/Password, OAuth)</li>
    <li>💬 <b>Real-time Chat</b> (with availability filtering)</li>
    <li>📆 <b>Smart Meeting Scheduling</b></li>
    <li>🎥 <b>Jitsi Meet Video Calls</b></li>
    <li>🔔 <b>Push Notifications</b> (FCM)</li>
    <li>⚛️ <b>Built with React + TypeScript</b></li>
  </ul>
  <h4 style='margin-top:1em;'>Key Features</h4>
  <ul>
    <li>✅ <b>Authentication:</b> Secure login via Firebase Auth (email/password + OAuth)</li>
    <li>💬 <b>Chat:</b> Real-time, scoped to event participants, built with Firestore</li>
    <li>📆 <b>Scheduling:</b> Intelligent event creation, user availability, notifications</li>
    <li>🎥 <b>Video Meetings:</b> Jitsi Meet integration, browser-based, no install needed</li>
    <li>📤 <b>Push Notifications:</b> Chat, event invites, meeting reminders</li>
    <li>🔐 <b>Security:</b> Role-based access, all actions gated by Firebase Auth</li>
  </ul>
  
  <h4 style='margin-top:1em;'>How Smart Scheduling Works</h4>
  <ul>
    <li>Event created in EventModal.tsx</li>
    <li>System checks Firestore for available users (UserSearchModal.tsx)</li>
    <li>Scheduled users notified, added to calendar, chat & video enabled</li>
    <li>Notifications sent via FCM</li>
  </ul>
  <h4 style='margin-top:1em;'>Setup & Live Demo</h4>
  <ul>
    <li>Clone: <code>git clone https://github.com/priyankahotkar/fullcalendarNextVersion-clone.git</code></li>
    <li>Install: <code>npm install</code></li>
    <li>Configure Firebase, then <code>npm run dev</code></li>
    <li>Live: <a href='https://fullcalender-1bddf.web.app/' target='_blank' rel='noopener noreferrer' style='color:#0ea5e9;font-weight:bold;text-decoration:underline;'>🌐 Try the App</a></li>
    <li>Repo: <a href='https://github.com/priyankahotkar/fullcalenderNextVersion' target='_blank' rel='noopener noreferrer' style='color:#0ea5e9;font-weight:bold;text-decoration:underline;'>GitHub</a></li>
  </ul>
  <div style='margin-top:1em;font-size:0.95em;color:#64748b;'>
    <b>Future:</b> Analytics dashboards, advanced conflict resolution, cross-platform reminders.
  </div>
</div>`
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
  {
    id: 'devconnect',
    title: 'DevConnect',
    description: 'A full-stack social media platform for developers: create profiles, share posts, follow others, and view a personalized timeline.',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tech: [
      'React.js', 'React Router', 'Material UI', 'Axios',
      'Node.js', 'Express.js', 'JWT', 'MongoDB', 'Mongoose'
    ],
    github: 'https://github.com/priyankahotkar/devconnect',
    demo: 'https://devconnect-lfpvjo7ng-priyankas-projects-3407f629.vercel.app',
    featured: true,
    details: `<div>
  <p><strong>DevConnect</strong> — <span style='color:#0ea5e9;font-weight:bold;'>A Social Platform for Developers</span></p>
  <p>DevConnect is a full-stack social media platform that empowers developers to connect, share, and grow. Create your profile, post updates, follow others, and enjoy a personalized timeline—just like Twitter, but for devs!</p>
  <ul style='margin-top:1em;margin-bottom:1em;'>
    <li>🔐 <b>JWT Authentication:</b> Secure signup/login with JSON Web Tokens</li>
    <li>👤 <b>Profile Management:</b> Create and update your developer profile</li>
    <li>📝 <b>Post Updates:</b> Share text posts with the community</li>
    <li>🔄 <b>Follow/Unfollow:</b> Build your network and see posts from those you follow</li>
    <li>📰 <b>Timeline:</b> View a feed of posts from followed users</li>
    <li>🌐 <b>Explore:</b> Discover and connect with other developers</li>
    <li>📱 <b>Responsive UI:</b> Fully mobile-friendly and modern design</li>
  </ul>
  <h4 style='margin-top:1em;'>Tech Stack</h4>
  <ul>
    <li>⚛️ <b>Frontend:</b> React.js (Hooks), React Router, Material UI, Axios</li>
    <li>🟦 <b>Backend:</b> Node.js, Express.js, JWT, RESTful APIs, Middleware</li>
    <li>🍃 <b>Database:</b> MongoDB (Mongoose ODM)</li>
  </ul>
  <h4 style='margin-top:1em;'>How It Works</h4>
  <ul>
    <li>Sign up or log in securely (JWT-based)</li>
    <li>Create/update your profile and start posting</li>
    <li>Follow other users to see their posts in your timeline</li>
    <li>Explore page helps you discover new developers</li>
  </ul>
  <h4 style='margin-top:1em;'>Try It Out</h4>
  <ul>
    <li>Live: <a href='https://devconnect-lfpvjo7ng-priyankas-projects-3407f629.vercel.app' target='_blank' rel='noopener noreferrer' style='color:#0ea5e9;font-weight:bold;text-decoration:underline;'>🌐 DevConnect App</a> <span style='color:#64748b;font-size:0.95em;'>(Login to your Vercel account first. If backend doesn't start immediately, wait 15 seconds.)</span></li>
    <li>Repo: <a href='https://github.com/priyankahotkar/devconnect' target='_blank' rel='noopener noreferrer' style='color:#0ea5e9;font-weight:bold;text-decoration:underline;'>GitHub</a></li>
  </ul>
  <div style='margin-top:1em;font-size:0.95em;color:#64748b;'>
    <b>Future:</b> Image uploads, notifications, and advanced search coming soon!
  </div>
</div>`
  },
  {
    id: 'mini-whatsapp',
    title: 'mini Whatsapp',
    description: 'A mini WhatsApp-like chat application built with JavaScript, REST APIs, Express, Mongoose, and EJS. Supports real-time messaging, user authentication, and group chats.',
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tech: [
      'JavaScript', 'Express.js', 'MongoDB', 'Mongoose', 'REST API', 'EJS'
    ],
    github: 'https://github.com/priyankahotkar/MongoDB-with-Express',
    featured: true,
    details: `<div>
  <p><strong>mini Whatsapp</strong> — <span style='color:#0ea5e9;font-weight:bold;'>A Real-Time Chat App</span></p>
  <p>This mini WhatsApp clone is a full-stack chat application that lets users sign up, log in, and chat in real time. Built with JavaScript, Express, MongoDB, and EJS, it demonstrates core messaging features and RESTful API design.</p>
  <ul style='margin-top:1em;margin-bottom:1em;'>
    <li>🔐 <b>User Authentication:</b> Register and log in securely</li>
    <li>💬 <b>Real-Time Messaging:</b> Send and receive messages instantly</li>
    <li>👥 <b>Group Chats:</b> Create and join group conversations</li>
    <li>🗂️ <b>RESTful APIs:</b> Modular routes for users, messages, and groups</li>
    <li>🖥️ <b>Templating:</b> EJS for dynamic, server-rendered UI</li>
    <li>📦 <b>Database:</b> MongoDB with Mongoose ODM</li>
  </ul>
  <h4 style='margin-top:1em;'>Tech Stack</h4>
  <ul>
    <li>🟨 JavaScript &nbsp;|&nbsp; 🟦 Express.js &nbsp;|&nbsp; 🍃 MongoDB &nbsp;|&nbsp; 🧩 Mongoose &nbsp;|&nbsp; 📝 EJS</li>
  </ul>
  <h4 style='margin-top:1em;'>Features</h4>
  <ul>
    <li>Sign up and log in with secure authentication</li>
    <li>Send/receive messages in real time</li>
    <li>Create and join group chats</li>
    <li>RESTful API endpoints for all core actions</li>
    <li>Clean, responsive UI with EJS templates</li>
  </ul>
  <h4 style='margin-top:1em;'>Source Code</h4>
  <ul>
    <li>Repo: <a href='https://github.com/priyankahotkar/MongoDB-with-Express' target='_blank' rel='noopener noreferrer' style='color:#0ea5e9;font-weight:bold;text-decoration:underline;'>GitHub</a></li>
  </ul>
  <div style='margin-top:1em;font-size:0.95em;color:#64748b;'>
    <b>Future:</b> Add file sharing, message notifications, and online status indicators.
  </div>
</div>`
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

  // Modal state
  const [openModal, setOpenModal] = useState<string | null>(null);

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
              className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer"
              onClick={() => setOpenModal(project.id)}
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

        {/* Modal for project details */}
        {openModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg max-w-2xl w-full p-8 relative overflow-y-auto max-h-[90vh]">
              <button
                className="absolute top-4 right-4 text-slate-500 hover:text-primary-600 dark:hover:text-primary-400"
                onClick={() => setOpenModal(null)}
                aria-label="Close"
              >
                ×
              </button>
              {(() => {
                const project = projectsData.find(p => p.id === openModal);
                if (!project) return null;
                if (project.details) {
                  return (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
                      <div className="prose dark:prose-invert max-w-none mb-4" dangerouslySetInnerHTML={{__html: project.details || ''}} />
                    </div>
                  );
                } else {
                  return (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
                      <p className="mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <TechBadge key={tech} tech={tech} />
                        ))}
                      </div>
                      <div className="flex gap-4 mt-4">
                        {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">Live Link</a>}
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">GitHub Repo</a>
                      </div>
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        )}

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