import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle.jsx';
import { Zap, Star, Home, Download } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { usePWAInstall } from '@/contexts/PWAInstallContext.jsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.jsx";


const Header = () => {
  const { canInstall, handleInstallClick } = usePWAInstall();

  const navLinkClasses = ({ isActive }) =>
    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
      isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <TooltipProvider delayDuration={100}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <Zap className="h-10 w-10 text-primary group-hover:animate-pulse" />
            <h1 className="text-3xl font-bold gradient-text group-hover:opacity-80 transition-opacity">
              AI Toolz Hub
            </h1>
          </Link>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <nav className="hidden md:flex items-center space-x-2 bg-muted p-1 rounded-lg shadow-inner">
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink to="/" className={navLinkClasses}>
                    <Home className="h-5 w-5 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Home</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Discover AI Tools</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink to="/favorites" className={navLinkClasses}>
                    <Star className="h-5 w-5 mr-1 sm:mr-2" />
                     <span className="hidden sm:inline">Favorites</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your Favorite Tools</p>
                </TooltipContent>
              </Tooltip>
            </nav>
             {canInstall && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleInstallClick}
                    aria-label="Install App"
                    className="text-primary hover:bg-primary/10"
                  >
                    <Download className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Install AI Toolz Hub</p>
                </TooltipContent>
              </Tooltip>
            )}
            <ThemeToggle />
          </div>
        </div>
      </TooltipProvider>
    </header>
  );
};

export default Header;