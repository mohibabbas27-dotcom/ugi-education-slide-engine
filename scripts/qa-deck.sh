#!/usr/bin/env bash
set -euo pipefail
deck="${1:?Usage: npm run qa -- path/to/deck.pptx}"
bash scripts/render-deck.sh "$deck"
name="$(basename "$deck" .pptx)"
count="$(find "qa/rendered/$name" -name 'slide-*.png' | wc -l)"
test "$count" -gt 0
python3 scripts/verify-render.py "qa/rendered/$name"
echo "QA passed: $deck ($count slides rendered)"

