import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, Zap, Clock } from 'lucide-react';
import resumeData from '../data/resume.json';

const getIconForMetric = (metric: string) => {
  if (metric.includes('%') && metric.includes('latency')) return <Clock size={24} className="text-emerald-400" />;
  if (metric.includes('1M+')) return <Zap size={24} className="text-amber-400" />;
  if (metric.includes('1,000+')) return <Users size={24} className="text-blue-400" />;
  return <TrendingUp size={24} className="text-purple-400" />;
};

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Impact & Metrics</h2>
          <p className="text-white/50 font-light max-w-2xl mx-auto">Measurable results delivered across enterprise applications and high-throughput systems.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeData.achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl font-bold text-white tracking-tighter">
                  {achievement.metric}
                </div>
                <div className="p-2 rounded-full bg-white/5 border border-white/10">
                  {getIconForMetric(achievement.metric + achievement.context)}
                </div>
              </div>
              
              <p className="text-sm text-white/60 leading-relaxed">
                {achievement.context}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
