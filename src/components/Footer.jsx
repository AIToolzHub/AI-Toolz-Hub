import React from 'react';
import { Mail, Send, Disc3, Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.jsx";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Email", href: "mailto:aitoolzhub26@gmail.com", icon: <Mail className="h-5 w-5" />, label: "Send us an Email" },
    { name: "Telegram", href: "https://t.me/AI_Toolz_Hub", icon: <Send className="h-5 w-5" />, label: "Message us on Telegram" },
    { name: "Discord", href: "https://discord.gg/hZVMSAWAa9", icon: <Disc3 className="h-5 w-5" />, label: "Join our Discord" },
    { name: "Twitter", href: "https://x.com/AIToolzHub?t=A0bhDQsPqk8kNhEGhclPoQ&s=09", icon: <Twitter className="h-5 w-5" />, label: "Follow us on Twitter" },
    { name: "GitHub", href: "https://github.com/AIToolzHub/AI-Toolz-Hub", icon: <Github className="h-5 w-5" />, label: "View on GitHub" },
  ];

  return (
    <footer className="border-t border-border/40 bg-background/95 py-12 text-center text-sm text-muted-foreground transition-colors duration-300 ease-in-out">
      <TooltipProvider delayDuration={100}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-2 sm:space-x-3 mb-6">
            {socialLinks.map((social) => (
              <Tooltip key={social.name}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    aria-label={social.label}
                    className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 transform hover:scale-110"
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      {social.icon}
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{social.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          <div className="mb-4">
  <a
    href="/submit"
    className="inline-block text-primary font-medium hover:underline hover:text-violet-500 transition-colors"
  >
    🚀 Suggest a Tool
  </a>
</div>
          <p className="text-base">&copy; {currentYear} AI Toolz Hub. All rights reserved.</p>
        </div>
      </TooltipProvider>
    </footer>
  );
};

export default Footer;
