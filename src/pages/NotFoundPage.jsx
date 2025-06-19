
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { AlertTriangle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const NotFoundPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center py-20"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.1, 1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <AlertTriangle className="h-24 w-24 text-destructive mb-8" />
      </motion.div>
      <h1 className="text-6xl font-extrabold text-foreground mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-muted-foreground mb-6">Oops! Page Not Found.</h2>
      <p className="text-lg text-muted-foreground max-w-md mb-10">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <Button asChild size="lg" className="gradient-bg-2 hover:opacity-90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-200">
        <Link to="/">
          <Zap className="mr-2 h-5 w-5" /> Go Back Home
        </Link>
      </Button>
    </motion.div>
  );
};
