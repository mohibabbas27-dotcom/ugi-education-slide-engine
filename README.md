# UGI Education Slide Engine

A reusable Codex Terminal project for generating textbook-aligned, LMS-aligned,
editable PowerPoint lectures for Physics, Chemistry, Biology, Mathematics,
Computer Science, and future school subjects.

## Principles

1. LMS lecture division defines the lecture boundary.
2. The approved textbook defines the academic content.
3. Subject profiles define discipline-specific pedagogy and visual treatment.
4. PowerPoint is generated as editable OOXML with PptxGenJS.
5. Every deck must be rendered and visually inspected before release.
6. A pilot lecture must be approved before batch generation.

## Quick start

```bash
npm install
npm run build:sample
npm run render -- output/sample-physics-lecture.pptx
```

The sample uses `content/samples/physics-lecture.json`. Add approved source PDFs
under `sources/` locally; they are ignored by Git because textbooks may be large
or copyrighted.

## Production workflow

```text
uploaded sources
  -> source extraction and page mapping
  -> structured lecture JSON
  -> academic validation
  -> PowerPoint generation
  -> rendering and overflow checks
  -> human visual review
  -> approved release
```

## Supported subjects

- Physics
- Chemistry
- Biology
- Mathematics
- Computer Science

Each subject has an independent profile in `config/subjects/`. Shared UGI
branding and layout rules live in `config/design-system.json`.

## Commands

- `npm run build:sample` - generate the included sample lecture.
- `npm run generate -- --input <lecture.json> --output <deck.pptx>` - generate a deck.
- `npm run validate -- --input <lecture.json>` - validate lecture structure.
- `npm run render -- <deck.pptx>` - render slides to PNGs using LibreOffice and Poppler.
- `npm run qa -- <deck.pptx>` - run structural and render checks.

## Content format

Lecture files are JSON documents validated against `schemas/lecture.schema.json`.
They separate academic content from presentation design, allowing the same
engine to serve many subjects without mixing their teaching conventions.

## Repository policy

Do not commit textbooks, student data, generated QA images, or temporary OCR
files. Commit approved templates, subject profiles, scripts, and small sample
content only.
