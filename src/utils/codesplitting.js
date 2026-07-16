// src/utils/codesplitting.js
// Code splitting strategies
export const routeBasedSplitting = {
  Home: () => import('../pages/Home'),
  About: () => import('../pages/AboutPage'),
  Projects: () => import('../pages/ProjectsPage'),
  Certificates: () => import('../pages/CertificatesPage'),
  Contact: () => import('../pages/ContactPage')
}

// Component-based splitting
export const componentSplitting = {
  HeroSection: () => import('../components/Hero/HeroSection'),
  ProjectsGrid: () => import('../components/Projects/ProjectsGrid'),
  CertificatesGrid: () => import('../components/Certificates/CertificatesGrid')
}

// Vendor splitting configuration for vite.config.js
export const vendorSplitting = {
  'react-vendor': ['react', 'react-dom', 'react-router-dom'],
  'animation-vendor': ['framer-motion'],
  'icons-vendor': ['react-icons'],
  'utils-vendor': ['emailjs-com']
}

