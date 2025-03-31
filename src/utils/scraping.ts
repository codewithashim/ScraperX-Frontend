
/**
 * Simulated scraping functionality 
 * In a real application, this would connect to a backend service for actual scraping
 */

export type ScrapingOptions = {
  depth?: number;
  extractComments?: boolean;
  extractLikes?: boolean;
  useProxy?: boolean;
  format?: 'json' | 'csv';
};

export type ScrapingResult = {
  id: string;
  url: string;
  title: string;
  status: 'pending' | 'completed' | 'failed';
  progress: number;
  data: any[];
  startTime: string;
  endTime?: string;
  error?: string;
};

// Demo data
const generateRandomData = (platform: string, url: string) => {
  if (platform === 'website') {
    return Array(20).fill(0).map((_, i) => ({
      url: `${url}/page-${i}`,
      title: `Page ${i}`,
      content: `This is content from page ${i}`,
      links: Array(Math.floor(Math.random() * 10)).fill(0).map((_, j) => `${url}/link-${j}`)
    }));
  } else if (platform === 'facebook') {
    return Array(15).fill(0).map((_, i) => ({
      postId: `fb-post-${i}`,
      content: `Facebook post content ${i}`,
      likes: Math.floor(Math.random() * 100),
      comments: Array(Math.floor(Math.random() * 5)).fill(0).map((_, j) => ({
        commentId: `comment-${j}`,
        content: `Comment ${j} on post ${i}`,
        author: `User ${j}`,
        likes: Math.floor(Math.random() * 20)
      }))
    }));
  } else if (platform === 'linkedin') {
    return Array(10).fill(0).map((_, i) => ({
      postId: `li-post-${i}`,
      content: `LinkedIn post content ${i}`,
      engagement: {
        likes: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 10),
        shares: Math.floor(Math.random() * 5)
      },
      comments: Array(Math.floor(Math.random() * 3)).fill(0).map((_, j) => ({
        commentId: `comment-${j}`,
        content: `Comment ${j} on post ${i}`,
        author: `Professional ${j}`,
        likes: Math.floor(Math.random() * 10)
      }))
    }));
  }
  
  return [];
};

// Simulated scraping function
export const scrapeUrl = async (
  url: string, 
  platform: 'website' | 'facebook' | 'linkedin',
  options: ScrapingOptions = {}
): Promise<ScrapingResult> => {
  // Create a scraping job
  const scrapingJob: ScrapingResult = {
    id: `job-${Date.now()}`,
    url,
    title: `Scraping ${platform}: ${url}`,
    status: 'pending',
    progress: 0,
    data: [],
    startTime: new Date().toISOString(),
  };
  
  // Simulate async scraping process
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Generate random data based on platform
        const data = generateRandomData(platform, url);
        
        resolve({
          ...scrapingJob,
          status: 'completed',
          progress: 100,
          data,
          endTime: new Date().toISOString()
        });
      }
    }, 500);
  });
};

// Function to export data to CSV
export const exportToCsv = (data: any[]): string => {
  if (!data.length) return '';
  
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(item => 
    Object.values(item).map(value => 
      typeof value === 'object' ? JSON.stringify(value).replace(/,/g, ';') : value
    ).join(',')
  );
  
  return [headers, ...rows].join('\n');
};

// Function to download data
export const downloadData = (data: any[], fileName: string, format: 'json' | 'csv' = 'json') => {
  let content, type, fileExtension;
  
  if (format === 'csv') {
    content = exportToCsv(data);
    type = 'text/csv';
    fileExtension = 'csv';
  } else {
    content = JSON.stringify(data, null, 2);
    type = 'application/json';
    fileExtension = 'json';
  }
  
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.${fileExtension}`;
  document.body.appendChild(a);
  a.click();
  
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};
