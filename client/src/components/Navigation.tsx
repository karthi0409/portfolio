import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { trackEvent } from "@/hooks/useAnalytics";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
      // Track navigation event
      trackEvent('navigation_click', { section: sectionId });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur bg-background/80 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-xl gradient-text">
            Karthigayan S
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection("home")}
              className="hover:text-primary transition-colors duration-300"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="hover:text-primary transition-colors duration-300"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("projects")}
              className="hover:text-primary transition-colors duration-300"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection("skills")}
              className="hover:text-primary transition-colors duration-300"
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection("resume")}
              className="hover:text-primary transition-colors duration-300"
            >
              Resume
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="hover:text-primary transition-colors duration-300"
            >
              Contact
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection("home")}
                className="text-left hover:text-primary transition-colors duration-300"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection("about")}
                className="text-left hover:text-primary transition-colors duration-300"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection("projects")}
                className="text-left hover:text-primary transition-colors duration-300"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection("skills")}
                className="text-left hover:text-primary transition-colors duration-300"
              >
                Skills
              </button>
              <button 
                onClick={() => scrollToSection("resume")}
                className="text-left hover:text-primary transition-colors duration-300"
              >
                Resume
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="text-left hover:text-primary transition-colors duration-300"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
