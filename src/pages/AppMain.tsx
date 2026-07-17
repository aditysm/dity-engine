import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Dashboard } from '../components/Dashboard';
import { ContextForm } from '../components/ContextForm';
import { Workspace } from '../components/Workspace';
import { GeminiChat } from '../components/GeminiChat';
import { Project, GeneratedFile } from '../types';
import { generateFileContent, AI_FOLDER_STRUCTURE } from '../lib/templates';
import { MessageSquare, X, Menu, Terminal, Bot, ArrowLeft, MoreVertical, Eye, EyeOff, Copy, Plus, X as XIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Footer } from '../components/ui/footer';
import { ProjectCard } from '../components/ProjectCard';
import { ThemeToggle } from '../components/ThemeToggle';
import { Logo } from '../components/ui/Logo';

export function AppMain() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isContextFormOpen, setIsContextFormOpen] = useState(false);
  const [isChatMaximized, setIsChatMaximized] = useState(false);

  // Settings state
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState('AIzaSy... (API Key disembunyikan untuk pratinjau)');

  // Load projects from localStorage
  useEffect(() => {
    const savedProjects = localStorage.getItem('dity_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  // Save projects to localStorage
  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('dity_projects', JSON.stringify(newProjects));
  };

  const handleSaveProject = (projectData: Partial<Project>) => {
    const now = new Date().toISOString();
    const newProject: Project = {
      id: currentProject?.id || crypto.randomUUID(),
      name: projectData.name || 'Untitled Project',
      audience: projectData.audience || '',
      purpose: projectData.purpose || '',
      tech_stack: projectData.tech_stack || [],
      design_style: projectData.design_style || 'Corporate Modern',
      constraints: projectData.constraints || {
        no_external_lib: true,
        no_untouched_file_modification: true,
        ask_if_ambiguous: true
      },
      created_at: currentProject?.created_at || now,
      updated_at: now
    };

    const newProjects = currentProject 
      ? projects.map(p => p.id === newProject.id ? newProject : p)
      : [newProject, ...projects];
    
    saveProjects(newProjects);
    
    // Generate Files
    const files: GeneratedFile[] = AI_FOLDER_STRUCTURE.map(path => ({
      id: crypto.randomUUID(),
      project_id: newProject.id,
      file_path: path,
      content: generateFileContent(newProject, path),
      created_at: now
    }));

    setGeneratedFiles(files);
    setCurrentProject(newProject);
    setIsContextFormOpen(false);
    setActiveView('workspace');
  };

  const handleSelectProject = (project: Project) => {
    setCurrentProject(project);
    // Regenerate files for viewing (in a real app these would be fetched from DB)
    const files: GeneratedFile[] = AI_FOLDER_STRUCTURE.map(path => ({
      id: crypto.randomUUID(),
      project_id: project.id,
      file_path: path,
      content: generateFileContent(project, path),
      created_at: project.created_at
    }));
    setGeneratedFiles(files);
    setActiveView('workspace');
  };

  const handleNewProject = () => {
    setCurrentProject(null);
    setGeneratedFiles([]);
    setIsContextFormOpen(true);
  };

  const isProjectWorkspaceActive = activeView === 'workspace' && currentProject;

  const appFooter = (
    <Footer
      logo={<Logo className="h-10 w-10" />}
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
        { href: "#", label: "Local Context Packer" },
        { href: "#", label: "Smart Boilerplate" },
        { href: "#", label: "Token Cost Tracker" },
        { href: "#", label: "PRD Architect" },
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
  );

  return (
    <div className="flex h-screen bg-surface-container-lowest text-on-surface overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {!isProjectWorkspaceActive && isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Hidden on mobile, drawer behavior */}
      {!isProjectWorkspaceActive && (
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <Sidebar 
            activeView={activeView} 
            setActiveView={(view) => {
              setActiveView(view);
              setIsSidebarOpen(false);
            }} 
            onNewProject={() => {
              handleNewProject();
              setIsSidebarOpen(false);
            }} 
          />
        </div>
      )}

      <main className="flex-1 overflow-hidden flex flex-col relative w-full bg-surface-container-low">
        {/* Universal Appbar */}
        <header className="h-16 flex items-center justify-between px-4 bg-surface border-b border-outline-variant shrink-0 z-10 relative">
          <div className="flex items-center gap-3">
            {!isProjectWorkspaceActive && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 text-on-surface-variant lg:hidden"
              >
                <Menu size={24} />
              </button>
            )}
            
            {!isProjectWorkspaceActive && (
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  navigate('/');
                  window.scrollTo(0, 0);
                }}
              >
                <Logo className="h-8 w-8" />
                <span className="font-bold text-lg tracking-tight">Dity Engine</span>
              </div>
            )}
            
            {/* Center logo for non-desktop */}
            {!isProjectWorkspaceActive && (
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex lg:hidden items-center gap-2 cursor-pointer"
                onClick={() => {
                  navigate('/');
                  window.scrollTo(0, 0);
                }}
              >
                <Logo className="h-8 w-8" />
                <span className="font-bold text-lg tracking-tight">Dity Engine</span>
              </div>
            )}

            {isProjectWorkspaceActive && currentProject && (
              <>
                <div className="w-px h-6 bg-outline-variant mx-2 hidden sm:block"></div>
                <button 
                  onClick={() => {
                    setCurrentProject(null);
                    setActiveView('workspace');
                  }} 
                  className="p-2 -ml-2 sm:ml-0 hover:bg-surface-variant rounded-full transition-colors text-on-surface-variant"
                >
                  <ArrowLeft size={20} />
                </button>
                <span className="font-bold text-on-surface text-sm md:text-base truncate max-w-[100px] sm:max-w-[150px] md:max-w-[300px]">
                  {currentProject.name}
                </span>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isProjectWorkspaceActive ? (
              <button className="p-2 hover:bg-surface-variant rounded-full transition-colors hidden sm:flex">
                <MoreVertical size={20} className="text-on-surface-variant" />
              </button>
            ) : (
              <button onClick={handleNewProject} className="btn-primary flex items-center justify-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:shadow-md transition-all">
                <Plus size={16} /> 
                <span className="hidden sm:inline">Proyek Baru</span>
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {activeView === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full overflow-y-auto"
              >
                <Dashboard 
                  projects={projects} 
                  onSelectProject={handleSelectProject} 
                  onNewProject={handleNewProject} 
                  onNavigate={(view) => setActiveView(view)}
                />
              </motion.div>
            )}

            {/* List projects if workspace view but no active project */}
            {activeView === 'workspace' && !currentProject && (
              <motion.div 
                key="workspace-list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full overflow-y-auto"
              >
                <div className="flex flex-col min-h-full">
                  <div className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 space-y-8">
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">Pilih Ruang Kerja</h1>
                        <p className="text-sm text-on-surface-variant">Pilih proyek untuk membuka ruang kerja.</p>
                      </div>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {projects.map(project => (
                        <ProjectCard 
                          key={project.id}
                          project={project}
                          onClick={() => handleSelectProject(project)}
                        />
                      ))}
                      {projects.length === 0 && (
                        <div className="col-span-full py-12 text-center text-on-surface-variant italic opacity-70">
                          Belum ada proyek yang dibuat.
                        </div>
                      )}
                    </div>
                  </div>
                  {appFooter}
                </div>
              </motion.div>
            )}

            {activeView === 'workspace' && currentProject && (
              <motion.div 
                key="workspace-active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full w-full"
              >
                <Workspace project={currentProject} files={generatedFiles} />
              </motion.div>
            )}

            {activeView === 'prompt_builder' && (
              <motion.div 
                key="prompt_builder"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full overflow-y-auto"
              >
                <div className="flex flex-col min-h-full">
                  <div className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 space-y-8">
                    <header>
                      <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">Prompt Builder</h1>
                      <p className="text-sm text-on-surface-variant">Buat dan modifikasi template prompt khusus untuk mempercepat alur kerja Anda.</p>
                    </header>
                    <div className="bg-surface border border-outline-variant rounded-xl p-8 flex items-center justify-center min-h-[400px]">
                      <p className="text-on-surface-variant opacity-70">Fitur Prompt Builder sedang dalam pengembangan.</p>
                    </div>
                  </div>
                  {appFooter}
                </div>
              </motion.div>
            )}

            {activeView === 'docs' && (
              <motion.div 
                key="docs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full overflow-y-auto"
              >
                <div className="flex flex-col min-h-full">
                  <div className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 space-y-8">
                    <header>
                      <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">Dokumentasi</h1>
                      <p className="text-sm text-on-surface-variant">Panduan lengkap menggunakan Dity Engine.</p>
                    </header>
                    <div className="bg-surface border border-outline-variant rounded-xl p-8 flex items-center justify-center min-h-[400px]">
                      <p className="text-on-surface-variant opacity-70">Dokumentasi sedang disusun.</p>
                    </div>
                  </div>
                  {appFooter}
                </div>
              </motion.div>
            )}

            {activeView === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full overflow-y-auto"
              >
                <div className="flex flex-col min-h-full">
                  <div className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 space-y-8">
                    <header>
                      <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">Pengaturan</h1>
                      <p className="text-sm text-on-surface-variant">Konfigurasi chatbot AI dan preferensi sistem.</p>
                    </header>
                    <div className="space-y-6">
                      <div className="bg-surface border border-outline-variant rounded-xl p-6 space-y-4">
                        <h3 className="font-bold text-on-surface">Konfigurasi Chatbot AI</h3>
                        <div className="space-y-2">
                          <label className="input-label">Gemini API Key</label>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <input 
                                type={showApiKey ? "text" : "password"} 
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="Masukkan API Key..." 
                                className="input-field pr-10 font-mono text-sm" 
                              />
                              <button 
                                type="button"
                                onClick={() => setShowApiKey(!showApiKey)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                              >
                                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                            </div>
                            <button 
                              onClick={() => navigator.clipboard.writeText(apiKey)}
                              className="p-2 border border-outline-variant rounded-xl hover:bg-surface-container transition-colors text-on-surface-variant"
                              title="Salin API Key"
                            >
                              <Copy size={18} />
                            </button>
                          </div>
                          <p className="text-[11px] text-on-surface-variant">API key digunakan untuk fitur chat asisten.</p>
                        </div>
                        <div className="space-y-2 pt-4 border-t border-outline-variant">
                          <label className="input-label">Tingkat Kesadaran (Temperature)</label>
                          <input type="range" min="0" max="100" defaultValue="70" className="w-full accent-primary" />
                          <div className="flex justify-between text-[11px] text-on-surface-variant">
                            <span>Presisi (0)</span>
                            <span>Kreatif (1)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {appFooter}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Chat Button */}
        {!isChatMaximized && (
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={cn(
              "fixed bottom-4 right-4 md:bottom-8 md:right-8 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-95 z-50",
              isChatOpen ? "bg-secondary text-white" : "bg-primary text-white"
            )}
          >
            {isChatOpen ? <X size={24} /> : <Bot size={24} />}
          </button>
        )}

        {/* Floating Chat Window */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={cn(
                "fixed z-50 shadow-2xl transition-all duration-300",
                isChatMaximized
                  ? "inset-4 md:inset-8"
                  : "bottom-20 right-4 md:bottom-24 md:right-8 w-[calc(100vw-32px)] md:w-[400px] h-[70vh] md:h-[600px]"
              )}
            >
              <GeminiChat 
                project={isProjectWorkspaceActive ? currentProject : null} 
                isMaximized={isChatMaximized}
                onToggleMaximize={() => setIsChatMaximized(!isChatMaximized)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ContextForm 
        isOpen={isContextFormOpen}
        onClose={() => setIsContextFormOpen(false)}
        onSave={handleSaveProject} 
        initialData={currentProject || undefined} 
      />
    </div>
  );
}
