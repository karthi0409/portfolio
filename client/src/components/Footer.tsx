import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <h3 className="text-2xl font-bold gradient-text mb-4">Karthigayan S</h3>
          <p className="text-muted-foreground mb-6">Data Analyst & Web Developer</p>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a 
              href="https://github.com/karthi0409" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/karthi0409" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://instagram.com/kxr_thii_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="mailto:karthigayan04092003@gmail.com" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-border pt-8">
          <p className="text-muted-foreground">
            © 2024 Karthigayan S. All rights reserved. Built with passion and modern technologies.
          </p>
        </div>
      </div>
    </footer>
  );
}
