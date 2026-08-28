import fs from 'node:fs';
import path from 'node:path';

export const root = path.resolve(import.meta.dirname, '..');
export const readJson = p => JSON.parse(fs.readFileSync(path.resolve(root, p), 'utf8'));
export const ensureDir = p => fs.mkdirSync(path.dirname(p), { recursive: true });
export function parseArgs(argv) {
  const out = {};
  for (let i=2;i<argv.length;i++) if (argv[i].startsWith('--')) out[argv[i].slice(2)] = argv[++i];
  return out;
}
export function assertContent(data) {
  const errors=[];
  for (const key of ['metadata','introduction','slos','slides','recap','reviewQuestions']) if (!data[key]) errors.push(`Missing ${key}`);
  if (!Array.isArray(data.slos) || data.slos.length<3 || data.slos.length>6) errors.push('SLO count must be 3-6');
  if (!Array.isArray(data.slides) || data.slides.length<2) errors.push('At least two teaching slides are required');
  if (errors.length) throw new Error(errors.join('\n'));
}

