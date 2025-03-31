
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Database, Globe, BarChart } from 'lucide-react';

const features = [
  {
    icon: <Globe className="w-10 h-10" />,
    title: "Multiple Platforms",
    description: "Extract data from websites, Instagram, LinkedIn, and Facebook with ease."
  },
  {
    icon: <Database className="w-10 h-10" />,
    title: "Rich Data Collection",
    description: "Collect posts, comments, likes, and detailed engagement metrics."
  },
  {
    icon: <BarChart className="w-10 h-10" />,
    title: "Advanced Features",
    description: "Proxy rotation and authentication management for uninterrupted scraping."
  }
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-8 hover-scale"
    >
      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl w-16 h-16 flex items-center justify-center mb-6 text-black dark:text-white">
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
      <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 relative overflow-hidden" id="features">
      <div className="absolute top-40 left-0 w-64 h-64 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-20 animate-pulse-gentle" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-20 animate-pulse-gentle" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Scraping Features</h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
            Our platform provides comprehensive tools for extracting and analyzing data from various online sources.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
