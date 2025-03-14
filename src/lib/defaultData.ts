
import { Portfolio, PortfolioSettings } from '../types/portfolio';

export const defaultPortfolio: Portfolio = {
  name: "John Doe",
  title: "Frontend Developer",
  bio: "Passionate frontend developer with a keen eye for design and user experience. I love building beautiful, responsive, and accessible web applications.",
  avatar: undefined,
  skills: [
    { name: "HTML", level: 90 },
    { name: "CSS", level: 85 },
    { name: "JavaScript", level: 80 },
    { name: "React", level: 85 },
    { name: "TypeScript", level: 75 },
    { name: "Tailwind CSS", level: 90 },
  ],
  socialLinks: [
    { platform: "GitHub", url: "https://github.com" },
    { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "Twitter", url: "https://twitter.com" },
  ],
  projects: [
    {
      id: "1",
      title: "E-commerce Website",
      description: "A fully responsive e-commerce website built with React and Node.js.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      link: "https://example.com",
    },
    {
      id: "2",
      title: "Weather App",
      description: "A weather application that shows current weather and forecast based on location.",
      tags: ["JavaScript", "API", "CSS"],
      link: "https://example.com",
    },
    {
      id: "3",
      title: "Task Management Tool",
      description: "A productivity tool that helps teams manage tasks and projects efficiently.",
      tags: ["React", "Firebase", "Tailwind CSS"],
      link: "https://example.com",
    },
  ],
  experiences: [
    {
      id: "1",
      title: "Frontend Developer",
      company: "Tech Solutions Inc",
      location: "San Francisco, CA",
      startDate: "2020-01",
      endDate: "2023-02",
      description: "Developed and maintained responsive web applications using React and TypeScript. Collaborated with designers to implement UI/UX improvements.",
      isCurrentRole: false,
    },
    {
      id: "2",
      title: "UI Developer",
      company: "Creative Agency",
      location: "New York, NY",
      startDate: "2018-05",
      endDate: "2019-12",
      description: "Created interactive web experiences with JavaScript, HTML, and CSS. Worked in an agile team to deliver projects on time.",
      isCurrentRole: false,
    },
  ],
  education: [
    {
      id: "1",
      institution: "University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2014-09",
      endDate: "2018-05",
    },
  ],
  contact: {
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  },
};

export const defaultSettings: PortfolioSettings = {
  theme: 'minimal',
  fontSize: 'medium',
  spacing: 'normal',
  animation: true,
};
