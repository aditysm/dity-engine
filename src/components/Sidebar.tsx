import React from 'react';
import { 
  LayoutDashboard, 
  GitBranch, 
  BookOpen, 
  HelpCircle, 
  Plus, 
  Terminal,
  Settings,
  Wand2
} from 'lucide-react';
import { cn } from '../lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-4 px-6 py-3 transition-all duration-200 rounded-lg",
      active ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30"
    )}
  >
    {icon}
    <span className="font-label-md text-label-md">{label}</span>
  </button>
);

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onNewProject: () => void;
}

export const Sidebar = ({ activeView, setActiveView, onNewProject }: SidebarProps) => {
  return (
    <aside className="w-64 bg-surface flex flex-col h-full">
      <div className="p-6 border-b border-outline-variant lg:hidden">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
            D
          </div>
          <h2 className="font-bold text-lg tracking-tight text-on-surface">Dity Engine</h2>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col overflow-y-auto">
        <div className="flex-1">
          <span className="input-label mb-3 px-2">Menu Utama</span>
          <nav className="space-y-1 mb-8">
            <NavItem 
              icon={<LayoutDashboard size={18} />} 
              label="Dashboard" 
              active={activeView === 'dashboard'} 
              onClick={() => setActiveView('dashboard')} 
            />
            <NavItem 
              icon={<GitBranch size={18} />} 
              label="Workspace" 
              active={activeView === 'workspace'} 
              onClick={() => setActiveView('workspace')} 
            />
          </nav>

          <span className="input-label mb-3 px-2">Alat & Konfigurasi</span>
          <nav className="space-y-1">
            <NavItem 
              icon={<Wand2 size={18} />} 
              label="Prompt Builder" 
              active={activeView === 'prompt_builder'} 
              onClick={() => setActiveView('prompt_builder')} 
            />
          </nav>
        </div>

        <div className="mt-8">
          <div className="border-t border-outline-variant/50 pt-4 mb-4" />
          <nav className="space-y-1 mb-4">
            <NavItem 
              icon={<BookOpen size={18} />} 
              label="Documentation" 
              active={activeView === 'docs'} 
              onClick={() => setActiveView('docs')} 
            />
            <NavItem 
              icon={<Settings size={18} />} 
              label="Settings" 
              active={activeView === 'settings'} 
              onClick={() => setActiveView('settings')} 
            />
          </nav>

          <button 
            onClick={onNewProject}
            className="btn-primary w-full flex items-center justify-center gap-2 lg:hidden"
          >
            <Plus size={16} />
            Proyek Baru
          </button>
        </div>
      </div>
    </aside>
  );
};
