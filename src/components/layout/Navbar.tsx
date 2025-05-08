import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../ui/ThemeToggle';

const navLinks = [
  { title: 'Home', href: '#hero' },
  { title: 'Education', href: '#education' },
  { title: 'Experience', href: '#experience' },
  { title: 'Skills', href: '#skills' },
  { title: 'Projects', href: '#projects' },
  { title: 'Accomplishments', href: '#accomplishments' },
  { title: 'Certifications', href: '#certifications' },
  { title: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isScrolled = scrollPosition > 50;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white dark:bg-slate-800 shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a 
            href="#hero" 
            className="text-xl font-display font-bold tracking-tight text-primary-600 dark:text-primary-400"
          >
            Priyanka Hotkar
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
            
            <a 
              href="../FinalResume2.pdf" 
              className="flex items-center px-4 py-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors text-sm font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={16} className="mr-2" />
              Resume
            </a>
            
            <ThemeToggle />
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="text-slate-700 dark:text-slate-300"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-white dark:bg-slate-900 z-40">
          <div className="flex flex-col h-full p-4">
            <nav className="flex-1">
              <ul className="flex flex-col space-y-6 py-8">
                {navLinks.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      onClick={closeMenu}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="pb-8">
              <a 
                href="../FinalResume2.pdf" 
                className="flex items-center justify-center w-full px-4 py-3 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors text-base font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={18} className="mr-2" />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;