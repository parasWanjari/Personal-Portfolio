import React from 'react';
import { motion } from 'motion/react';
import { Folder, ExternalLink, Github } from 'lucide-react';
import resumeData from '../data/resume.json';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Featured Projects</h2>
          <div className="w-20 h-[1px] bg-white/20" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumeData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group flex flex-col justify-between p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all relative overflow-hidden h-full"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/70 group-hover:text-white transition-colors">
                    <Folder size={24} />
                  </div>
                  <div className="flex gap-3">
                    {project.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-white transition-colors"
                        aria-label={link.name}
                      >
                        {link.name.toLowerCase().includes('github') ? (
                          <Github size={20} />
                        ) : (
                          <ExternalLink size={20} />
                        )}
                      </a>
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl font-medium text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                
                <ul className="space-y-2 mb-8">
                  {project.bullets.map((bullet, i) => (
                    <li key={i} className="text-sm text-white/60 leading-relaxed flex gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/20 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-auto pt-6 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono text-white/50 px-2 py-1 rounded-md bg-white/5 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
