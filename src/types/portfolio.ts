
export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string; // URL or path
  tags: string[];
  link?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrentRole?: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Contact {
  email: string;
  phone?: string;
  address?: string;
}

export interface Portfolio {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  skills: Skill[];
  socialLinks: SocialLink[];
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  contact: Contact;
}

export type ThemeId = 'minimal' | 'creative' | 'professional';

export interface Theme {
  id: ThemeId;
  name: string;
  description: string;
}

export interface PortfolioSettings {
  theme: ThemeId;
  fontSize: 'small' | 'medium' | 'large';
  spacing: 'compact' | 'normal' | 'spacious';
  animation: boolean;
}
