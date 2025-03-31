
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Globe, 
  Facebook, 
  Linkedin, 
  Download, 
  FileJson, 
  FileText, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  AlertCircle 
} from 'lucide-react';
import { scrapeUrl, ScrapingOptions, ScrapingResult, downloadData } from '@/utils/scraping';

const platformIcons = {
  website: <Globe className="h-5 w-5" />,
  facebook: <Facebook className="h-5 w-5" />,
  linkedin: <Linkedin className="h-5 w-5" />
};

const ScrapingForm = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'website' | 'facebook' | 'linkedin'>('website');
  const [url, setUrl] = useState('');
  const [depth, setDepth] = useState(3);
  const [extractComments, setExtractComments] = useState(true);
  const [extractLikes, setExtractLikes] = useState(true);
  const [useProxy, setUseProxy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scrapingResult, setScrapingResult] = useState<ScrapingResult | null>(null);
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      setScrapingResult(null);
      
      const options: ScrapingOptions = {
        depth,
        extractComments,
        extractLikes,
        useProxy,
      };
      
      const result = await scrapeUrl(url, activeTab, options);
      setScrapingResult(result);
      
      toast({
        title: "Scraping completed",
        description: `Successfully scraped data from ${url}`,
      });
    } catch (error) {
      toast({
        title: "Scraping failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownload = (format: 'json' | 'csv') => {
    if (scrapingResult?.data) {
      downloadData(
        scrapingResult.data, 
        `${activeTab}-data-${new Date().toISOString().split('T')[0]}`,
        format
      );
      
      toast({
        title: "Download started",
        description: `Your data is being downloaded as ${format.toUpperCase()}`,
      });
    }
  };
  
  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="website" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Website</span>
          </TabsTrigger>
          <TabsTrigger value="facebook" className="flex items-center gap-2">
            <Facebook className="h-4 w-4" />
            <span className="hidden sm:inline">Facebook</span>
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" />
            <span className="hidden sm:inline">LinkedIn</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="website" className="mt-0">
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Web Scraper
              </CardTitle>
              <CardDescription>
                Enter a URL and configure scraping parameters to begin extracting data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} id="websiteForm">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="website-url">Target URL</Label>
                    <Input 
                      id="website-url"
                      placeholder="https://example.com" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="bg-white/50 dark:bg-black/30 border-slate-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Scraping Depth ({depth})</Label>
                    </div>
                    <Slider 
                      value={[depth]} 
                      min={1} 
                      max={5} 
                      step={1} 
                      onValueChange={(value) => setDepth(value[0])} 
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Controls how many levels of links the scraper will follow.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="use-proxy"
                        checked={useProxy}
                        onCheckedChange={setUseProxy}
                      />
                      <Label htmlFor="use-proxy">Use Proxy</Label>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                type="submit" 
                form="websiteForm"
                disabled={isLoading || !url.trim()}
                className="bg-black hover:bg-black/80 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scraping...
                  </>
                ) : (
                  <>Start Scraping</>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="facebook" className="mt-0">
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Facebook className="h-5 w-5" />
                Facebook Scraper
              </CardTitle>
              <CardDescription>
                Enter a Facebook profile or page URL to extract posts, comments, and engagement metrics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} id="facebookForm">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="facebook-url">Facebook URL</Label>
                    <Input 
                      id="facebook-url"
                      placeholder="https://facebook.com/profile" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="bg-white/50 dark:bg-black/30 border-slate-200"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="extract-comments-fb"
                        checked={extractComments}
                        onCheckedChange={setExtractComments}
                      />
                      <Label htmlFor="extract-comments-fb">Extract Comments</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="extract-likes-fb"
                        checked={extractLikes}
                        onCheckedChange={setExtractLikes}
                      />
                      <Label htmlFor="extract-likes-fb">Extract Likes</Label>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                type="submit" 
                form="facebookForm"
                disabled={isLoading || !url.trim()}
                className="bg-black hover:bg-black/80 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scraping...
                  </>
                ) : (
                  <>Start Scraping</>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="linkedin" className="mt-0">
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Linkedin className="h-5 w-5" />
                LinkedIn Scraper
              </CardTitle>
              <CardDescription>
                Enter a LinkedIn profile or company URL to extract posts and engagement data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} id="linkedinForm">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin-url">LinkedIn URL</Label>
                    <Input 
                      id="linkedin-url"
                      placeholder="https://linkedin.com/in/profile" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="bg-white/50 dark:bg-black/30 border-slate-200"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="extract-comments-li"
                        checked={extractComments}
                        onCheckedChange={setExtractComments}
                      />
                      <Label htmlFor="extract-comments-li">Extract Comments</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="extract-likes-li"
                        checked={extractLikes}
                        onCheckedChange={setExtractLikes}
                      />
                      <Label htmlFor="extract-likes-li">Extract Engagement</Label>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                type="submit" 
                form="linkedinForm"
                disabled={isLoading || !url.trim()}
                className="bg-black hover:bg-black/80 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scraping...
                  </>
                ) : (
                  <>Start Scraping</>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Results Section */}
      {scrapingResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  {platformIcons[activeTab]}
                  Scraping Results
                </div>
                <div className="ml-auto flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDownload('json')}
                    className="flex items-center gap-1"
                  >
                    <FileJson className="h-4 w-4" />
                    <span>JSON</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDownload('csv')}
                    className="flex items-center gap-1"
                  >
                    <FileText className="h-4 w-4" />
                    <span>CSV</span>
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                {scrapingResult.status === 'completed' ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Scraping completed successfully</span>
                  </div>
                ) : scrapingResult.status === 'failed' ? (
                  <div className="flex items-center gap-2 text-red-500">
                    <XCircle className="h-4 w-4" />
                    <span>Scraping failed: {scrapingResult.error}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-amber-500">
                    <AlertCircle className="h-4 w-4" />
                    <span>Scraping in progress</span>
                  </div>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{scrapingResult.progress}%</span>
                </div>
                <Progress value={scrapingResult.progress} />
                
                <div className="mt-6 max-h-80 overflow-auto rounded-md bg-white/50 dark:bg-black/30 p-4">
                  <pre className="text-xs">
                    {JSON.stringify(scrapingResult.data, null, 2)}
                  </pre>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 w-full">
                <div className="flex justify-between">
                  <span>Start Time:</span>
                  <span>{new Date(scrapingResult.startTime).toLocaleString()}</span>
                </div>
                {scrapingResult.endTime && (
                  <div className="flex justify-between">
                    <span>End Time:</span>
                    <span>{new Date(scrapingResult.endTime).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Items Collected:</span>
                  <span>{scrapingResult.data.length}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ScrapingForm;
