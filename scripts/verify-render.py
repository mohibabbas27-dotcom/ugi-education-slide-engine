from pathlib import Path
import sys
from PIL import Image

folder=Path(sys.argv[1]); files=sorted(folder.glob('slide-*.png'))
if not files: raise SystemExit('No rendered slides found')
sizes=[]
for f in files:
    with Image.open(f) as im:
        if im.width < 1200 or im.height < 600: raise SystemExit(f'Unexpectedly small render: {f}')
        sizes.append(im.size)
if len(set(sizes)) != 1: raise SystemExit(f'Inconsistent slide dimensions: {set(sizes)}')
print(f'Validated {len(files)} rendered slides at {sizes[0][0]}x{sizes[0][1]}')

