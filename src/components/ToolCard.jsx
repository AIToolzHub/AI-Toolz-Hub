import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { useTools } from '@/contexts/ToolsContext.jsx';
import { Heart, ExternalLink, Star as StarIcon, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.jsx";

const ToolCard = React.memo(({ tool, viewMode }) => {
  const { toggleFavorite } = useTools();
  const categoryName = useTools().categories.find(cat => cat.id === tool.category)?.name || tool.category;

  const cardVariants = {
    hover: {
      scale: viewMode === 'grid' ? 1.03 : 1.01,
      boxShadow: "0px 10px 20px hsl(var(--foreground) / 0.05), 0px 4px 6px hsl(var(--foreground) / 0.05)",
      borderColor: "hsl(var(--primary) / 0.5)",
      transition: { type: "spring", stiffness: 300, damping: 15 }
    },
    tap: { scale: viewMode === 'grid' ? 0.98 : 0.99 }
  };
  
  const iconContainerVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.1 } }
  };
  
  const renderIcon = () => {
    return (
      <span className="text-3xl" role="img" aria-label={`${tool.name} icon`}>
        {tool.emoji || '✨'}
      </span>
    );
  };

  const content = (
    <>
      <CardHeader className={`p-4 ${viewMode === 'list' ? 'flex-row items-center gap-4' : ''}`}>
        <motion.div 
          variants={iconContainerVariants}
          initial="initial"
          animate="animate"
          className={`flex-shrink-0 ${viewMode === 'list' ? 'mb-0 w-12 h-12' : 'mb-3 w-16 h-16'} p-2 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl inline-flex items-center justify-center shadow-inner overflow-hidden`}
        >
          {renderIcon()}
        </motion.div>
        <div className={viewMode === 'list' ? 'flex-grow min-w-0' : ''}>
          <CardTitle className={`text-xl font-bold leading-tight ${viewMode === 'list' ? 'mb-0 truncate' : 'mb-1 group-hover:text-primary transition-colors duration-200'}`}>
            {tool.name}
          </CardTitle>
          <CardDescription className={`text-sm text-muted-foreground ${viewMode === 'list' ? 'truncate' : 'line-clamp-2 h-[40px]'}`}>
            {tool.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className={`p-4 pt-0 ${viewMode === 'list' ? 'flex-row items-center justify-between gap-4 flex-shrink-0 w-auto md:w-[300px]' : ''}`}>
        {viewMode === 'grid' && (
          <>
            <div className="flex items-center text-xs text-muted-foreground mb-2">
              <Tag className="w-3 h-3 mr-1.5 text-sky-500" />
              <span className="font-medium text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full">{categoryName}</span>
            </div>
            {tool.tags && tool.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3 min-h-[26px]">
                {tool.tags.slice(0, viewMode === 'grid' ? 3 : 2).map(tag => (
                  <span key={tag} className="text-xs bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
        {viewMode === 'list' && (
          <div className="flex items-center text-xs text-muted-foreground mr-auto">
            <Tag className="w-3 h-3 mr-1.5 text-sky-500" />
            <span className="font-medium text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full">{categoryName}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          {tool.rating && (
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <StarIcon className="w-4 h-4 fill-amber-500" /> 
              {tool.rating.toFixed(1)}
            </div>
          )}
          {tool.price && <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-500/10 text-green-700 dark:text-green-400 shadow-sm">{tool.price}</span>}
        </div>
      </CardContent>
      <CardFooter className={`p-4 pt-0 ${viewMode === 'list' ? 'flex-row items-center gap-2 justify-end flex-shrink-0 ml-auto' : 'flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-2'}`}>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size={viewMode === 'list' ? 'icon' : 'default'}
                className={`w-full sm:w-auto ${tool.isFavorite ? 'text-red-500 hover:text-red-600 dark:hover:text-red-400' : 'text-muted-foreground hover:text-foreground'} transition-colors duration-200`}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(tool.id); }}
                aria-label={tool.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-5 h-5 ${tool.isFavorite ? 'fill-red-500' : ''} ${viewMode === 'grid' ? 'mr-2' : ''}`} />
                {viewMode === 'grid' && (tool.isFavorite ? 'Favorited' : 'Favorite')}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tool.isFavorite ? 'Remove from favorites' : 'Add to favorites'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button 
          asChild 
          className="w-full sm:w-auto gradient-bg text-primary-foreground hover:opacity-90 shadow-md transform hover:scale-105 transition-transform duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <a href={tool.url} target="_blank" rel="noopener noreferrer">
            Visit Site <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </CardFooter>
    </>
  );

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      className="h-full group"
      layout
    >
      <Card className={`overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border flex flex-col h-full ${viewMode === 'list' ? 'flex-row items-center p-0' : ''} bg-card will-change-transform will-change-opacity`}>
        {content}
      </Card>
    </motion.div>
  );
});

ToolCard.displayName = 'ToolCard';
export default ToolCard;