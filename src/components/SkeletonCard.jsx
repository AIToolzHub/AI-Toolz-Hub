import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card.jsx';

export const SkeletonCard = () => {
  return (
    <Card className="overflow-hidden shadow-lg animate-pulse">
      <CardHeader className="p-4">
        <div className="h-12 w-12 bg-muted rounded-lg mb-3"></div>
        <div className="h-5 w-3/4 bg-muted rounded mb-1"></div>
        <div className="h-3 w-full bg-muted rounded mb-1"></div>
        <div className="h-3 w-5/6 bg-muted rounded"></div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="h-4 w-1/3 bg-muted rounded mb-2"></div>
        <div className="flex flex-wrap gap-1 mb-3">
          <div className="h-5 w-12 bg-muted rounded-full"></div>
          <div className="h-5 w-16 bg-muted rounded-full"></div>
          <div className="h-5 w-10 bg-muted rounded-full"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-5 w-10 bg-muted rounded"></div>
          <div className="h-6 w-16 bg-muted rounded-full"></div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-2">
        <div className="h-10 w-full sm:w-1/2 bg-muted rounded"></div>
        <div className="h-10 w-full sm:w-1/2 bg-muted rounded"></div>
      </CardFooter>
    </Card>
  );
};