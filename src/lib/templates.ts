/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from '../types';

export const generateFileContent = (project: Project, filePath: string): string => {
  const { name, audience, purpose, tech_stack, design_style } = project;
  const stack = tech_stack.join(', ');

  const templates: Record<string, string> = {
    'ai/AI_RULES.md': `# AI Rules for ${name}
Saat bekerja pada proyek ini, patuhi aturan main mutlak berikut:
1. JANGAN menggunakan library eksternal tambahan kecuali diminta.
2. JANGAN mengubah file atau modul kode yang tidak disebut di instruksi.
3. Jika ada ambiguitas atau ketidakjelasan, TANYAKAN dulu sebelum eksekusi.`,

    'ai/ARCHITECTURE.md': `# Architecture - ${name}
Proyek ini dibangun menggunakan tech stack: ${stack}.
Aplikasi ditujukan untuk audiens: ${audience} dengan tujuan: ${purpose}.`,

    'ai/CODING_STYLE.md': `# Coding Style Guidelines
Semua kode wajib mengikuti standar konvensi ${stack}. 
Gaya desain antarmuka mengacu pada: ${design_style}.`,

    'ai/DECISIONS.md': `# Architecture Decisions
Daftar keputusan arsitektur penting untuk proyek ${name}.`,

    'ai/DEPENDENCIES.md': `# Dependencies
Tech Stack Utama: ${stack}.`,

    'ai/KNOWN_ISSUES.md': `# Known Issues
Daftar isu atau bug yang diketahui pada proyek ${name}.`,

    'ai/MODULE_MAP.md': `# Module Map
Peta modul dan struktur folder untuk proyek ${name}.`,

    'ai/PROJECT_RULES.md': `# Project Rules
Aturan spesifik untuk proyek ${name}.`,

    'ai/README.md': `# ${name} AI Context
Selamat datang di konteks AI untuk ${name}. 
Gunakan folder ini untuk memberikan konteks mendalam kepada AI Assistant.`,

    'ai/ROADMAP.md': `# Roadmap
Rencana pengembangan fitur untuk ${name}.`,

    'ai/TODO.md': `# TODO
Daftar tugas yang harus diselesaikan.`,

    'ai/prompts/bug_fix.md': `# bug_fix.md
Bertindaklah sebagai Senior Developer untuk proyek ${name} (${stack}).
Saya menemukan bug: [INPUT_BUG_DI_SINI].
Selesaikan tanpa library eksternal, jangan sentuh file di luar cakupan, dan tanya jika ambigu.`,

    'ai/prompts/feature_planning.md': `# feature_planning.md
Bantu saya merencanakan fitur baru untuk proyek ${name}. 
Target audiens kami ${audience} dengan goals ${purpose}. 
Bagaimana implementasi terbaik menggunakan ${stack}?`,

    'ai/prompts/refactor.md': `# refactor.md
Lakukan refactoring pada kode berikut tanpa mengubah fungsionalitas aslinya sesuai standar ${name}.`,

    'ai/prompts/code_review.md': `# code_review.md
Lakukan review kode untuk fitur baru di ${name}. Pastikan sesuai dengan tech stack ${stack}.`,

    'ai/prompts/documentation.md': `# documentation.md
Buat dokumentasi teknis untuk modul berikut di proyek ${name}.`,

    'ai/prompts/test_generation.md': `# test_generation.md
Hasilkan unit test untuk komponen berikut menggunakan standard ${stack}.`,
  };

  return templates[filePath] || `# ${filePath}\nContent for ${name}`;
};

export const AI_FOLDER_STRUCTURE = [
  'ai/AI_RULES.md',
  'ai/ARCHITECTURE.md',
  'ai/CODING_STYLE.md',
  'ai/DECISIONS.md',
  'ai/DEPENDENCIES.md',
  'ai/KNOWN_ISSUES.md',
  'ai/MODULE_MAP.md',
  'ai/PROJECT_RULES.md',
  'ai/README.md',
  'ai/ROADMAP.md',
  'ai/TODO.md',
  'ai/prompts/bug_fix.md',
  'ai/prompts/code_review.md',
  'ai/prompts/documentation.md',
  'ai/prompts/feature_planning.md',
  'ai/prompts/refactor.md',
  'ai/prompts/test_generation.md',
];
