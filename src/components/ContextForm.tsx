import React, { useState } from 'react';
import { 
  Plus, 
  X, 
  ChevronDown, 
  Zap, 
  ShieldCheck, 
  FileWarning, 
  HelpCircle,
  Database,
  Cpu,
  Monitor
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Project } from '../types';

interface ContextFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Partial<Project>) => void;
  initialData?: Partial<Project>;
}

export const ContextForm = ({ isOpen, onClose, onSave, initialData }: ContextFormProps) => {
  const [name, setName] = useState(initialData?.name || '');
  const [audience, setAudience] = useState(initialData?.audience || '');
  const [purpose, setPurpose] = useState(initialData?.purpose || '');
  const [techStack, setTechStack] = useState<string[]>(initialData?.tech_stack || ['React', 'Node.js', 'Tailwind']);
  const [newTag, setNewTag] = useState('');
  const [designStyle, setDesignStyle] = useState(initialData?.design_style || 'Corporate Modern');
  const [constraints, setConstraints] = useState(initialData?.constraints || {
    no_external_lib: true,
    no_untouched_file_modification: true,
    ask_if_ambiguous: true
  });

  if (!isOpen) return null;

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!techStack.includes(newTag.trim())) {
        setTechStack([...techStack, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTechStack(techStack.filter(t => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      name,
      audience,
      purpose,
      tech_stack: techStack,
      design_style: designStyle,
      constraints
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-200">
        <header className="flex justify-between items-start mb-6">
          <div className="space-y-1 text-left">
            <h2 className="font-headline-lg text-xl md:text-2xl font-bold text-on-surface">Konfigurasi Konteks</h2>
            <p className="text-sm text-on-surface-variant">Tentukan batasan proyek dan spesifikasi teknis.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-variant rounded-full transition-colors text-on-surface-variant">
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Core Context */}
          <div className="space-y-4">
            <label className="input-label">Konteks Utama</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Proyek"
              className="text-input"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="Target Audiens"
                className="text-input"
              />
              <input 
                type="text" 
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Tujuan"
                className="text-input"
              />
            </div>
          </div>

          {/* Technical Stack */}
          <div className="space-y-4">
            <label className="input-label">Kumpulan Teknologi</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {techStack.map(tag => (
                <span key={tag} className="flex items-center gap-1 bg-primary-container text-on-primary-container text-[12px] font-medium px-3 py-1 rounded-md">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-error transition-colors">
                    <X size={12} />
                  </button>
                </span>
              ))}
              <input 
                type="text" 
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="+ Tambah Tech"
                className="bg-transparent border border-dashed border-border rounded-md px-3 py-1 text-[12px] text-on-surface-variant outline-none focus:border-primary transition-all w-24"
              />
            </div>
            <input 
              type="text" 
              value={designStyle}
              onChange={(e) => setDesignStyle(e.target.value)}
              placeholder="Gaya Desain"
              className="text-input"
            />
          </div>

          {/* Rules & Constraints */}
          <div className="space-y-4">
            <label className="input-label">Aturan & Batasan</label>
            <div className="bg-white border border-outline-variant rounded-xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={constraints.no_external_lib} 
                  onChange={() => setConstraints({...constraints, no_external_lib: !constraints.no_external_lib})}
                  className="w-4 h-4 rounded text-primary focus:ring-primary border-border"
                />
                <span className="text-sm text-on-surface">Tanpa library eksternal kecuali diminta</span>
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={constraints.no_untouched_file_modification} 
                  onChange={() => setConstraints({...constraints, no_untouched_file_modification: !constraints.no_untouched_file_modification})}
                  className="w-4 h-4 rounded text-primary focus:ring-primary border-border"
                />
                <span className="text-sm text-on-surface">Jangan pernah mengubah file yang tidak disebutkan</span>
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={constraints.ask_if_ambiguous} 
                  onChange={() => setConstraints({...constraints, ask_if_ambiguous: !constraints.ask_if_ambiguous})}
                  className="w-4 h-4 rounded text-primary focus:ring-primary border-border"
                />
                <span className="text-sm text-on-surface">Wajib bertanya jika ada ambiguitas</span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-surface-container border border-outline-variant rounded-xl">
            <div className="flex items-center gap-2 text-on-surface-variant pl-2">
              <ShieldCheck size={16} />
              <span className="text-[12px] font-medium">Validasi Konteks: <span className="text-primary font-bold">SIAP</span></span>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 md:flex-none px-4 py-2 text-[12px] font-bold text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-all"
              >
                Batal
              </button>
              <button 
                type="submit"
                className="btn-primary flex-1 md:flex-none flex items-center justify-center gap-2"
              >
                Buat
                <Zap size={16} fill="currentColor" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
