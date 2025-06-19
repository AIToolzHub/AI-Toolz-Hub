import React, { useState } from 'react';
import ToolCard from '@/components/ToolCard.jsx';
import { useTools } from '@/contexts/ToolsContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ListChecks, LayoutGrid, Frown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { allTools, isLoading } = useTools();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const favoriteTools = allTools.filter(tool => tool.isFavorite);
  
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    out: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeInOut" } }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3,
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12 } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Zap className="h-16 w-16 text-primary animate-spin" />
        <p className="ml-4 text-xl text-muted-foreground">Loading your favorite tools...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="space-y-10"
    >
      <header className="pb-8 border-b border-border">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Heart className="h-10 w-10 text-red-500 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-extrabold gradient-text">My Favorite AI Tools</h1>
          </div>
          <div className="flex items-center bg-muted p-1 rounded-lg shadow-inner">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'ghost'} 
              size="icon" 
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-5 w-5" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'ghost'} 
              size="icon" 
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}
              aria-label="List view"
            >
              <ListChecks className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Here are all the AI tools you've marked as favorites. Easily access your go-to solutions!
        </p>
      </header>

      <AnimatePresence mode="wait">
        {favoriteTools.length > 0 ? (
          <motion.div
            key="favorites-list"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className={`grid gap-6 md:gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}
          >
            <AnimatePresence>
              {favoriteTools.map((tool) => (
                <motion.div key={tool.id} variants={itemVariants} layout>
                  <ToolCard tool={tool} viewMode={viewMode} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="no-favorites"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="text-center py-20 min-h-[40vh] flex flex-col items-center justify-center bg-card border border-dashed rounded-xl shadow-sm"
          >
            <Frown className="h-24 w-24 text-muted-foreground mx-auto mb-8 animate-bounce-slow" />
            <h2 className="text-3xl font-semibold mb-4">No Favorites Yet!</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added any AI tools to your favorites. Start exploring and mark the ones you love!
            </p>
            <Button size="lg" asChild className="gradient-bg-3 hover:opacity-90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-200">
              <Link to="/">
                <Zap className="mr-2 h-5 w-5" /> Explore AI Tools
              </Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FavoritesPage;