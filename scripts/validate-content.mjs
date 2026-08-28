import fs from 'node:fs';
import path from 'node:path';
import { parseArgs, assertContent } from './lib.mjs';
const args=parseArgs(process.argv);
if (!args.input) throw new Error('Usage: npm run validate -- --input content/file.json');
const data=JSON.parse(fs.readFileSync(path.resolve(args.input),'utf8'));
assertContent(data);
console.log(`Valid lecture: ${data.metadata.subject} lecture ${data.metadata.lecture}`);

