const fs = require('fs');

const files = [
  'components/test/ReadingInterface.tsx',
  'components/test/QuestionCard.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace any garbled text before ' Prev' with '← Prev'
  content = content.replace( />\s+[^a-zA-Z<>]+ Prev/g, ">\n        ← Prev");
  
  // Replace line 26 from `[-Ã¢â‚¬â€œ]`
  content = content.replace(/\[\-\S+\]/g, "[-—]");

  // Replace any garbled text inside `Done` or `Next` strings
  content = content.replace(/\{isLast \? "Done [^"]+" : "Next [^"]+"\}/g, '{isLast ? "Done ✓" : "Next →"}');

  // Replace garbled Questions tab
  content = content.replace(/"[^"A-Za-z]+ Questions"/g, '"📝 Questions"');

  // Replace any remaining long comment separators (the ones that look like `// Ã¢â€ â‚¬Ã¢â€ â‚¬Ã¢â€ â‚¬ Progress dots Ã¢â€ â‚¬Ã¢â€ â‚¬Ã¢â€ â‚¬`)
  content = content.replace(/\/\/ [^\w\s]*? Single question card [^\w\s]*/g, '// ─── Single question card ──────────────────────────────────────────');
  content = content.replace(/\/\/ [^\w\s]*? Progress dots [^\w\s]*/g, '// ─── Progress dots ─────────────────────────────────────────────────');
  content = content.replace(/\/\/ [^\w\s]*? MAIN SPLIT-PANE READING INTERFACE [^\w\s]*/g, '// ─── MAIN SPLIT-PANE READING INTERFACE ───────────────────────────────');
  content = content.replace(/\/\/ [^\w\s]*? Navigation bar \(shared desktop \+ mobile\) [^\w\s]*/g, '  // ─── Navigation bar (shared desktop + mobile) ──────────────');
  content = content.replace(/\/\/ [^\w\s]*? DESKTOP: side-by-side split [^\w\s]*/g, '  // ─── DESKTOP: side-by-side split ───────────────────────────');
  content = content.replace(/\{\/\* [^\w\s]*? Q jump select [^\w\s]*? compact \*\/\}/g, '{/* ─── Q jump select — compact */}');
  content = content.replace(/\{\/\* [^\w\s]*? DESKTOP LAYOUT [^\w\s]*? \*\/\}/g, '      {/* ─── DESKTOP LAYOUT ─────────────────────────────────── */}');
  content = content.replace(/\{\/\* [^\w\s]*? MOBILE LAYOUT [^\w\s]*? \*\/\}/g, '      {/* ─── MOBILE LAYOUT ──────────────────────────────────── */}');
  
  // Replace the docstring comments
  content = content.replace(/\/\*\* Extract a referenced line number from question text, e\.g\. ".+?in line 12.+?" .+? 12 \*\//g, '/** Extract a referenced line number from question text, e.g. "...in line 12..." -> 12 */');

  // QuestionCard.tsx specific replace
  content = content.replace(/\/\/ Structure or Reading [^\w\s]+ plain display \(blanks shown as _______\)/g, '// Structure or Reading — plain display (blanks shown as _______)');

  fs.writeFileSync(file, content);
}

console.log('Fixed files');
