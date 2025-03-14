
import { usePortfolio } from "@/contexts/PortfolioContext";
import { useState } from "react";
import { PlusCircle, Trash2, User, Briefcase, GraduationCap, Phone, Mail, Github, Linkedin, Twitter, Globe, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThemeSelector from "@/components/ui/ThemeSelector";

const PortfolioForm = () => {
  const { portfolio, updateProfile, addSkill, updateSkill, removeSkill, addProject, updateProject, removeProject } = usePortfolio();
  const [newSkill, setNewSkill] = useState({ name: "", level: 50 });
  const [newProject, setNewProject] = useState({
    id: "",
    title: "",
    description: "",
    tags: [] as string[],
    link: "",
  });
  const [newTag, setNewTag] = useState("");

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      addSkill(newSkill);
      setNewSkill({ name: "", level: 50 });
    }
  };

  const handleAddProject = () => {
    if (newProject.title.trim() && newProject.description.trim()) {
      addProject({
        ...newProject,
        id: Date.now().toString(),
      });
      setNewProject({
        id: "",
        title: "",
        description: "",
        tags: [],
        link: "",
      });
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !newProject.tags.includes(newTag.trim())) {
      setNewProject({
        ...newProject,
        tags: [...newProject.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setNewProject({
      ...newProject,
      tags: newProject.tags.filter((t) => t !== tag),
    });
  };

  return (
    <div className="form-container">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="input-label">Name</label>
                <input 
                  id="name"
                  type="text" 
                  className="form-input"
                  value={portfolio.name}
                  onChange={(e) => updateProfile({ name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="title" className="input-label">Professional Title</label>
                <input 
                  id="title"
                  type="text" 
                  className="form-input"
                  value={portfolio.title}
                  onChange={(e) => updateProfile({ title: e.target.value })}
                  placeholder="e.g. Frontend Developer"
                />
              </div>
              
              <div>
                <label htmlFor="bio" className="input-label">Bio</label>
                <textarea 
                  id="bio"
                  className="form-textarea"
                  value={portfolio.bio}
                  onChange={(e) => updateProfile({ bio: e.target.value })}
                  placeholder="Write a short bio about yourself"
                />
              </div>
              
              <div>
                <label htmlFor="avatar" className="input-label">Profile Image URL</label>
                <input 
                  id="avatar"
                  type="text" 
                  className="form-input"
                  value={portfolio.avatar || ""}
                  onChange={(e) => updateProfile({ avatar: e.target.value })}
                  placeholder="https://example.com/your-image.jpg"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="input-label">Email</label>
                <input 
                  id="email"
                  type="email" 
                  className="form-input"
                  value={portfolio.contact.email}
                  onChange={(e) => updateProfile({ 
                    contact: { ...portfolio.contact, email: e.target.value } 
                  })}
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="input-label">Phone (optional)</label>
                <input 
                  id="phone"
                  type="tel" 
                  className="form-input"
                  value={portfolio.contact.phone || ""}
                  onChange={(e) => updateProfile({ 
                    contact: { ...portfolio.contact, phone: e.target.value } 
                  })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Social Links
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="github" className="input-label flex items-center gap-1">
                    <Github className="h-4 w-4" /> GitHub
                  </label>
                  <input 
                    id="github"
                    type="url" 
                    className="form-input"
                    value={portfolio.socialLinks.find(link => link.platform === "GitHub")?.url || ""}
                    onChange={(e) => {
                      const links = [...portfolio.socialLinks];
                      const index = links.findIndex(link => link.platform === "GitHub");
                      
                      if (index !== -1) {
                        links[index] = { ...links[index], url: e.target.value };
                      } else {
                        links.push({ platform: "GitHub", url: e.target.value });
                      }
                      
                      updateProfile({ socialLinks: links });
                    }}
                    placeholder="https://github.com/yourusername"
                  />
                </div>
                
                <div>
                  <label htmlFor="linkedin" className="input-label flex items-center gap-1">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </label>
                  <input 
                    id="linkedin"
                    type="url" 
                    className="form-input"
                    value={portfolio.socialLinks.find(link => link.platform === "LinkedIn")?.url || ""}
                    onChange={(e) => {
                      const links = [...portfolio.socialLinks];
                      const index = links.findIndex(link => link.platform === "LinkedIn");
                      
                      if (index !== -1) {
                        links[index] = { ...links[index], url: e.target.value };
                      } else {
                        links.push({ platform: "LinkedIn", url: e.target.value });
                      }
                      
                      updateProfile({ socialLinks: links });
                    }}
                    placeholder="https://linkedin.com/in/yourusername"
                  />
                </div>
                
                <div>
                  <label htmlFor="twitter" className="input-label flex items-center gap-1">
                    <Twitter className="h-4 w-4" /> Twitter
                  </label>
                  <input 
                    id="twitter"
                    type="url" 
                    className="form-input"
                    value={portfolio.socialLinks.find(link => link.platform === "Twitter")?.url || ""}
                    onChange={(e) => {
                      const links = [...portfolio.socialLinks];
                      const index = links.findIndex(link => link.platform === "Twitter");
                      
                      if (index !== -1) {
                        links[index] = { ...links[index], url: e.target.value };
                      } else {
                        links.push({ platform: "Twitter", url: e.target.value });
                      }
                      
                      updateProfile({ socialLinks: links });
                    }}
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Your Skills</h2>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input 
                  type="text" 
                  className="form-input"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="Add a skill e.g. JavaScript"
                />
              </div>
              
              <div className="flex-1">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  className="w-full"
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                />
                <div className="text-xs text-center mt-1">{newSkill.level}%</div>
              </div>
              
              <button 
                onClick={handleAddSkill}
                disabled={!newSkill.name.trim()}
                className="button-primary flex items-center gap-1"
              >
                <PlusCircle className="h-4 w-4" />
                Add Skill
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {portfolio.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      className="form-input"
                      value={skill.name}
                      onChange={(e) => updateSkill(index, { ...skill, name: e.target.value })}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      className="w-full"
                      value={skill.level}
                      onChange={(e) => updateSkill(index, { ...skill, level: parseInt(e.target.value) })}
                    />
                    <div className="text-xs text-center mt-1">{skill.level}%</div>
                  </div>
                  
                  <button 
                    onClick={() => removeSkill(index)}
                    className="button-ghost text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Your Projects
            </h2>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="projectTitle" className="input-label">Project Title</label>
                    <input 
                      id="projectTitle"
                      type="text" 
                      className="form-input"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      placeholder="e.g. E-commerce Website"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="projectDescription" className="input-label">Description</label>
                    <textarea 
                      id="projectDescription"
                      className="form-textarea"
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      placeholder="Describe your project"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="projectLink" className="input-label">Project Link (optional)</label>
                    <input 
                      id="projectLink"
                      type="url" 
                      className="form-input"
                      value={newProject.link || ""}
                      onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="projectTags" className="input-label">Tags</label>
                    <div className="flex gap-2">
                      <input 
                        id="projectTags"
                        type="text" 
                        className="form-input flex-1"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="e.g. React"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                      />
                      <button 
                        onClick={handleAddTag}
                        disabled={!newTag.trim()}
                        className="button-secondary"
                      >
                        Add
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newProject.tags.map((tag) => (
                        <div 
                          key={tag} 
                          className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs flex items-center gap-1"
                        >
                          {tag}
                          <button 
                            onClick={() => handleRemoveTag(tag)}
                            className="text-secondary-foreground/70 hover:text-secondary-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      onClick={handleAddProject}
                      disabled={!newProject.title.trim() || !newProject.description.trim()}
                      className="button-primary w-full"
                    >
                      Add Project
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6 space-y-4">
              {portfolio.projects.map((project) => (
                <Card key={project.id} className="group">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                        
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline mt-2 inline-block"
                          >
                            View Project
                          </a>
                        )}
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.tags.map((tag) => (
                            <div 
                              key={tag} 
                              className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                            >
                              {tag}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => removeProject(project.id)}
                        className="button-ghost text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="theme" className="space-y-6">
          <ThemeSelector />
          
          <div className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold tracking-tight">Customize</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="fontSize" className="input-label">Font Size</label>
                <select 
                  id="fontSize"
                  className="form-select"
                  value={portfolio.settings?.fontSize || "medium"}
                  onChange={(e) => updateSettings({ fontSize: e.target.value as any })}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="spacing" className="input-label">Spacing</label>
                <select 
                  id="spacing"
                  className="form-select"
                  value={portfolio.settings?.spacing || "normal"}
                  onChange={(e) => updateSettings({ spacing: e.target.value as any })}
                >
                  <option value="compact">Compact</option>
                  <option value="normal">Normal</option>
                  <option value="spacious">Spacious</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <input 
                  id="animations"
                  type="checkbox" 
                  className="form-checkbox"
                  checked={portfolio.settings?.animation || true}
                  onChange={(e) => updateSettings({ animation: e.target.checked })}
                />
                <label htmlFor="animations" className="input-label">Enable animations</label>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioForm;
