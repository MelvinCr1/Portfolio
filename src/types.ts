import { ReactNode } from 'react';

export type Language = 'FR' | 'EN' | 'ES';

export interface ExperienceItem {
  period: string;
  company: string;
  role: string;
  location: string;
  details: string[];
  tags: string[];
}

export interface EducationItem {
  period: string;
  school: string;
  degree: string;
  specialty: string;
  details: string;
}

export interface TranslationSet {
  role: string;
  status: string;
  aboutText: string;
  navCV: string;
  navProjects: string;
  navContact: string;
  downloadLabel: string;
  viewGithub: string;
  viewLinkedin: string;
  titleCV: string;
  subtitleCV: string;
  viewAll: string;
  tabWork: string;
  tabEdu: string;
  tabSkills: string;
  certifications: string;
  presentLabel: string;
  gradLabel: string;
  projectsTitle: string;
  projectsSubtitle: string;
  projectsText: string;
  projectsCTA: string;
  contactTitle: string;
  contactSub: string;
  fieldName: string;
  fieldEmail: string;
  fieldSubject: string;
  fieldMessage: string;
  btnSend: string;
  btnSending: string;
  btnShowMore: string;
  btnShowLess: string;
  formSuccess: string;
  iframeNoticeTitle: string;
  iframeNoticeText: string;
  iframeNoticeClose: string;
  errName?: string;
  errEmail?: string;
  errSubject?: string;
  errMessage?: string;
  copyright?: string;
  experiences: ExperienceItem[];
  educations: EducationItem[];
}

export interface GithubRepo {
  repo: string;
  link: string;
  description: string;
  language: string;
  languageColor?: string;
  stars?: string;
  forks?: string;
}
