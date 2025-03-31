
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, Clock, FileText, Activity, BarChart, History } from 'lucide-react';
import SocialMediaScraper from '@/components/SocialMediaScraper';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("scrape");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Simulated user data
  const userData = {
    name: "Emma Wilson",
    email: "emma@example.com",
    recentScrapings: [
      {
        id: "scrape-1",
        title: "E-commerce Product Data",
        url: "https://example-store.com",
        date: "2023-08-15T10:30:00",
        itemsScraped: 1243,
        status: "completed"
      },
      {
        id: "scrape-2",
        title: "Social Media Profiles",
        url: "https://facebook.com",
        date: "2023-08-12T14:45:00",
        itemsScraped: 58,
        status: "completed"
      },
      {
        id: "scrape-3",
        title: "News Articles",
        url: "https://news-site.com",
        date: "2023-08-10T09:15:00",
        itemsScraped: 87,
        status: "completed"
      }
    ],
    usage: {
      scrapesThisMonth: 12,
      dataCollected: "5.2 GB",
      remainingCredits: 188
    }
  };
  
  const handleLogout = () => {
    toast.success("Successfully logged out");
    // In a real app, this would handle authentication logout
  };
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <span className="font-bold">WebScraper</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link to="/" className="text-sm text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white inline-flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold mt-2">Welcome back, {userData.name}</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your data scraping tasks and view results.</p>
        </motion.div>
        
        {/* Stats Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0 hover-scale">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-500" />
                  Scraping Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{userData.usage.scrapesThisMonth}</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">This month</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0 hover-scale">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-green-500" />
                  Data Collected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{userData.usage.dataCollected}</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total volume</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0 hover-scale">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Activity className="w-4 h-4 mr-2 text-purple-500" />
                  Credits Remaining
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{userData.usage.remainingCredits}</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Of 200 monthly credits</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="scrape" className="text-sm">
              <BarChart className="w-4 h-4 mr-2" />
              Scrape Data
            </TabsTrigger>
            <TabsTrigger value="history" className="text-sm">
              <History className="w-4 h-4 mr-2" />
              Scraping History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="scrape" className="space-y-8">
            <SocialMediaScraper />
          </TabsContent>
          
          <TabsContent value="history">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Recent Scraping Jobs</CardTitle>
                <CardDescription>Your most recent data extraction tasks</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 rounded-md animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userData.recentScrapings.map((scrape, i) => (
                      <motion.div
                        key={scrape.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      >
                        <Card className="bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors duration-200">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{scrape.title}</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 truncate max-w-xs">
                                  {scrape.url}
                                </p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-500">
                                  <span>{new Date(scrape.date).toLocaleDateString()}</span>
                                  <span>{scrape.itemsScraped} items</span>
                                </div>
                              </div>
                              <div>
                                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                  {scrape.status}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
