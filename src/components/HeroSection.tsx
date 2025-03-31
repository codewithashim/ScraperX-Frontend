
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-24 pb-20 px-4">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-30 pattern-dots" />
      <div className="absolute top-40 right-[20%] w-64 h-64 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-20 animate-pulse-gentle" />
      <div className="absolute bottom-40 left-[30%] w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-20 animate-pulse-gentle" />
      
      {/* Content */}
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full text-xs font-medium text-slate-800 dark:text-slate-200 inline-block mb-6">
              Advanced Web Scraping Solution
            </span>
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <span className="block">Extract data from websites with</span>
            <span className="text-gradient mt-2 block">unmatched precision</span>
          </motion.h1>
          
          <motion.p
            className="max-w-2xl mx-auto text-slate-600 dark:text-slate-300 text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            A powerful web scraper for collecting structured data from websites and social
            media platforms with minimal effort and maximum efficiency.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Link to="/signup">
              <Button className="bg-black hover:bg-black/80 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-lg hover:shadow-xl px-8 py-6 rounded-lg text-base font-medium transition-all duration-300 group">
                Start Scraping
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/documentation">
              <Button variant="ghost" className="px-8 py-6 text-base">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
        
        {/* Browser mockup */}
        <motion.div
          className="relative mx-auto max-w-4xl overflow-hidden glass-card mt-12 md:mt-16 shadow-2xl"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40, scale: isVisible ? 1 : 0.95 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-slate-100 dark:bg-slate-800 h-10 flex items-center px-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div className="mx-auto bg-white dark:bg-slate-700 rounded-full px-4 py-1 text-xs max-w-xs truncate">
              webscraper.io
            </div>
          </div>
          <div className="aspect-[16/9] bg-white dark:bg-slate-900 p-4 overflow-hidden">
            <img 
              src="/lovable-uploads/7a10dbd7-7990-429c-a926-cd945cea4535.png" 
              alt="WebScraper interface" 
              className="w-full h-full object-cover rounded-md shadow-inner transition-opacity duration-300"
              style={{ opacity: isVisible ? 1 : 0 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
