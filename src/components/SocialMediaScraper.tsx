
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ScrapingForm from './ScrapingForm';

const platformInfo = {
  facebook: {
    title: "Facebook Scraping",
    subtitle: "Extract posts, comments, reactions, and more",
    details: [
      "Profile information and connections",
      "Post content and engagement metrics",
      "Comments and reactions",
      "Timestamps and visibility",
    ],
    icon: "F",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  linkedin: {
    title: "LinkedIn Scraping",
    subtitle: "Professional network data extraction",
    details: [
      "Profile information and experience",
      "Post content and engagement",
      "Comments and reactions",
      "Company details and updates",
    ],
    icon: "L",
    color: "bg-blue-700 text-white dark:bg-blue-800/50 dark:text-blue-200",
  },
  website: {
    title: "Website Scraping",
    subtitle: "Extract structured data from any website",
    details: [
      "HTML content and metadata",
      "Navigation structure",
      "Images and media",
      "Dynamic content (with JavaScript rendering)",
    ],
    icon: "W",
    color: "bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300",
  },
};

const PlatformIntro = ({ platform }: { platform: 'facebook' | 'linkedin' | 'website' }) => {
  const info = platformInfo[platform];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="md:col-span-1">
        <div className="flex flex-col items-start">
          <Avatar className={`w-16 h-16 mb-4 ${info.color}`}>
            <AvatarFallback>{info.icon}</AvatarFallback>
          </Avatar>
          <h3 className="text-2xl font-bold mb-2">{info.title}</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-4">{info.subtitle}</p>
        </div>
      </div>
      <div className="md:col-span-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/20 dark:bg-black/10 backdrop-blur-sm border border-white/10 dark:border-white/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Extraction Capabilities</CardTitle>
              <CardDescription>What you can extract with our {platform} scraper</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {info.details.map((detail, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Badge variant="outline" className="rounded-full w-5 h-5 flex items-center justify-center p-0">
                      ✓
                    </Badge>
                    <span className="text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

const SocialMediaScraper = () => {
  const [activePlatform, setActivePlatform] = useState<'facebook' | 'linkedin' | 'website'>('website');
  
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-4">Social Media & Web Scraping</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Extract valuable data from websites and social media platforms with our advanced scraping tools.
          Configure your scraping parameters and start collecting data in seconds.
        </p>
      </motion.div>
      
      <Tabs
        value={activePlatform}
        onValueChange={(value) => setActivePlatform(value as any)}
        className="max-w-4xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="website">Websites</TabsTrigger>
          <TabsTrigger value="facebook">Facebook</TabsTrigger>
          <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
        </TabsList>
        
        <TabsContent value="website">
          <PlatformIntro platform="website" />
          <ScrapingForm />
        </TabsContent>
        
        <TabsContent value="facebook">
          <PlatformIntro platform="facebook" />
          <ScrapingForm />
        </TabsContent>
        
        <TabsContent value="linkedin">
          <PlatformIntro platform="linkedin" />
          <ScrapingForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialMediaScraper;
