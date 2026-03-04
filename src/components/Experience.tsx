import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Briefcase, Calendar } from 'lucide-react';
import resumeData from '../data/resume.json';

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Experience Path</h2>
          <div className="w-20 h-[1px] bg-white/20" />
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Background Line */}
          <div className="absolute left-[19px] md:left-[39px] top-2 bottom-0 w-[2px] bg-white/10" />
          
          {/* Animated Foreground Line */}
          <motion.div 
            className="absolute left-[19px] md:left-[39px] top-2 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500 origin-top"
            style={{ scaleY: lineHeight }}
          />

          <div className="space-y-12">
            {resumeData.experience.map((job, index) => (
              <div key={index} className="relative pl-14 md:pl-24">
                {/* Timeline Node */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute left-0 md:left-5 top-1 w-10 h-10 rounded-full bg-[#070814] border-2 border-white/20 flex items-center justify-center z-10"
                >
                  <div className="w-2 h-2 rounded-full bg-white/60 shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="group p-6 md:p-8 border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative overflow-hidden"
                >
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-medium text-white mb-2">{job.role}</h3>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 font-mono mb-6">
                      <span className="flex items-center gap-1.5">
                        <Briefcase size={14} />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {job.dates}
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {job.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-3 text-white/70 text-sm leading-relaxed">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
