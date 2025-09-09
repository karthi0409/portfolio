import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Data Analytics Dashboard",
    description: "Interactive dashboard for visualizing complex datasets with real-time analytics and insights.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800",
    alt: "Interactive Data Analysis Dashboard with Charts and Graphs",
    technologies: ["Python", "Pandas", "Plotly"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800",
    alt: "Modern E-commerce Website Interface on Laptop Screen",
    technologies: ["React", "Node.js", "MongoDB"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: "Sentiment Analysis System",
    description: "A smart tool that reads customer reviews and social media comments to understand if people feel happy, sad, or neutral about products and services.",
    image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800",
    alt: "Sentiment Analysis Dashboard showing Positive, Negative and Neutral sentiment graphs",
    technologies: ["Python", "NLTK", "TextBlob", "Streamlit"],
    githubUrl: "#",
    liveUrl: "#"
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of projects showcasing my skills in data analysis, web development, and problem-solving
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-background rounded-2xl overflow-hidden border border-border card-hover">
              <img 
                src={project.image} 
                alt={project.alt}
                className="w-full h-48 object-cover" 
              />
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className={`px-3 py-1 text-sm rounded-full ${
                        techIndex % 2 === 0 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-secondary/20 text-secondary'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <a 
                    href={project.githubUrl} 
                    className="text-primary hover:text-primary/80 transition-colors duration-300 flex items-center"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </a>
                  <a 
                    href={project.liveUrl} 
                    className="text-primary hover:text-primary/80 transition-colors duration-300 flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://github.com/karthi0409" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 border border-border hover:border-primary text-foreground rounded-lg font-medium transition-all duration-300 hover:scale-105"
          >
            <Github className="h-4 w-4 mr-2" />
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
}
