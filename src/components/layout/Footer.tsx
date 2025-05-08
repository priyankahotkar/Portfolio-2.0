import { Github, Linkedin, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-800 py-10 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {new Date().getFullYear()} Priyanka Hotkar. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/priyankahotkar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/priyanka-hotkar-3a667a259"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://leetcode.com/u/priyankahotkar_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="LeetCode"
            >
              <Code size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;