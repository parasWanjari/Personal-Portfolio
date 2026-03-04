import React from 'react';
import { motion } from 'motion/react';
import { Code2, Lightbulb, GraduationCap } from 'lucide-react';
import resumeData from '../data/resume.json';

export const SkillsAndEducation: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Skills Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Core Competencies</h2>
            <div className="w-12 h-[1px] bg-white/20" />
          </motion.div>

          <div className="space-y-10">
            {resumeData.skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <h3 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
                  {skillGroup.category.includes('Technical') ? <Code2 size={16} /> : <Lightbulb size={16} />}
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 text-sm text-white/80 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Education</h2>
            <div className="w-12 h-[1px] bg-white/20" />
          </motion.div>

          <div className="space-y-6">
            {resumeData.education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <GraduationCap size={64} />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{edu.degree}</h3>
                <p className="text-white/70 mb-4">{edu.institution}</p>
                <div className="flex items-center gap-4 text-sm text-white/40 font-mono">
                  <span>{edu.location}</span>
                  <span>•</span>
                  <span>{edu.dates}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
