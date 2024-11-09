import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface CategoryGroupProps {
  title: string;
  description: string;
  icon: typeof Terminal;
  items: readonly string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    x: -5,
    transition: {
      type: "spring",
      stiffness: 100
    }
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const CategoryGroup = memo(function CategoryGroup({ 
  title, 
  description,
  icon: Icon, 
  items 
}: CategoryGroupProps) {
  return (
    <div className="group h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative h-full flex flex-col rounded-lg border border-slate-700/50 overflow-hidden transition-all duration-500 group-hover:border-gold-500/30"
      >
        {/* Backdrop layers */}
        <div className="absolute inset-0 transition-all duration-500">
          <div className="absolute inset-0 bg-slate-800/70 backdrop-blur-2xl transition-all duration-500 group-hover:bg-slate-800/80" />
          
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 via-transparent to-gold-500/5" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="p-6 border-b border-slate-700/50 bg-slate-900/40 backdrop-blur-xl">
            <div className="flex flex-col gap-3">
              {/* Title and Icon Row */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-gold-500/10 to-gold-600/5 group-hover:from-gold-500/20 group-hover:to-gold-600/10 transition-colors duration-300 backdrop-blur-xl">
                  <Icon className="h-5 w-5 text-gold-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-gold-400 transition-colors duration-300">
                  {title}
                </h3>
              </div>

              {/* Separator */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/20 to-transparent h-px backdrop-blur-sm" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/10 to-transparent h-px blur-sm" />
              </div>

              {/* Description */}
              <p className="text-sm text-slate-200 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="flex-1 p-5 font-mono text-[13px] bg-slate-900/40 backdrop-blur-xl">
            {/* Terminal Header */}
            <div className="flex items-center space-x-1.5 mb-3 text-[11px] sm:text-xs bg-slate-800/80 px-3 py-1.5 rounded-md backdrop-blur-xl">
              <span className="text-slate-400">root@GitOps/NOW/</span>
              <span className="text-gold-400 font-semibold">{title.toUpperCase().replace(/\s+/g, '-')}</span>
              <span className="text-slate-400">/</span>
            </div>
            
            {/* Items List - Single column on mobile, two columns on desktop */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {items.map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="group/item flex items-center space-x-2 pl-2 py-1 rounded-md hover:bg-slate-800/70 transition-all duration-300"
                >
                  <span className="text-slate-400 text-xs sm:text-sm font-light tracking-tight transition-colors duration-300 group-hover/item:text-gold-500">
                    {idx === items.length - 1 ? '└──' : '├──'}
                  </span>
                  <span className="text-white text-xs sm:text-sm tracking-tight leading-none group-hover/item:text-gold-400 transition-colors duration-300 truncate font-medium">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Enhanced Hover Effects */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500">
          {/* Gradient borders */}
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
          <div className="absolute inset-y-0 -left-px w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
          <div className="absolute inset-y-0 -right-px w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
          
          {/* Corner glows */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-gold-400/20 rounded-full blur-sm" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-gold-400/20 rounded-full blur-sm" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gold-400/20 rounded-full blur-sm" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gold-400/20 rounded-full blur-sm" />
        </div>

        {/* Box shadow glow */}
        <div className="absolute inset-0 rounded-lg shadow-[0_0_30px_rgba(250,189,0,0.1)] opacity-0 group-hover:opacity-100 transition-all duration-500" />
      </motion.div>
    </div>
  );
});

export default CategoryGroup;