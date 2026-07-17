/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProjectConstraints {
  no_external_lib: boolean;
  no_untouched_file_modification: boolean;
  ask_if_ambiguous: boolean;
}

export interface Project {
  id: string;
  name: string;
  audience: string;
  purpose: string;
  tech_stack: string[];
  design_style: string;
  constraints: ProjectConstraints;
  created_at: string;
  updated_at: string;
}

export interface GeneratedFile {
  id: string;
  project_id: string;
  file_path: string;
  content: string;
  created_at: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}
