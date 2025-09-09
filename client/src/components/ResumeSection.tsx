import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, MapPin, GraduationCap, Briefcase, Award, Code, Database, Brain } from "lucide-react";
import { FaPython, FaReact, FaNodeJs, FaJs, FaCss3Alt } from "react-icons/fa";
import { SiMongodb, SiExpress, SiPandas, SiNumpy, SiTensorflow } from "react-icons/si";
import { trackEvent } from "@/hooks/useAnalytics";

const resumeData = {
  personalInfo: {
    name: "Karthigayan S",
    title: "Front-End Developer | MCA Student",
    email: "karthigayan04092003@gmail.com",
    phone: "+91 7010583023",
    location: "Coimbatore, India",
    linkedin: "https://www.linkedin.com/in/karthi0409",
    github: "https://github.com/karthi0409"
  },
  summary: "Aspiring MCA graduate and passionate web developer with expertise in ASP.NET, HTML, CSS, and other web platforms. Seeking opportunities to enhance my technical and creative skills while contributing to innovative projects.",
  experience: [
    {
      title: "Freelancing Front-End Developer",
      company: "Freelance",
      location: "Remote",
      duration: "2023 - Present",
      description: [
        "Designed and developed front-end interfaces for desktop and web applications using HTML, CSS, and PHP",
        "Successfully implemented projects such as a School Management System and Library Management Software, focusing on responsive design and seamless user interaction",
        "Optimized software for performance, scalability, and cross-platform compatibility",
        "Collaborated with senior developers to gather requirements, refine features, and deliver high-quality solutions within deadlines"
      ]
    },
    {
      title: "Software Developer Trainee",
      company: "Macon's Technologies",
      location: "Trichy, India",
      duration: "2023",
      description: [
        "Worked at a premier web development and digital marketing company in Trichy",
        "Gained experience in creative website design and web hosting services",
        "Contributed to digital marketing and customized software development projects",
        "Learned industry best practices for web development and client service"
      ]
    }
  ],
  education: [
    {
      degree: "Master of Computer Application (Pursuing)",
      institution: "Rathinam Technical Campus",
      location: "Coimbatore, India",
      duration: "2024 – Present",
      description: "Currently pursuing MCA with focus on advanced computer applications and web development technologies."
    },
    {
      degree: "Bachelor of Computer Application",
      institution: "St Joseph's College",
      location: "Trichirappalli, India",
      duration: "2021 – 2024",
      description: "Completed BCA with strong foundation in computer science fundamentals and programming languages."
    }
  ],
  skills: {
    "Programming Languages": [
      { name: "C", icon: null },
      { name: "Python", icon: FaPython },
      { name: "Java", icon: null },
      { name: "SQL", icon: null }
    ],
    "Web Development": [
      { name: "HTML/CSS", icon: FaCss3Alt },
      { name: "ASP.NET", icon: null },
      { name: "PHP", icon: null },
      { name: "UI/UX Design", icon: null }
    ],
    "Development Tools": [
      { name: "Visual Studio Code", icon: null },
      { name: "Vim", icon: null },
      { name: "Eclipse", icon: null },
      { name: "Android Studio", icon: null }
    ],
    "Operating Systems": [
      { name: "Linux", icon: null },
      { name: "Windows", icon: null }
    ],
    "Soft Skills": [
      { name: "Teamwork", icon: null },
      { name: "Communication", icon: null },
      { name: "Problem Solving", icon: null },
      { name: "Adaptability", icon: null }
    ]
  },
  languages: ["Tamil", "English"],
  hobbies: ["Interested in Sports", "Motivational Speaking", "Listening to Music", "Reading Books"],
  certifications: [
    {
      name: "Career Edge - Young Professional Certificate",
      issuer: "TCS ION",
      date: "2023",
      credentialId: "TCS-ION-YP"
    },
    {
      name: "Logic Building for Beginners",
      issuer: "Scaler Topics Digital",
      date: "2023",
      credentialId: "SCALER-LB-2023"
    },
    {
      name: "101 Journey in Future Skills Prime",
      issuer: "All India Council for Technical Education",
      date: "2023",
      credentialId: "AICTE-FSP-101"
    }
  ],
  projects: [
    {
      name: "College Alumni Management System",
      description: "Web application for college alumni management with ASP.NET frontend and backend logic using CSS while storing and managing data in MySQL database. Features alumni data management, events scheduling, college information, personalized user experience, upcoming events, and contact details for online registration.",
      technologies: ["ASP.NET", "CSS", "MySQL", "Web Development"]
    },
    {
      name: "School Management System",
      description: "Comprehensive school management software focusing on responsive design and seamless user interaction for educational institutions.",
      technologies: ["HTML", "CSS", "PHP", "Database Management"]
    },
    {
      name: "Library Management Software",
      description: "Desktop and web-based library management system with focus on user-friendly interface and efficient book tracking capabilities.",
      technologies: ["HTML", "CSS", "PHP", "Database Management"]
    }
  ]
};

export default function ResumeSection() {
  const downloadPDFResume = () => {
    // Track download event
    trackEvent('resume_download', { format: 'pdf' });
    
    // Create a link to download the PDF
    const link = document.createElement('a');
    link.href = '/Karthigayan_Resume.pdf';
    link.download = 'Karthigayan_S_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadResume = () => {
    // Track download event
    trackEvent('resume_download', { format: 'text' });
    
    // Create a simple text version for download
    const resumeContent = `
${resumeData.personalInfo.name}
${resumeData.personalInfo.title}
Email: ${resumeData.personalInfo.email}
Phone: ${resumeData.personalInfo.phone}
Location: ${resumeData.personalInfo.location}
LinkedIn: ${resumeData.personalInfo.linkedin}
GitHub: ${resumeData.personalInfo.github}

PROFESSIONAL SUMMARY
${resumeData.summary}

EXPERIENCE
${resumeData.experience.map(exp => `
${exp.title} at ${exp.company}
${exp.location} | ${exp.duration}
${exp.description.map(desc => `• ${desc}`).join('\n')}
`).join('\n')}

EDUCATION
${resumeData.education.map(edu => `
${edu.degree}
${edu.institution}, ${edu.location}
${edu.duration}
${edu.description}
`).join('\n')}

CERTIFICATIONS
${resumeData.certifications.map(cert => `
• ${cert.name} - ${cert.issuer} (${cert.date})
  Credential ID: ${cert.credentialId}
`).join('\n')}

PROJECTS
${resumeData.projects.map(project => `
• ${project.name}
  ${project.description}
  Technologies: ${project.technologies.join(', ')}
`).join('\n')}
    `;

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Karthigayan_S_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="resume" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Resume</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Download my detailed resume or explore my professional experience below
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              onClick={downloadPDFResume}
              className="px-12 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all duration-300 hover:scale-105 min-w-[250px] border-2 border-primary"
            >
              <Download className="h-5 w-5 mr-3" />
              Download PDF Resume
            </Button>
            <Button 
              onClick={downloadResume}
              className="px-12 py-4 bg-transparent hover:bg-primary/10 text-primary rounded-lg font-semibold transition-all duration-300 hover:scale-105 min-w-[250px] border-2 border-primary"
            >
              <Download className="h-5 w-5 mr-3" />
              Download Text Version
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  {resumeData.personalInfo.location}
                </div>
                <div className="text-sm break-all">
                  📧 {resumeData.personalInfo.email}
                </div>
                <div className="text-sm">
                  📱 {resumeData.personalInfo.phone}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2 text-primary" />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(resumeData.skills).map(([category, skills]) => (
                  <div key={category}>
                    <h4 className="font-semibold text-sm mb-2 text-secondary">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => {
                        const IconComponent = 'icon' in skill ? skill.icon : null;
                        return (
                          <Badge key={skill.name} variant="outline" className="text-xs flex items-center gap-1">
                            {IconComponent && <IconComponent className="h-3 w-3" />}
                            {skill.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} className="border-l-2 border-primary/20 pl-4">
                    <h4 className="font-semibold text-sm">{cert.name}</h4>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {cert.date}
                    </p>
                    <p className="text-xs text-muted-foreground">ID: {cert.credentialId}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-primary" />
                  Professional Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {resumeData.summary}
                </p>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-primary" />
                  Professional Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary/20 pl-6 relative">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-lg font-semibold">{exp.title}</h3>
                      <Badge variant="secondary" className="text-xs w-fit">
                        <Calendar className="h-3 w-3 mr-1" />
                        {exp.duration}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {exp.company} • {exp.location}
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {exp.description.map((desc, descIndex) => (
                        <li key={descIndex}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-secondary/20 pl-6 relative">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-secondary rounded-full"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-lg font-semibold">{edu.degree}</h3>
                      <Badge variant="outline" className="text-xs w-fit">
                        <Calendar className="h-3 w-3 mr-1" />
                        {edu.duration}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      {edu.institution} • {edu.location}
                    </div>
                    <p className="text-sm text-muted-foreground">{edu.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Featured Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-primary" />
                  Featured Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{project.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}