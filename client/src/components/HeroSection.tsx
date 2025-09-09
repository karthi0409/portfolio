import { Button } from "@/components/ui/button";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

import back_remove from "@assets/back remove.png";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-6xl mx-auto text-center animate-fade-in">
        <div className="mb-8">
          {/* Professional developer portrait */}
          <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-primary/20 animate-float">
            <img 
              src={back_remove} 
              alt="Karthigayan S - Professional Developer Portrait" 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Hi, I'm <span className="gradient-text">KARTHIGAYAN S</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Data Analyst & Web Developer passionate about transforming data into insights and building innovative web solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => scrollToSection("projects")}
              className="px-10 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all duration-300 hover:scale-105 min-w-[200px]"
            >
              View My Work
            </Button>
            <Button 
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="px-10 py-4 border-2 border-primary hover:bg-primary/10 text-primary rounded-lg font-semibold transition-all duration-300 hover:scale-105 min-w-[200px]"
            >
              Get In Touch
            </Button>
          </div>
        </div>
        
        {/* Social Links */}
        <div className="flex justify-center space-x-6 mt-12">
          <a 
            href="https://github.com/karthi0409" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
          >
            <Github className="h-6 w-6" />
          </a>
          <a 
            href="https://www.linkedin.com/in/karthi0409" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a 
            href="https://instagram.com/kxr_thii_" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a 
            href="mailto:karthigayan04092003@gmail.com" 
            className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
