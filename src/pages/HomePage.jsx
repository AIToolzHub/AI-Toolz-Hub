import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import ToolCard from '@/components/ToolCard.jsx';
import { useTools } from '@/contexts/ToolsContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Zap, ListChecks, LayoutGrid, Frown, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SkeletonCard } from '@/components/SkeletonCard.jsx';
import InstallPWABanner from '@/components/InstallPWABanner.jsx';

const HomePage = () => {
  const { 
    filteredTools, 
    categories, 
    searchTerm, 
    setSearchTerm, 
    selectedCategory, 
    setSelectedCategory, 
    isLoading 
  } = useTools();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const controlsVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6, ease: "easeOut" } },
  };
  
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.07,
        delayChildren: 0.2,
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12 } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      <motion.section 
        variants={heroVariants}
        className="text-center py-16 md:py-20 relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 dark:from-primary/5 dark:via-background dark:to-secondary/5 shadow-xl border border-border"
      >
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-primary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-1/2 -right-1/4 w-3/4 h-3/4 bg-secondary/20 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        </div>
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            className="inline-block p-4 bg-primary/20 dark:bg-primary/10 rounded-full mb-8 shadow-lg"
          >
            <Zap className="h-16 w-16 text-primary animate-float" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            <span className="gradient-text">Explore the Future</span> with AI
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 px-4">
            Your ultimate hub for 100+ curated AI tools. Discover, filter, and favorite the best in Chat, Image, Code, and beyond.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" asChild className="gradient-bg hover:opacity-95 text-primary-foreground shadow-lg transform hover:scale-105 transition-all duration-300 ease-out px-8 py-6 text-lg">
              <Link to="#tools-section">
                <Zap className="mr-2 h-5 w-5" /> Discover Tools
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>

      <InstallPWABanner />

      <motion.section id="tools-section" variants={controlsVariants} className="py-8 sticky top-[80px] z-40 bg-background/80 backdrop-blur-md rounded-xl shadow-md border border-border p-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search tools by name, tag, or description..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-4 pr-12 rounded-lg border-2 border-input bg-transparent focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-inner text-md"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full md:w-[220px] text-md p-4 rounded-lg border-2 shadow-sm">
                <Filter className="mr-2 h-5 w-5 text-muted-foreground" />
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id} className="text-md py-2">
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="hidden sm:flex items-center bg-muted p-1 rounded-lg shadow-inner">
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
        </div>
      </motion.section>

      {isLoading ? (
        <div className="py-10 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">Loading amazing AI tools...</p>
            <div className={`grid gap-6 md:gap-8 mt-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {filteredTools.length > 0 ? (
            <motion.div
              key="tool-list"
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className={`grid gap-6 md:gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}
            >
              <AnimatePresence>
                {filteredTools.map((tool) => (
                  <motion.div key={tool.id} variants={itemVariants} layout>
                    <ToolCard tool={tool} viewMode={viewMode} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <Frown className="h-24 w-24 text-muted-foreground mx-auto mb-6 animate-bounce-slow" />
              <h2 className="text-3xl font-semibold mb-4">No Tools Found 😥</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find any tools matching your criteria. Try adjusting your search or filters.
              </p>
              <Button variant="outline" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
                Clear Filters & Search
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default HomePage;