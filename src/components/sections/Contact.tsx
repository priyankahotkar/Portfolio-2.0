import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, Github, Linkedin, Code, ExternalLink } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  message: '',
};

const Contact = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formState);
      setFormStatus('success');
      setFormState(initialFormState);
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Get in touch with me for opportunities or collaboration">
          Contact Me
        </SectionTitle>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-10"
        >
          {/* Contact Information */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
              Let's Connect
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 rounded-full bg-primary-100 dark:bg-primary-900/50 mr-4">
                  <Mail size={20} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Email
                  </h4>
                  <a 
                    href="mailto:priyankahotkar4@gmail.com" 
                    className="text-lg font-medium text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    priyankahotkar4@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 rounded-full bg-primary-100 dark:bg-primary-900/50 mr-4">
                  <Phone size={20} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Phone
                  </h4>
                  <a 
                    href="tel:+919175346605" 
                    className="text-lg font-medium text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    +91 91753 46605
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Find Me Online
              </h4>
              
              <div className="space-y-4">
                <a 
                  href="https://github.com/priyankahotkar" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <Github size={20} className="mr-3" />
                  <span>github.com/priyankahotkar</span>
                </a>
                
                <a 
                  href="https://linkedin.com/in/priyanka-hotkar-3a667a259" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <Linkedin size={20} className="mr-3" />
                  <span>linkedin.com/in/priyanka-hotkar-3a667a259</span>
                </a>
                
                <a 
                  href="https://leetcode.com/u/priyankahotkar_/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <Code size={20} className="mr-3" />
                  <span>leetcode.com/u/priyankahotkar_/</span>
                </a>
                
                
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
              Send Me a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  placeholder="Your message..."
                ></textarea>
              </div>
              
              <div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'idle' && 'Send Message'}
                  {formStatus === 'submitting' && 'Sending...'}
                  {formStatus === 'success' && 'Message Sent!'}
                  {formStatus === 'error' && 'Error! Try Again'}
                </Button>
                
                {formStatus === 'success' && (
                  <p className="mt-3 text-sm text-success-600 dark:text-success-400 text-center">
                    Thank you for your message! I'll get back to you soon.
                  </p>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;