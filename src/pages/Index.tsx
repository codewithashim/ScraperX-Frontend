
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import { Button } from '@/components/ui/button';
import { ArrowRight, Database, Shield, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* How It Works Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-3xl opacity-20 animate-pulse-gentle" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your website data extraction solution</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
              Our web scraper is designed to meet all your data collection needs with a focus on simplicity and efficiency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 hover-scale"
            >
              <div className="bg-slate-100 dark:bg-slate-800 rounded-xl w-16 h-16 flex items-center justify-center mb-6 text-black dark:text-white">
                <Database className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Modern Technologies</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Built with Node.js and Puppeteer/Playwright for handling JavaScript-heavy websites.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-8 hover-scale"
            >
              <div className="bg-slate-100 dark:bg-slate-800 rounded-xl w-16 h-16 flex items-center justify-center mb-6 text-black dark:text-white">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Data</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Collects posts, comments, likes, and detailed engagement metrics from various platforms.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-card p-8 hover-scale"
            >
              <div className="bg-slate-100 dark:bg-slate-800 rounded-xl w-16 h-16 flex items-center justify-center mb-6 text-black dark:text-white">
                <Download className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Features</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Includes proxy rotation, authentication management, and efficient data storage options.
              </p>
            </motion.div>
          </div>
          
          <div className="flex justify-center">
            <Link to="/signup">
              <Button className="bg-black hover:bg-black/80 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-lg hover:shadow-xl px-8 py-6 rounded-lg text-base font-medium transition-all duration-300 group">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-900 py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 text-xl font-bold mb-4 md:mb-0">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center">
                <GlobeIcon className="w-5 h-5 text-white dark:text-black" />
              </div>
              ScraperX
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-slate-600 dark:text-slate-400">
              <Link to="/documentation" className="hover:text-black dark:hover:text-white transition-colors">
                Documentation
              </Link>
              <Link to="/examples" className="hover:text-black dark:hover:text-white transition-colors">
                Examples
              </Link>
              <Link to="/pricing" className="hover:text-black dark:hover:text-white transition-colors">
                Pricing
              </Link>
              <Link to="/legal" className="hover:text-black dark:hover:text-white transition-colors">
                Legal
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-500">
            © 2023 ScraperX. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// GlobeIcon component
const GlobeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

export default Index;
