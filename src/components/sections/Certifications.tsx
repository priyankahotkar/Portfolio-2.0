import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';

const certificationsData = [
  {
    id: 'aws-academy',
    title: 'AWS Academy Certificate',
    description: 'Certification for completing AWS Academy program.',
    viewLink: `${import.meta.env.BASE_URL}AWS_Academy_Certificate.pdf`,
  },
  {
    id: 'apna-college',
    title: 'Apna College Sigma 3.0 DSA Course',
    description: 'Certificate of completion for DSA course by Apna College.',
    viewLink: `${import.meta.env.BASE_URL}Apna_College_DSA_Certificate.pdf`,
  },
  {
    id: 'google-cloud',
    title: 'Google Cloud Career Launchpad',
    description: 'Certification for completing Google Cloud Career Launchpad program.',
    viewLink: `${import.meta.env.BASE_URL}Google_Cloud_Certificate.pdf`,
  },
  {
    id: 'css-bootcamp',
    title: 'CSS Bootcamp by CodeKaro',
    description: 'Certificate of completion for CSS Bootcamp by CodeKaro.',
    viewLink: `${import.meta.env.BASE_URL}CSS_Bootcamp_Certificate.pdf`,
  },
  {
    id: 'ir4-techsaksham',
    title: 'Foundation Course on IR4.0 Technologies',
    description: 'Certification for completing the Foundation course on IR4.0 Technologies under TechSaksham, a joint CSR initiative between Microsoft and SAP, implemented by Edunet Foundation.',
    viewLink: `${import.meta.env.BASE_URL}IR4_TechSaksham_Certificate.pdf`,
  },
  {
    id: 'hack-did-blockchain',
    title: 'Hack:DID Blockchain Workshop',
    description: 'Certification for attending the Hack:DID Blockchain Workshop held by Learning Out Loud Coding Club, powered by HyperSign.',
    viewLink: `${import.meta.env.BASE_URL}HackDID_Blockchain_Workshop_Certificate.pdf`,
  },
];

const Certifications = () => {
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
    <section id="certifications" className="py-20 bg-white dark:bg-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          subtitle="Certifications I have earned during my learning journey" 
          align="center"
        >
          Certifications
        </SectionTitle>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificationsData.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              className="bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-700"
            >
              <h3 className="text-xl font-semibold text-center text-slate-900 dark:text-white mb-3">
                {cert.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-center mb-4">
                {cert.description}
              </p>
              <div className="text-center">
                <a 
                  href={cert.viewLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  View Certificate
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;