
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { GlobeIcon, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-xl font-bold transition-all duration-300"
        >
          <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center">
            <GlobeIcon className="w-5 h-5 text-white dark:text-black" />
          </div>
          <span className="animate-fade-in">ScraperX</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-all duration-300 hover:text-black dark:hover:text-white ${
              location.pathname === '/' 
                ? 'text-black dark:text-white' 
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/documentation" 
            className={`text-sm font-medium transition-all duration-300 hover:text-black dark:hover:text-white ${
              location.pathname === '/documentation' 
                ? 'text-black dark:text-white' 
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Documentation
          </Link>
          <Link 
            to="/examples" 
            className={`text-sm font-medium transition-all duration-300 hover:text-black dark:hover:text-white ${
              location.pathname === '/examples' 
                ? 'text-black dark:text-white' 
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Examples
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="transition-all duration-300">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-black hover:bg-black/80 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 transition-all duration-300">
              Get Started
            </Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-black dark:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 animate-slide-in-bottom">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className={`py-2 text-sm font-medium ${
                location.pathname === '/' 
                  ? 'text-black dark:text-white' 
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/documentation" 
              className={`py-2 text-sm font-medium ${
                location.pathname === '/documentation' 
                  ? 'text-black dark:text-white' 
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Documentation
            </Link>
            <Link 
              to="/examples" 
              className={`py-2 text-sm font-medium ${
                location.pathname === '/examples' 
                  ? 'text-black dark:text-white' 
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Examples
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <Link to="/login" className="w-full">
                <Button variant="ghost" className="w-full justify-start">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" className="w-full">
                <Button className="w-full bg-black hover:bg-black/80 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
