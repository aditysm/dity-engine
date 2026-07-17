import React, { useMemo } from 'react';
import { 
  Folder, 
  Clock, 
  Plus, 
  ArrowRight,
  LayoutDashboard,
  BarChart2,
  FileText,
  Zap,
  Activity,
  Wand2,
  BookOpen,
  Settings,
  X as XIcon,
  Hexagon,
  MessageSquare
} from 'lucide-react';
import { Project } from '../types';
import { cn } from '../lib/utils';
import { Footer } from './ui/footer';
import { ProjectCard } from './ProjectCard';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface DashboardProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onNewProject: () => void;
  onNavigate?: (view: string) => void;
}

const mockChartData = [
  { name: 'Sen', aktivitas: 4 },
  { name: 'Sel', aktivitas: 7 },
  { name: 'Rab', aktivitas: 5 },
  { name: 'Kam', aktivitas: 12 },
  { name: 'Jum', aktivitas: 8 },
  { name: 'Sab', aktivitas: 15 },
  { name: 'Min', aktivitas: 9 },
];

export const Dashboard = ({ projects, onSelectProject, onNewProject, onNavigate }: DashboardProps) => {
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  }, [projects]);

  const totalFiles = projects.reduce((acc, p) => acc + (p.tech_stack.length * 3), 0); // Mock calculation

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
        
        {/* Header & Aksi Pantasan (Quick Actions) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant pb-6">
        <div>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">Beranda</h1>
          <p className="text-sm text-on-surface-variant">Ringkasan aktivitas dan manajemen proyek AI Anda.</p>
        </div>
      </div>

      {/* Statistik Utama */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-outline-variant p-4 rounded-xl flex items-center gap-3 shadow-sm hover:border-primary/50 transition-colors">
          <div className="w-10 h-10 bg-[#E0F2FE] rounded-lg flex items-center justify-center text-[#0284C7] shrink-0">
            <Folder size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-on-surface-variant">Total Proyek</p>
            <p className="text-xl font-bold text-on-surface">{projects.length}</p>
          </div>
        </div>
        <div className="bg-white border border-outline-variant p-4 rounded-xl flex items-center gap-3 shadow-sm hover:border-primary/50 transition-colors">
          <div className="w-10 h-10 bg-[#DCFCE7] rounded-lg flex items-center justify-center text-[#16A34A] shrink-0">
            <FileText size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-on-surface-variant">Jumlah File</p>
            <p className="text-xl font-bold text-on-surface">{totalFiles}</p>
          </div>
        </div>
        <div className="bg-white border border-outline-variant p-4 rounded-xl flex items-center gap-3 shadow-sm hover:border-primary/50 transition-colors">
          <div className="w-10 h-10 bg-[#FEE2E2] rounded-lg flex items-center justify-center text-[#DC2626] shrink-0">
            <Activity size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-on-surface-variant">Skor Kerja</p>
            <p className="text-xl font-bold text-on-surface">84%</p>
          </div>
        </div>
        <div className="bg-white border border-outline-variant p-4 rounded-xl flex items-center gap-3 shadow-sm hover:border-primary/50 transition-colors">
          <div className="w-10 h-10 bg-[#F3E8FF] rounded-lg flex items-center justify-center text-[#9333EA] shrink-0">
            <Zap size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-on-surface-variant">Kinerja AI</p>
            <p className="text-xl font-bold text-on-surface">98%</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white border border-outline-variant p-4 rounded-xl shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-on-surface">Aktivitas Pengembangan</h3>
          </div>
          <BarChart2 className="text-outline" size={16} />
        </div>
        <div className="h-40 w-full text-[10px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData} margin={{ top: 10, right: 0, left: -30, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAktivitas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="aktivitas" stroke="#4F46E5" strokeWidth={2} fillOpacity={1} fill="url(#colorAktivitas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      {/* Daftar Proyek Horizontal */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-on-surface">Proyek Anda</h3>
          <button onClick={() => onNavigate?.('workspace')} className="text-primary text-sm font-semibold hover:underline decoration-primary underline-offset-4 transition-all">Lihat Semua</button>
        </div>
        
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 bg-white border border-outline-variant rounded-2xl space-y-4 shadow-sm text-center px-4">
            <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center text-on-surface-variant">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h3 className="text-md font-bold text-on-surface">Belum ada proyek</h3>
              <p className="text-sm text-on-surface-variant max-w-xs mt-1">Mulai proyek pertama Anda untuk mengotomatiskan kerangka kerja AI.</p>
            </div>
            <button onClick={onNewProject} className="btn-secondary mt-2">Mulai Sekarang</button>
          </div>
        ) : (
          <div className="flex overflow-x-auto pb-4 gap-4 snap-x hide-scrollbar">
            {sortedProjects.map(project => (
              <ProjectCard 
                key={project.id}
                project={project}
                onClick={() => onSelectProject(project)}
                className="shrink-0 w-[240px] md:w-[280px] snap-start"
              />
            ))}
          </div>
        )}
      </div>

      {/* Shortcuts */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-on-surface">Jalan Pintas</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <button onClick={() => onNavigate?.('workspace')} className="bg-white border border-outline-variant p-4 rounded-xl flex items-center gap-3 shadow-sm hover:border-primary/50 transition-colors text-left w-full">
            <div className="w-10 h-10 bg-[#E0F2FE] rounded-lg flex items-center justify-center text-[#0284C7] shrink-0">
              <Folder size={20} />
            </div>
            <span className="font-semibold text-sm text-on-surface truncate">Workspace</span>
          </button>
          <button onClick={() => onNavigate?.('prompt_builder')} className="bg-white border border-outline-variant p-4 rounded-xl flex items-center gap-3 shadow-sm hover:border-primary/50 transition-colors text-left w-full">
            <div className="w-10 h-10 bg-[#DCFCE7] rounded-lg flex items-center justify-center text-[#16A34A] shrink-0">
              <Wand2 size={20} />
            </div>
            <span className="font-semibold text-sm text-on-surface truncate">Prompt Builder</span>
          </button>
          <button onClick={() => onNavigate?.('docs')} className="bg-white border border-outline-variant p-4 rounded-xl flex items-center gap-3 shadow-sm hover:border-primary/50 transition-colors text-left w-full">
            <div className="w-10 h-10 bg-[#FEE2E2] rounded-lg flex items-center justify-center text-[#DC2626] shrink-0">
              <BookOpen size={20} />
            </div>
            <span className="font-semibold text-sm text-on-surface truncate">Documentation</span>
          </button>
          <button onClick={() => onNavigate?.('settings')} className="bg-white border border-outline-variant p-4 rounded-xl flex items-center gap-3 shadow-sm hover:border-primary/50 transition-colors text-left w-full">
            <div className="w-10 h-10 bg-[#F3E8FF] rounded-lg flex items-center justify-center text-[#9333EA] shrink-0">
              <Settings size={20} />
            </div>
            <span className="font-semibold text-sm text-on-surface truncate">Settings</span>
          </button>
        </div>
      </div>
      </div>
      
      <Footer
        logo={<Hexagon className="h-10 w-10 text-primary" />}
        brandName="Dity Engine"
        socialLinks={[
          {
            icon: <XIcon className="h-5 w-5" />,
            href: "#",
            label: "X",
          },
          {
            icon: <MessageSquare className="h-5 w-5" />,
            href: "#",
            label: "Discord",
          },
        ]}
        mainLinks={[
          { href: "#", label: "Dashboard" },
          { href: "#", label: "Workspace" },
          { href: "#", label: "Prompt Builder" },
        ]}
        legalLinks={[
          { href: "#", label: "Privacy" },
          { href: "#", label: "Terms" },
        ]}
        copyright={{
          text: "© 2026 Dity Engine",
          license: "Part Of Dity Corp.",
        }}
      />
    </div>
  );
};
