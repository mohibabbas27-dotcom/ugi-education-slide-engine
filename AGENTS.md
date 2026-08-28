# Codex Repository Instructions

## Mission

Build accurate, attractive, teacher-friendly educational PowerPoint lectures
for multiple school subjects. Never optimize visual novelty at the expense of
academic accuracy or classroom readability.

## Source hierarchy

1. LMS lecture division decides what belongs in a lecture.
2. The class textbook decides what content is taught.
3. SLOs describe what learners should be able to do.
4. The presentation organizes and visualizes the approved content.

Do not introduce unsupported facts, formulas, examples, theories, applications,
or questions. Do not cross the LMS boundary into the next lecture.

## Required lecture structure

- Minimal title slide
- Introduction or conceptual hook
- Student Learning Objectives immediately after introduction
- Brief previous-knowledge connection when relevant
- Clear teaching sequence with one main purpose per slide
- Textbook diagrams or faithful recreations where instructionally necessary
- Guided example or practice where supported
- Quick checks with verified answers in speaker notes
- Lecture recap
- Review questions
- Short next-lecture bridge without teaching the next topic

## Visual standards

- Use the shared design tokens and the relevant subject profile.
- Use several purposeful layout silhouettes; never repeat one card grid throughout.
- Minimum 50 pt deck title, 34 pt slide title, 22 pt subheading, 17 pt body.
- Prefer 3-5 concise bullets; split dense material into additional slides.
- Keep the UGI logo small and in one consistent location.
- Use real tables for tabular content and native equations for formulas.
- Scientific diagrams must preserve labels, relationships, and meaning.
- Decorative visuals must not replace instructional visuals.

## Quality gate

Before declaring a deck complete:

1. Validate the lecture JSON.
2. Generate the PPTX.
3. Render every slide to PNG.
4. Inspect every slide at full size.
5. Fix clipping, overlap, bad crops, tiny text, awkward wrapping, and inconsistency.
6. Confirm formulas, units, labels, diagrams, and answer keys against the textbook.
7. Run the automated QA command.

Batch generation is prohibited until one pilot lecture has been approved.

