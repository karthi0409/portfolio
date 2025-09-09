import { FaPython, FaReact, FaNodeJs, FaGitAlt, FaDocker, FaJs, FaCss3Alt } from "react-icons/fa";
import { SiMongodb, SiExpress, SiPandas, SiNumpy, SiTensorflow, SiAmazon, SiScikitlearn } from "react-icons/si";
import { BarChart3, Database, Server, Cloud } from "lucide-react";

const skillCategories = [
  {
    title: "Data Analysis",
    color: "text-primary",
    skills: [
      { name: "Python", icon: FaPython, color: "text-yellow-400" },
      { name: "Pandas", icon: SiPandas, color: "text-green-400" },
      { name: "NumPy", icon: SiNumpy, color: "text-blue-400" }
    ]
  },
  {
    title: "Frontend",
    color: "text-secondary",
    skills: [
      { name: "React", icon: FaReact, color: "text-blue-400" },
      { name: "JavaScript", icon: FaJs, color: "text-yellow-400" },
      { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500" }
    ]
  },
  {
    title: "Backend",
    color: "text-primary",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "text-green-400" },
      { name: "MongoDB", icon: SiMongodb, color: "text-orange-400" },
      { name: "Express.js", icon: SiExpress, color: "text-purple-400" }
    ]
  },
  {
    title: "Tools",
    color: "text-secondary",
    skills: [
      { name: "Git", icon: FaGitAlt, color: "text-orange-500" },
      { name: "Docker", icon: FaDocker, color: "text-blue-500" },
      { name: "AWS", icon: SiAmazon, color: "text-blue-300" }
    ]
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Skills & Technologies</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="text-center">
              <h3 className={`text-xl font-bold mb-6 ${category.color}`}>
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => {
                  const IconComponent = skill.icon;
                  return (
                    <div key={skillIndex} className="skill-item p-4 bg-card rounded-lg border border-border">
                      <IconComponent className={`text-3xl ${skill.color} mb-2 mx-auto`} />
                      <div className="font-medium">{skill.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
