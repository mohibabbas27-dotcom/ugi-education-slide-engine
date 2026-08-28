#!/usr/bin/env bash
set -euo pipefail
deck="${1:?Usage: npm run render -- path/to/deck.pptx}"
name="$(basename "$deck" .pptx)"
out="qa/rendered/$name"
profile="$(mktemp -d)"
mkdir -p "$out"
HOME="$profile" soffice --headless -env:UserInstallation="file://$profile" --convert-to pdf --outdir "$out" "$deck" >/dev/null
pdftoppm -png -r 144 "$out/$name.pdf" "$out/slide" >/dev/null
echo "Rendered slides: $out"

