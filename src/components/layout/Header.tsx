
import { motion } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-neutral-200/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-lg font-semibold tracking-tight transition-colors hover:opacity-80"
            >
              <Sparkles className="h-5 w-5" />
              <span>Portfolio Crafter</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a 
              href="#" 
              className="text-sm font-medium transition-colors hover:text-primary/80"
            >
              Features
            </a>
            <a 
              href="#" 
              className="text-sm font-medium transition-colors hover:text-primary/80"
            >
              Templates
            </a>
            <a 
              href="#" 
              className="text-sm font-medium transition-colors hover:text-primary/80"
            >
              Examples
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm font-medium transition-colors hover:text-primary/80"
            >
              GitHub
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center rounded-md p-2 text-primary/60 hover:text-primary"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
        className={`md:hidden absolute top-16 inset-x-0 bg-white/80 backdrop-blur-lg shadow-sm border-b border-neutral-200/50 overflow-hidden ${isMenuOpen ? 'block' : 'hidden'}`}
      >
        <div className="container px-4 py-4 mx-auto">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#" 
              className="text-sm font-medium transition-colors hover:text-primary/80 py-2"
              onClick={toggleMenu}
            >
              Features
            </a>
            <a 
              href="#" 
              className="text-sm font-medium transition-colors hover:text-primary/80 py-2"
              onClick={toggleMenu}
            >
              Templates
            </a>
            <a 
              href="#" 
              className="text-sm font-medium transition-colors hover:text-primary/80 py-2"
              onClick={toggleMenu}
            >
              Examples
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm font-medium transition-colors hover:text-primary/80 py-2"
              onClick={toggleMenu}
            >
              GitHub
            </a>
          </nav>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
