// This file exports TypeScript types and interfaces used throughout the application.

export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    liveLink: string;
    githubLink: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    price: string;
}

export interface Translation {
    [key: string]: {
        [key: string]: string;
    };
}

export interface Theme {
    mode: 'light' | 'dark';
}

export interface Language {
    code: string;
    name: string;
}