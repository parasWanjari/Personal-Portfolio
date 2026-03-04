import React from 'react';
import resumeData from '../data/resume.json';
import { Mail, Phone, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-transparent backdrop-blur-sm py-12 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-white font-medium text-lg mb-1">{resumeData.basics.name}</h3>
          <p className="text-white/40 text-sm">{resumeData.basics.title}</p>
        </div>
        
        <div className="flex items-center gap-6">
          <a href={`mailto:${resumeData.basics.email}`} className="text-white/50 hover:text-white transition-colors" aria-label="Email">
            <Mail size={20} />
          </a>
          <a href={`tel:${resumeData.basics.phone}`} className="text-white/50 hover:text-white transition-colors" aria-label="Phone">
            <Phone size={20} />
          </a>
          {resumeData.basics.links.map((link, i) => (
            <a key={i} href="#" className="text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm">
              <Linkedin size={20} />
              <span className="hidden sm:inline">{link.url}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
