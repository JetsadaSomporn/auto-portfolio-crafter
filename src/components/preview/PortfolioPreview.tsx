
import { usePortfolio } from "@/contexts/PortfolioContext";
import { Github, Linkedin, Twitter, Mail, Phone, ExternalLink, Download } from "lucide-react";
import { useState } from "react";

const PortfolioPreview = () => {
  const { portfolio, settings } = usePortfolio();
  const [loading, setLoading] = useState(false);

  const handleExport = () => {
    setLoading(true);
    // Simulate export delay
    setTimeout(() => {
      setLoading(false);
      alert("This feature will be implemented in the next version!");
    }, 1500);
  };

  // Helper function to get icon by social platform
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "GitHub":
        return <Github className="h-5 w-5" />;
      case "LinkedIn":
        return <Linkedin className="h-5 w-5" />;
      case "Twitter":
        return <Twitter className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  // Choose theme based on settings
  const getThemeClasses = () => {
    switch (settings.theme) {
      case "minimal":
        return "bg-white";
      case "creative":
        return "bg-gradient-to-br from-purple-50 to-indigo-50";
      case "professional":
        return "bg-gray-50";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="preview-container relative overflow-auto">
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={handleExport}
          disabled={loading}
          className="button-primary flex items-center gap-2 bg-white/80 text-primary border border-neutral-200/50 hover:bg-white"
        >
          {loading ? (
            <span className="animate-pulse">Exporting...</span>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span>Export</span>
            </>
          )}
        </button>
      </div>

      <div className={`min-h-[100vh] ${getThemeClasses()}`}>
        {/* Header / Hero Section */}
        <header className="pt-16 pb-16 px-6 md:px-16 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {portfolio.avatar ? (
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={portfolio.avatar} 
                  alt={portfolio.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-4xl font-display font-bold text-primary/40">
                  {portfolio.name.charAt(0)}
                </span>
              </div>
            )}
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight animate-slide-up opacity-0 animation-delay-100 animation-fill-mode-forwards">
                {portfolio.name || "Your Name"}
              </h1>
              
              <p className="text-lg md:text-xl text-primary/80 mt-2 animate-slide-up opacity-0 animation-delay-200 animation-fill-mode-forwards">
                {portfolio.title || "Your Title"}
              </p>
              
              {/* Social Links */}
              <div className="flex items-center justify-center md:justify-start gap-4 mt-4 animate-slide-up opacity-0 animation-delay-300 animation-fill-mode-forwards">
                {portfolio.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary/60 hover:text-primary transition-colors"
                    aria-label={link.platform}
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </header>
        
        {/* About Section */}
        <section className="py-12 px-6 md:px-16 max-w-4xl mx-auto">
          <div className="animate-slide-up opacity-0 animation-delay-400 animation-fill-mode-forwards">
            <h2 className="text-2xl font-display font-semibold tracking-tight mb-4">About Me</h2>
            <p className="text-primary/80 leading-relaxed">
              {portfolio.bio || "Add your bio in the form to see it here."}
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {portfolio.contact.email && (
                <a 
                  href={`mailto:${portfolio.contact.email}`}
                  className="flex items-center gap-2 text-primary/70 hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  <span>{portfolio.contact.email}</span>
                </a>
              )}
              
              {portfolio.contact.phone && (
                <a 
                  href={`tel:${portfolio.contact.phone}`}
                  className="flex items-center gap-2 text-primary/70 hover:text-primary"
                >
                  <Phone className="h-4 w-4" />
                  <span>{portfolio.contact.phone}</span>
                </a>
              )}
            </div>
          </div>
        </section>
        
        {/* Skills Section */}
        {portfolio.skills.length > 0 && (
          <section className="py-12 px-6 md:px-16 max-w-4xl mx-auto bg-white/50 backdrop-blur-sm">
            <div className="animate-slide-up opacity-0 animation-delay-500 animation-fill-mode-forwards">
              <h2 className="text-2xl font-display font-semibold tracking-tight mb-6">Skills</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {portfolio.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-primary/60">{skill.level}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-bar-value"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Projects Section */}
        {portfolio.projects.length > 0 && (
          <section className="py-12 px-6 md:px-16 max-w-4xl mx-auto">
            <div className="animate-slide-up opacity-0 animation-delay-600 animation-fill-mode-forwards">
              <h2 className="text-2xl font-display font-semibold tracking-tight mb-6">Projects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolio.projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="group p-6 bg-white rounded-xl shadow-sm border border-neutral-200/50 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-medium">{project.title}</h3>
                    <p className="mt-2 text-primary/70 text-sm">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="inline-block px-2 py-1 bg-primary/5 text-primary/70 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View Project
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Footer */}
        <footer className="py-8 px-6 text-center text-sm text-primary/50">
          <div className="animate-slide-up opacity-0 animation-delay-700 animation-fill-mode-forwards">
            <p>© {new Date().getFullYear()} {portfolio.name}. Created with Portfolio Crafter.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PortfolioPreview;
