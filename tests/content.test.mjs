import test from 'node:test';
import assert from 'node:assert/strict';
import { readJson, assertContent } from '../scripts/lib.mjs';
test('sample lecture passes structural validation',()=>assert.doesNotThrow(()=>assertContent(readJson('content/samples/physics-lecture.json'))));
test('all configured subjects have distinct identifiers',()=>{
 const ids=['physics','chemistry','biology','mathematics','computer-science'].map(s=>readJson(`config/subjects/${s}.json`).id);
 assert.equal(new Set(ids).size,ids.length);
});

