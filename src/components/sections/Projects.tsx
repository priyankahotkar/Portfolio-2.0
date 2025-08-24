import { useState, useEffect, createElement, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, PlayCircle, Target, Cpu, Settings, Wifi, RefreshCw, Monitor, Terminal, Zap, Star, Calendar, Video, MessageSquare, Users, Award, LayoutGrid, Globe, Bell, Map, User, Compass, Smartphone, Code, Shield } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import TechBadge from '../ui/TechBadge';

// Map of icon names to their components
const iconComponents = {
  'play-circle': PlayCircle,
  'target': Target,
  'cpu': Cpu,
  'settings': Settings,
  'wifi': Wifi,
  'refresh-cw': RefreshCw,
  'monitor': Monitor,
  'terminal': Terminal,
  'zap': Zap,
  'star': Star,
  'calendar': Calendar,
  'video': Video,
  'message-square': MessageSquare,
  'users': Users,
  'award': Award,
  'layout-grid': LayoutGrid,
  'globe': Globe,
  'bell': Bell,
  'map': Map,
  'user': User,
  'compass': Compass,
  'smartphone': Smartphone,
  'code': Code,
  'shield': Shield,
  'github': Github,
  'external-link': ExternalLink
} as const;

// Project modal styles
const projectModalStyles = `
  .project-modal {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    color: #1f2937;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
    padding: 1.5rem;
  }

  .project-header {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .project-title {
    font-size: 1.75rem;
    font-weight: 700;
    color:rgb(236, 240, 248);
    margin: 0 0 0.5rem 0;
  }

  .project-tagline, .project-subtitle {
    font-size: 1.1rem;
    color: rgb(230, 236, 245);
    margin: 0;
    font-weight: 500;
  }

  .project-description {
    font-size: 1.05rem;
    color:rgb(230, 236, 245);
    margin-bottom: 1.5rem;
    line-height: 1.7;
  }

  .project-section {
    margin-bottom: 1.8rem;
  }

  .project-section h4 {
    font-size: 1.2rem;
    color:rgb(230, 236, 245);
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .project-section h4 .icon {
    width: 1.2rem;
    height: 1.2rem;
    color: #3b82f6;
  }

  .project-section p {
    color:rgb(230, 236, 245);
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0.5rem 0;
  }

  .tech-tags span {
    background-color: #e0f2fe;
    color: #0369a1;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin: 1rem 0;
  }

  .feature-item {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1rem;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    transition: all 0.2s ease;
  }

  .feature-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .feature-item .icon {
    color: #3b82f6;
    flex-shrink: 0;
    margin-top: 0.2rem;
  }

  .feature-item h5 {
    margin: 0 0 0.25rem 0;
    font-size: 1rem;
    color: #111827;
  }

  .feature-item p {
    margin: 0;
    font-size: 0.9rem;
    color:rgb(13, 35, 65);
  }

  .code-block {
    background: #1e293b;
    color: #e2e8f0;
    padding: 1rem;
    border-radius: 0.5rem;
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 0.9rem;
    overflow-x: auto;
  }

  .code-block code {
    display: block;
    white-space: pre;
    line-height: 1.6;
  }

  .code-block code:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  .project-footer {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }

  .project-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.25rem;
    border-radius: 0.375rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
    background-color: #f3f4f6;
    color: #374151;
    border: 1px solid #e5e7eb;
  }

  .project-link.primary {
    background-color: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }

  .project-link:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .project-link.primary:hover {
    background-color: #2563eb;
    border-color: #2563eb;
  }

  .project-link .icon {
    width: 1rem;
    height: 1rem;
  }

  .project-impact {
    background-color: #f0f9ff;
    border-left: 3px solid #0ea5e9;
    padding: 1rem;
    border-radius: 0 0.375rem 0.375rem 0;
    margin: 1.5rem 0;
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
  }

  .project-impact .icon {
    color: #0ea5e9;
    flex-shrink: 0;
    margin-top: 0.2rem;
  }

  .project-impact span {
    font-size: 0.95rem;
    color: #075985;
  }

  .project-roadmap {
    margin-top: 2rem;
    padding: 1.25rem;
    background-color: #f8fafc;
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
  }

  .roadmap-list {
    margin: 0.75rem 0 0 1.25rem;
    padding: 0;
  }

  .roadmap-list li {
    margin-bottom: 0.5rem;
    color:rgb(6, 34, 72);
    position: relative;
    padding-left: 1.25rem;
  }

  .roadmap-list li:before {
    content: '•';
    position: absolute;
    left: 0;
    color: #3b82f6;
    font-weight: bold;
  }

  .how-it-works {
    margin: 1rem 0 0 1.25rem;
    padding: 0;
    list-style-type: none;
    counter-reset: step-counter;
  }

  .how-it-works li {
    margin-bottom: 0.75rem;
    padding-left: 1.75rem;
    position: relative;
    color:rgb(228, 234, 243);
  }

  .how-it-works li:before {
    content: counter(step-counter);
    counter-increment: step-counter;
    position: absolute;
    left: 0;
    background-color: #3b82f6;
    color: white;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .highlight-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f8fafc;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.95rem;
    color: #334155;
    border: 1px solid #e2e8f0;
  }

  .highlight-item .icon {
    color: #3b82f6;
    width: 1rem;
    height: 1rem;
  }

  .project-highlights {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin: 1.5rem 0;
  }

  .mission-statement {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background: #f0f9ff;
    padding: 1.25rem;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
    border-left: 3px solid #0ea5e9;
  }

  .mission-statement .icon {
    color: #0ea5e9;
    margin-top: 0.2rem;
  }

  .mission-statement h4 {
    margin: 0 0 0.5rem 0;
    color: #075985;
  }

  .mission-statement p {
    margin: 0;
    color: #0c4a6e;
  }

  .impact-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .impact-item .icon {
    color: #10b981;
    margin-top: 0.2rem;
  }

  .impact-item h4 {
    margin: 0 0 0.25rem 0;
    color: #065f46;
  }

  .impact-item p {
    margin: 0;
    color: #047857;
    font-size: 0.95rem;
  }
  
  .feature-list {
  color:rgb(228, 234, 243);
  }
`;

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
    details: `<div class="project-modal">
      <div class="project-header">
        <h3 class="project-title">Smart AI-Based Traffic Signal Management System</h3>
        <div class="project-subtitle">Smart India Hackathon 2024</div>
      </div>
      
      <p class="project-description">An intelligent, real-time traffic management system designed to dynamically control traffic signals using AI-based vehicle detection and microcontroller integration, reducing congestion, pollution, and response time at urban intersections.</p>
      
      <div class="project-section">
        <h4><i data-lucide="target" class="icon"></i> Objective</h4>
        <p>Scalable, cost-effective system that detects vehicles in real-time and allocates green signal time based on density.</p>
      </div>

      <div class="project-section">
        <h4><i data-lucide="cpu" class="icon"></i> Tech Stack</h4>
        <div class="tech-tags">
          <span>ESP32</span>
          <span>Raspberry Pi 4</span>
          <span>Python</span>
          <span>OpenCV</span>
          <span>Arduino</span>
          <span>Flask</span>
          <span>YOLOv5</span>
        </div>
      </div>

      <div class="project-section">
        <h4><i data-lucide="settings" class="icon"></i> System Architecture</h4>
        <ul class="feature-list">
          <li><i data-lucide="wifi" class="icon-sm"></i> 4 ESP32s (one per lane) count vehicles and send data to a central Raspberry Pi</li>
          <li><i data-lucide="cpu" class="icon-sm"></i> Raspberry Pi computes optimal green light duration based on vehicle density</li>
          <li><i data-lucide="refresh-cw" class="icon-sm"></i> Dynamic signal cycling with 3-second yellow intervals</li>
          <li><i data-lucide="monitor" class="icon-sm"></i> Optional dashboard for real-time monitoring</li>
        </ul>
      </div>

      <div class="project-section">
        <h4><i data-lucide="terminal" class="icon"></i> Setup & Demo</h4>
        <div class="code-block">
          <code>git clone https://github.com/samkit-chopda/SIH.git</code>
          <code>pip install opencv-python flask numpy</code>
          <code>python3 main_controller.py</code>
        </div>
      </div>

      <div class="project-footer">
        <a href="https://drive.google.com/file/d/10y4O3v_hkpO9UXrEuGUjy_LbNhyHB4bz/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="project-link">
          <i data-lucide="play-circle"></i> Demo Video
        </a>
        <a href="https://github.com/SAMKIT-CHOPDA/SIH" target="_blank" rel="noopener noreferrer" class="project-link">
          <i data-lucide="github"></i> GitHub Repo
        </a>
      </div>

      <div class="project-impact">
        <i data-lucide="zap" class="icon"></i>
        <span>Reduces congestion, idle emissions, and improves urban traffic flow using affordable hardware and AI.</span>
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
    details: `<div class="project-modal">
      <div class="project-header">
        <h3 class="project-title">Unlimitly</h3>
        <div class="project-tagline">AI-Powered Mentoring Platform</div>
      </div>

      <p class="project-description">A free, AI-powered mentoring platform that connects mentees and mentors for career growth, skill development, and networking—all in one seamless experience.</p>

      <div class="project-mission">
        <div class="mission-statement">
          <i data-lucide="target" class="icon"></i>
          <div>
            <h4>Mission</h4>
            <p>Make mentorship accessible, structured, and engaging for everyone.</p>
          </div>
        </div>
      </div>

      <div class="project-section">
        <h4><i data-lucide="star" class="icon"></i> Key Features</h4>
        <div class="features-grid">
          <div class="feature-item">
            <i data-lucide="calendar" class="icon"></i>
            <span>Automated Scheduling</span>
          </div>
          <div class="feature-item">
            <i data-lucide="video" class="icon"></i>
            <span>Built-in Video Calls</span>
          </div>
          <div class="feature-item">
            <i data-lucide="message-square" class="icon"></i>
            <span>Real-Time Chat</span>
          </div>
          <div class="feature-item">
            <i data-lucide="users" class="icon"></i>
            <span>Group & 1:1 Mentoring</span>
          </div>
          <div class="feature-item">
            <i data-lucide="award" class="icon"></i>
            <span>Progress Tracking</span>
          </div>
          <div class="feature-item">
            <i data-lucide="layout-grid" class="icon"></i>
            <span>Activity Grid</span>
          </div>
        </div>
      </div>

      <div class="project-section">
        <h4><i data-lucide="code" class="icon"></i> Tech Stack</h4>
        <div class="tech-tags">
          <span>React.js</span>
          <span>Firebase</span>
          <span>Node.js</span>
          <span>Express.js</span>
          <span>Google Calendar API</span>
          <span>Jitsi Meet</span>
        </div>
      </div>

      <div class="project-impact">
        <div class="impact-item">
          <i data-lucide="globe" class="icon"></i>
          <div>
            <h4>Accessible</h4>
            <p>No paywalls, open to all</p>
          </div>
        </div>
        <div class="impact-item">
          <i data-lucide="zap" class="icon"></i>
          <div>
            <h4>Efficient</h4>
            <p>All-in-one solution</p>
          </div>
        </div>
      </div>

      <div class="project-footer">
        <a href="https://unlimitly-c1506.web.app/" target="_blank" rel="noopener noreferrer" class="project-link primary">
          <i data-lucide="external-link"></i> Live Website
        </a>
        <a href="https://github.com/priyankahotkar/Unlimitly" target="_blank" rel="noopener noreferrer" class="project-link">
          <i data-lucide="github"></i> GitHub Repo
        </a>
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
    details: `<div class="project-modal">
      <div class="project-header">
        <h3 class="project-title">FullCalendar.io Clone</h3>
        <div class="project-tagline">Smart Scheduling & Video Conferencing</div>
      </div>

      <p class="project-description">A modern, feature-rich calendar application with smart scheduling, real-time chat, and video conferencing capabilities.</p>

      <div class="project-highlights">
        <div class="highlight-item">
          <i data-lucide="shield" class="icon"></i>
          <span>Secure Authentication</span>
        </div>
        <div class="highlight-item">
          <i data-lucide="message-square" class="icon"></i>
          <span>Real-time Chat</span>
        </div>
        <div class="highlight-item">
          <i data-lucide="video" class="icon"></i>
          <span>Video Meetings</span>
        </div>
        <div class="highlight-item">
          <i data-lucide="bell" class="icon"></i>
          <span>Push Notifications</span>
        </div>
      </div>

      <div class="project-section">
        <h4><i data-lucide="zap" class="icon"></i> Key Features</h4>
        <div class="features-grid">
          <div class="feature-item">
            <i data-lucide="shield" class="icon"></i>
            <div>
              <h5>Authentication</h5>
              <p>Secure login with Firebase Auth (Email/Password & OAuth)</p>
            </div>
          </div>
          <div class="feature-item">
            <i data-lucide="message-square" class="icon"></i>
            <div>
              <h5>Real-time Chat</h5>
              <p>Scoped to event participants with availability filtering</p>
            </div>
          </div>
          <div class="feature-item">
            <i data-lucide="calendar" class="icon"></i>
            <div>
              <h5>Smart Scheduling</h5>
              <p>Intelligent event creation with user availability</p>
            </div>
          </div>
          <div class="feature-item">
            <i data-lucide="video" class="icon"></i>
            <div>
              <h5>Video Meetings</h5>
              <p>Integrated Jitsi Meet for browser-based video calls</p>
            </div>
          </div>
        </div>
      </div>

      <div class="project-section">
        <h4><i data-lucide="code" class="icon"></i> Tech Stack</h4>
        <div class="tech-tags">
          <span>React</span>
          <span>TypeScript</span>
          <span>Firebase</span>
          <span>Firestore</span>
          <span>Jitsi Meet</span>
          <span>FCM</span>
        </div>
      </div>

      <div class="project-section">
        <h4><i data-lucide="terminal" class="icon"></i> Quick Start</h4>
        <div class="code-block">
          <code>git clone https://github.com/priyankahotkar/fullcalendarNextVersion-clone.git</code>
          <code>cd fullcalendarNextVersion</code>
          <code>npm install</code>
          <code>npm run dev</code>
        </div>
      </div>

      <div class="project-footer">
        <a href="https://fullcalender-1bddf.web.app/" target="_blank" rel="noopener noreferrer" class="project-link primary">
          <i data-lucide="external-link"></i> Live Demo
        </a>
        <a href="https://github.com/priyankahotkar/fullcalenderNextVersion" target="_blank" rel="noopener noreferrer" class="project-link">
          <i data-lucide="github"></i> GitHub Repo
        </a>
      </div>

      <div class="project-roadmap">
        <h4><i data-lucide="map" class="icon"></i> Future Enhancements</h4>
        <ul class="roadmap-list">
          <li>Analytics dashboards for usage statistics</li>
          <li>Advanced conflict resolution algorithms</li>
          <li>Cross-platform reminder system</li>
        </ul>
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
    details: `<div class="project-modal">
      <div class="project-header">
        <h3 class="project-title">DevConnect</h3>
        <div class="project-tagline">Social Platform for Developers</div>
      </div>

      <p class="project-description">A full-stack social media platform that empowers developers to connect, share, and grow. Create your profile, post updates, follow others, and enjoy a personalized timeline—just like Twitter, but for developers!</p>

      <div class="project-highlights">
        <div class="highlight-item">
          <i data-lucide="shield" class="icon"></i>
          <span>Secure Authentication</span>
        </div>
        <div class="highlight-item">
          <i data-lucide="user" class="icon"></i>
          <span>Profile Management</span>
        </div>
        <div class="highlight-item">
          <i data-lucide="message-square" class="icon"></i>
          <span>Real-time Updates</span>
        </div>
      </div>

      <div class="project-section">
        <h4><i data-lucide="zap" class="icon"></i> Core Features</h4>
        <div class="features-grid">
          <div class="feature-item">
            <i data-lucide="shield" class="icon"></i>
            <div>
              <h5>JWT Authentication</h5>
              <p>Secure signup and login with JSON Web Tokens</p>
            </div>
          </div>
          <div class="feature-item">
            <i data-lucide="user" class="icon"></i>
            <div>
              <h5>Profile Management</h5>
              <p>Create and customize your developer profile</p>
            </div>
          </div>
          <div class="feature-item">
            <i data-lucide="message-square" class="icon"></i>
            <div>
              <h5>Post Updates</h5>
              <p>Share your thoughts and code with the community</p>
            </div>
          </div>
          <div class="feature-item">
            <i data-lucide="users" class="icon"></i>
            <div>
              <h5>Network Building</h5>
              <p>Follow other developers and see their posts</p>
            </div>
          </div>
          <div class="feature-item">
            <i data-lucide="compass" class="icon"></i>
            <div>
              <h5>Explore</h5>
              <p>Discover and connect with developers worldwide</p>
            </div>
          </div>
          <div class="feature-item">
            <i data-lucide="smartphone" class="icon"></i>
            <div>
              <h5>Responsive Design</h5>
              <p>Works seamlessly on all devices</p>
            </div>
          </div>
        </div>
      </div>

      <div class="project-section">
        <h4><i data-lucide="code" class="icon"></i> Tech Stack</h4>
        <div class="tech-stack">
          <div class="stack-category">
            <h5>Frontend</h5>
            <div class="tech-tags">
              <span>React.js</span>
              <span>React Router</span>
              <span>Material UI</span>
              <span>Axios</span>
            </div>
          </div>
          <div class="stack-category">
            <h5>Backend</h5>
            <div class="tech-tags">
              <span>Node.js</span>
              <span>Express.js</span>
              <span>JWT</span>
            </div>
          </div>
          <div class="stack-category">
            <h5>Database</h5>
            <div class="tech-tags">
              <span>MongoDB</span>
              <span>Mongoose ODM</span>
            </div>
          </div>
        </div>
      </div>

      <div class="project-section">
        <h4><i data-lucide="play" class="icon"></i> How It Works</h4>
        <ol class="how-it-works">
          <li>Sign up or log in to your account</li>
          <li>Complete your developer profile</li>
          <li>Start posting updates and following others</li>
          <li>Build your network and engage with the community</li>
        </ol>
      </div>
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
    details: `<div class="project-modal">
  <div class="project-header">
    <h3 class="project-title">mini Whatsapp</h3>
    <p class="project-tagline">A Real-Time Chat App</p>
  </div>
  
  <div class="project-section">
    <p>This mini WhatsApp clone is a full-stack chat application that lets users sign up, log in, and chat in real time. Built with JavaScript, Express, MongoDB, and EJS, it demonstrates core messaging features and RESTful API design.</p>
  </div>
  
  <div class="project-section">
    <h4>Key Features</h4>
    <ul class="feature-list">
      <li><b>User Authentication:</b> Register and log in securely</li>
      <li><b>Real-Time Messaging:</b> Send and receive messages instantly</li>
      <li><b>Group Chats:</b> Create and join group conversations</li>
      <li><b>RESTful APIs:</b> Modular routes for users, messages, and groups</li>
      <li><b>Templating:</b> EJS for dynamic, server-rendered UI</li>
      <li><b>Database:</b> MongoDB with Mongoose ODM</li>
    </ul>
  </div>
  
  <div class="project-section">
    <h4>Tech Stack</h4>
    <div class="tech-tags">
      <span class="tech-tag">JavaScript</span>
      <span class="tech-tag">Express.js</span>
      <span class="tech-tag">MongoDB</span>
      <span class="tech-tag">Mongoose</span>
      <span class="tech-tag">EJS</span>
    </div>
  </div>
  
  <div class="project-section">
    <h4>Features</h4>
    <ul class="feature-list">
      <li>Sign up and log in with secure authentication</li>
      <li>Send/receive messages in real time</li>
      <li>Create and join group chats</li>
      <li>RESTful API endpoints for all core actions</li>
      <li>Clean, responsive UI with EJS templates</li>
    </ul>
  </div>
  
  <div class="project-section">
    <h4>Source Code</h4>
    <div class="project-links">
      <a href="https://github.com/priyankahotkar/MongoDB-with-Express" target="_blank" rel="noopener noreferrer" class="project-link">
        <i data-lucide="github"></i> GitHub Repository
      </a>
    </div>
  </div>
  
  <div class="project-section">
    <div class="future-enhancements">
      <span class="future-label">Future:</span> Add file sharing, message notifications, and online status indicators.
    </div>
  </div>
</div>`
  },
];

const Projects = () => {
  const [mounted, setMounted] = useState(false);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const iconElementsRef = useRef<Element[]>([]);

  useEffect(() => {
    setMounted(true);
    
    // Add styles to document head
    const styleElement = document.createElement('style');
    styleElement.textContent = projectModalStyles;
    document.head.appendChild(styleElement);
    styleRef.current = styleElement;
    
    // Initialize icons after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      iconElementsRef.current = Array.from(document.querySelectorAll('[data-lucide]'));
      
      iconElementsRef.current.forEach((element) => {
        const iconName = element.getAttribute('data-lucide');
        if (iconName && iconName in iconComponents) {
          const Icon = iconComponents[iconName as keyof typeof iconComponents];
          if (Icon) {
            const wrapper = document.createElement('div');
            const iconElement = createElement(Icon);
            const iconMarkup = renderToStaticMarkup(iconElement);
            wrapper.innerHTML = iconMarkup;
            
            // Store reference to the original element
            const originalElement = element;
            const parent = originalElement.parentNode;
            
            if (parent) {
              // Replace the original element with the icon
              parent.replaceChild(wrapper.firstChild as Node, originalElement);
            }
          }
        }
      });
    }, 100);
    
    // Clean up
    return () => {
      clearTimeout(timer);
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
      }
    };
  }, []);
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