
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Portfolio, PortfolioSettings, Project, Experience, Education, Skill, SocialLink } from '../types/portfolio';
import { defaultPortfolio, defaultSettings } from '../lib/defaultData';

interface PortfolioContextType {
  portfolio: Portfolio;
  settings: PortfolioSettings;
  updateProfile: (updates: Partial<Portfolio>) => void;
  updateSettings: (updates: Partial<PortfolioSettings>) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (index: number, skill: Skill) => void;
  removeSkill: (index: number) => void;
  addSocialLink: (link: SocialLink) => void;
  updateSocialLink: (index: number, link: SocialLink) => void;
  removeSocialLink: (index: number) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: Education) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  resetPortfolio: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [portfolio, setPortfolio] = useState<Portfolio>(defaultPortfolio);
  const [settings, setSettings] = useState<PortfolioSettings>(defaultSettings);

  const updateProfile = (updates: Partial<Portfolio>) => {
    setPortfolio(prev => ({ ...prev, ...updates }));
  };

  const updateSettings = (updates: Partial<PortfolioSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const addSkill = (skill: Skill) => {
    setPortfolio(prev => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
  };

  const updateSkill = (index: number, skill: Skill) => {
    setPortfolio(prev => {
      const updatedSkills = [...prev.skills];
      updatedSkills[index] = skill;
      return { ...prev, skills: updatedSkills };
    });
  };

  const removeSkill = (index: number) => {
    setPortfolio(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addSocialLink = (link: SocialLink) => {
    setPortfolio(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, link],
    }));
  };

  const updateSocialLink = (index: number, link: SocialLink) => {
    setPortfolio(prev => {
      const updatedLinks = [...prev.socialLinks];
      updatedLinks[index] = link;
      return { ...prev, socialLinks: updatedLinks };
    });
  };

  const removeSocialLink = (index: number) => {
    setPortfolio(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  const addProject = (project: Project) => {
    setPortfolio(prev => ({
      ...prev,
      projects: [...prev.projects, project],
    }));
  };

  const updateProject = (id: string, project: Partial<Project>) => {
    setPortfolio(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, ...project } : p)),
    }));
  };

  const removeProject = (id: string) => {
    setPortfolio(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }));
  };

  const addExperience = (experience: Experience) => {
    setPortfolio(prev => ({
      ...prev,
      experiences: [...prev.experiences, experience],
    }));
  };

  const updateExperience = (id: string, experience: Partial<Experience>) => {
    setPortfolio(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => (e.id === id ? { ...e, ...experience } : e)),
    }));
  };

  const removeExperience = (id: string) => {
    setPortfolio(prev => ({
      ...prev,
      experiences: prev.experiences.filter(e => e.id !== id),
    }));
  };

  const addEducation = (education: Education) => {
    setPortfolio(prev => ({
      ...prev,
      education: [...prev.education, education],
    }));
  };

  const updateEducation = (id: string, education: Partial<Education>) => {
    setPortfolio(prev => ({
      ...prev,
      education: prev.education.map(e => (e.id === id ? { ...e, ...education } : e)),
    }));
  };

  const removeEducation = (id: string) => {
    setPortfolio(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id),
    }));
  };

  const resetPortfolio = () => {
    setPortfolio(defaultPortfolio);
    setSettings(defaultSettings);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        settings,
        updateProfile,
        updateSettings,
        addSkill,
        updateSkill,
        removeSkill,
        addSocialLink,
        updateSocialLink,
        removeSocialLink,
        addProject,
        updateProject,
        removeProject,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        resetPortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
