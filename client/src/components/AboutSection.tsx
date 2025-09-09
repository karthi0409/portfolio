export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate about leveraging data and technology to solve complex problems and create meaningful impact
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            {/* Modern workspace environment */}
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
              alt="Modern Developer Workspace with Multiple Monitors" 
              className="rounded-2xl shadow-2xl w-full h-auto" 
            />
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-3xl font-bold mb-6 gradient-text">My Journey</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              With a strong foundation in data analysis and web development, I specialize in extracting meaningful insights from complex datasets and building responsive, user-friendly web applications that deliver exceptional user experiences.
            </p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              My expertise spans across data visualization, statistical analysis, modern web frameworks, and full-stack development. I'm passionate about continuous learning and staying updated with the latest technologies and methodologies.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-card rounded-lg border border-border">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-muted-foreground">Projects</div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg border border-border">
                <div className="text-3xl font-bold text-secondary mb-2">10+</div>
                <div className="text-muted-foreground">Technologies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
