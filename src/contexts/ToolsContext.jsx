import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast.js";

const ToolsContext = createContext();

export const useTools = () => useContext(ToolsContext);

const initialCategories = [
  { id: 'all', name: 'All Categories', path: null },
  { id: 'chat', name: 'Chat & Assistants', path: 'chat-tools.json' },
  { id: 'presentation', name: 'Presentation Tools' }
  { id: 'image', name: 'Image Generation & Editing', path: 'image-tools.json' },
  { id: 'video', name: 'Video Generation & Editing', path: 'video-tools.json' },
  { id: 'code', name: 'Code & Development', path: 'code-tools.json' },
  { id: 'writing', name: 'Writing & Content Creation', path: 'writing-tools.json' },
  { id: 'study', name: 'Study & Homework Help', path: 'study-tools.json' },
  { id: 'stem', name: 'STEM Support', path: 'stem-tools.json' },
  { id: 'seo', name: 'SEO & Marketing', path: 'seo-tools.json' },
  { id: 'audio', name: 'Audio & Music', path: 'audio-tools.json' },
  { id: 'productivity', name: 'Productivity & Automation', path: 'productivity-tools.json' },
  { id: 'research', name: 'Research & Analysis', path: 'research-tools.json' },
  { id: '3d', name: '3D Modeling & Design', path: '3d-tools.json' },
  { id: 'favorites', name: 'My Favorites', path: null }
];

export const ToolsProvider = ({ children }) => {
  const [allTools, setAllTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [categories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAllTools = async () => {
      setIsLoading(true);
      try {
        const toolPromises = initialCategories
          .filter(cat => cat.path)
          .map(cat => fetch(`/tools/${cat.path}`).then(res => {
            if (!res.ok) throw new Error(`Failed to load ${cat.path}`);
            return res.json();
          }).catch(error => {
            console.error(`Error fetching ${cat.path}:`, error);
            toast({
              title: `Error Loading ${cat.name} 😥`,
              description: `Could not fetch tools for ${cat.name}. Some tools may be missing.`,
              variant: "destructive",
            });
            return []; 
          }));
        
        const results = await Promise.all(toolPromises);
        const combinedTools = results.flat();
        
        const loadedFavorites = JSON.parse(localStorage.getItem('favoriteTools')) || [];
        setFavorites(loadedFavorites);

        const toolsWithFavStatus = combinedTools.map(tool => ({
          ...tool,
          isFavorite: loadedFavorites.includes(tool.id)
        }));

        setAllTools(toolsWithFavStatus);
        setFilteredTools(toolsWithFavStatus);
      } catch (error) {
        console.error("Failed to load tools:", error);
        toast({
          title: "Error Loading Tools 😥",
          description: "Could not fetch the AI tools list. Please try again later.",
          variant: "destructive",
        });
        setAllTools([]);
        setFilteredTools([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllTools();
  }, [toast]);
  
  useEffect(() => {
    localStorage.setItem('favoriteTools', JSON.stringify(favorites));
    const updateFavStatus = (toolsList) => toolsList.map(tool => ({
      ...tool,
      isFavorite: favorites.includes(tool.id)
    }));
    setAllTools(prev => updateFavStatus(prev));
  }, [favorites]);

  const filterAndSearchTools = useCallback(() => {
    let tempTools = [...allTools];

    if (selectedCategory === 'favorites') {
      tempTools = tempTools.filter(tool => tool.isFavorite);
    } else if (selectedCategory !== 'all') {
      tempTools = tempTools.filter(tool => tool.category === selectedCategory);
    }

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase().trim();
      if (lowerSearchTerm) {
        tempTools = tempTools.filter(tool =>
          tool.name.toLowerCase().includes(lowerSearchTerm) ||
          tool.description.toLowerCase().includes(lowerSearchTerm) ||
          (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm)))
        );
      }
    }
    setFilteredTools(tempTools);
  }, [allTools, searchTerm, selectedCategory]);

  useEffect(() => {
    filterAndSearchTools();
  }, [searchTerm, selectedCategory, allTools, filterAndSearchTools]);


  const toggleFavorite = (toolId) => {
    const tool = allTools.find(t => t.id === toolId);
    if (!tool) return;

    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.includes(toolId)
        ? prevFavorites.filter(id => id !== toolId)
        : [...prevFavorites, toolId];
      
      toast({
        title: newFavorites.includes(toolId) ? `💖 "${tool.name}" added to favorites!` : `💔 "${tool.name}" removed from favorites!`,
        description: newFavorites.includes(toolId) ? "Check your favorites anytime." : "You can always add it back.",
        variant: newFavorites.includes(toolId) ? "default" : "default",
      });
      return newFavorites;
    });
  };
  
  const value = {
    allTools,
    filteredTools,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    favorites,
    toggleFavorite,
    isLoading,
    setFilteredTools, 
  };

  return (
    <ToolsContext.Provider value={value}>
      {children}
    </ToolsContext.Provider>
  );
};
