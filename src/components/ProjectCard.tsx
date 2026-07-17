import React from 'react';
import { Clock, Folder } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, className = '' }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white border border-outline-variant rounded-xl p-4 hover:border-primary hover:shadow-[0_4px_20px_rgba(79,70,229,0.15)] transition-all cursor-pointer flex flex-col justify-between h-[150px] ${className}`}
    >
      <div className="space-y-2">
        <h3 className="text-base font-bold text-on-surface truncate">{project.name}</h3>
        <p className="text-xs text-on-surface-variant line-clamp-2">{project.purpose}</p>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 text-on-surface-variant">
          <Clock size={12} />
          <span className="text-[10px] font-medium">Diubah {new Date(project.updated_at).toLocaleString('id-ID', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="flex items-center gap-1.5 text-on-surface-variant/70">
          <Folder size={12} />
          <span className="text-[10px] font-medium">Dibuat {new Date(project.created_at).toLocaleString('id-ID', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
};
