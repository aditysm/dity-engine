import React, { useState, useMemo } from 'react';
import { 
  Folder, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  Edit3, 
  X,
  FileJson,
  Terminal,
  Search,
  Plus,
  FolderPlus,
  Maximize2,
  Copy,
  Download,
  File as FileIcon
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Project, GeneratedFile } from '../types';
import JSZip from 'jszip';

interface WorkspaceProps {
  project: Project;
  files: GeneratedFile[];
}

interface FileNode {
  name: string;
  path: string;
  isFile: boolean;
  file?: GeneratedFile;
  children: Record<string, FileNode>;
}

const buildTree = (files: GeneratedFile[]) => {
  const root: Record<string, FileNode> = {};
  files.forEach(file => {
    const parts = file.file_path.split('/');
    let current = root;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1) {
        current[part] = { isFile: true, file, name: part, path: file.file_path, children: {} };
      } else {
        if (!current[part]) {
          current[part] = { isFile: false, children: {}, name: part, path: parts.slice(0, i+1).join('/') };
        }
        current = current[part].children;
      }
    }
  });
  return root;
};

const TreeNode = ({ node, level, selectedFile, onSelect }: { node: FileNode, level: number, selectedFile: GeneratedFile | null, onSelect: (f: GeneratedFile) => void }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const getFileIcon = (path: string) => {
    if (path.endsWith('.md')) return <FileText size={14} className="text-on-surface-variant mr-2 shrink-0" />;
    return <FileIcon size={14} className="text-on-surface-variant mr-2 shrink-0" />;
  };

  if (node.isFile) {
    return (
      <div 
        onClick={() => onSelect(node.file!)}
        className={cn(
          "py-1.5 flex items-center cursor-pointer transition-all hover:bg-white/5 select-none text-[13px] pr-4",
          selectedFile?.id === node.file?.id ? "bg-primary/10 border-l-2 border-primary text-primary opacity-100" : "text-on-secondary opacity-70 border-l-2 border-transparent"
        )}
        style={{ paddingLeft: `${level * 12 + 16}px` }}
      >
        {getFileIcon(node.path)}
        <span className="truncate">{node.name}</span>
      </div>
    );
  }

  // Sort children: folders first, then files
  const children = Object.values(node.children).sort((a, b) => {
    if (a.isFile === b.isFile) return a.name.localeCompare(b.name);
    return a.isFile ? 1 : -1;
  });

  return (
    <div>
      <div 
        className="py-1.5 flex items-center cursor-pointer hover:bg-white/5 transition-all select-none text-[13px] text-on-secondary border-l-2 border-transparent pr-4"
        style={{ paddingLeft: `${level * 12 + 16}px` }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronDown size={14} className="text-primary mr-1 shrink-0" /> : <ChevronRight size={14} className="text-primary mr-1 shrink-0" />}
        <Folder size={14} className="text-primary mr-2 shrink-0" />
        <span className="truncate">{node.name}</span>
      </div>
      {isOpen && (
        <div>
          {children.map(child => (
            <TreeNode key={child.name} node={child} level={level + 1} selectedFile={selectedFile} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

export const Workspace = ({ project, files }: WorkspaceProps) => {
  const [selectedFile, setSelectedFile] = useState<GeneratedFile | null>(files[0] || null);
  const [activeTab, setActiveTab] = useState<'explorer' | 'editor' | 'info'>('editor');

  const fileTreeRoot = useMemo(() => buildTree(files), [files]);

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    files.forEach(file => {
      zip.file(file.file_path, file.content);
    });
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.name}-ai-context.zip`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const FileTree = (
    <div className="bg-secondary border-r border-outline-variant/10 flex flex-col h-full overflow-y-auto">
      <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center shrink-0">
        <span className="text-[12px] font-semibold text-on-surface-variant uppercase">EXPLORER</span>
        <div className="bg-outline-variant/10 text-[10px] px-2 py-1 rounded text-on-surface-variant cursor-pointer hover:bg-outline-variant/20 transition-all" onClick={handleDownloadZip}>
          Export .zip
        </div>
      </div>
      
      <div className="py-2 flex-1 overflow-y-auto">
        {Object.values(fileTreeRoot).map(node => (
          <TreeNode 
            key={node.name} 
            node={node} 
            level={0} 
            selectedFile={selectedFile} 
            onSelect={(f) => {
              setSelectedFile(f);
              setActiveTab('editor');
            }} 
          />
        ))}
      </div>
    </div>
  );

  const Editor = (
    <div className="bg-[#1E293B] flex flex-col h-full border-r border-outline-variant/10">
      <div className="h-10 flex bg-[#0F172A] border-b border-outline-variant/10">
        {selectedFile && (
          <div className="px-4 flex items-center gap-2 bg-[#1E293B] text-primary border-t-2 border-primary text-[12px] font-medium h-full">
            {selectedFile.file_path.split('/').pop()}
          </div>
        )}
      </div>
      <div className="flex-1 p-4 md:p-8 overflow-y-auto font-label-sm text-[13px] leading-relaxed text-on-secondary/80">
        {selectedFile ? (
          <pre className="whitespace-pre-wrap">
            <code>{selectedFile.content}</code>
          </pre>
        ) : (
          <div className="h-full flex items-center justify-center opacity-30 italic">
            Pilih file untuk mempratinjau konteks
          </div>
        )}
      </div>
    </div>
  );

  const Info = (
    <div className="bg-surface p-6 md:p-8 space-y-8 overflow-y-auto h-full">
      <div className="space-y-4">
        <label className="input-label">Project Details</label>
        <div className="space-y-4">
          <div className="pb-4 border-b border-outline-variant">
            <span className="text-[12px] font-semibold text-on-surface-variant block mb-1">PROJECT NAME</span>
            <span className="text-sm font-bold text-on-surface">{project.name}</span>
          </div>
          <div className="pb-4 border-b border-outline-variant">
            <span className="text-[12px] font-semibold text-on-surface-variant block mb-1">TECH STACK</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tech_stack.map(tech => (
                <span key={tech} className="bg-surface-container-low text-on-surface-variant text-[11px] font-medium px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="pb-4 border-b border-outline-variant">
            <span className="text-[12px] font-semibold text-on-surface-variant block mb-1">DESIGN STYLE</span>
            <span className="text-sm text-on-surface">{project.design_style}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="input-label">Project Status</label>
        <div className="bg-surface-container-low rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Terminal size={14} />
            <span className="text-[11px] font-bold tracking-tight uppercase">Workspace Active</span>
          </div>
          <div className="text-[11px] text-on-surface-variant leading-relaxed">
            Struktur folder AI Context telah dioptimalkan berdasarkan spesifikasi teknis proyek.
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-surface-container-lowest overflow-hidden">
      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex bg-[#0F172A] border-b border-outline-variant/10 p-1 shrink-0">
        <button 
          onClick={() => setActiveTab('explorer')}
          className={cn(
            "flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded transition-all",
            activeTab === 'explorer' ? "bg-primary text-on-primary" : "text-on-surface-variant"
          )}
        >
          Files
        </button>
        <button 
          onClick={() => setActiveTab('editor')}
          className={cn(
            "flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded transition-all",
            activeTab === 'editor' ? "bg-primary text-on-primary" : "text-on-surface-variant"
          )}
        >
          Editor
        </button>
        <button 
          onClick={() => setActiveTab('info')}
          className={cn(
            "flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded transition-all",
            activeTab === 'info' ? "bg-primary text-on-primary" : "text-on-surface-variant"
          )}
        >
          Details
        </button>
      </div>

      {/* Responsive Grid Container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[260px_1fr_340px] h-full overflow-hidden">
        {/* Desktop Views or Active Mobile View */}
        <div className={cn("h-full", activeTab !== 'explorer' && "hidden lg:block")}>
          {FileTree}
        </div>
        <div className={cn("h-full", activeTab !== 'editor' && "hidden lg:block")}>
          {Editor}
        </div>
        <div className={cn("h-full", activeTab !== 'info' && "hidden lg:block")}>
          {Info}
        </div>
      </div>
    </div>
  );
};
