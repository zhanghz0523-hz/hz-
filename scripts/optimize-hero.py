from PIL import Image,ImageOps
from pathlib import Path
root=Path(__file__).resolve().parents[1]
for name in ['space','wangshan','yosemite','lighting']:
    source=ImageOps.exif_transpose(Image.open(root/f'public/assets/hero-{name}-hd.jpg')).convert('RGB')
    for width in [960,1600,2400,4000]:
        image=source.copy()
        image.thumbnail((width,10000),Image.Resampling.LANCZOS)
        output=root/f'public/assets/hero-{name}-{width}.webp'
        image.save(output,'WEBP',quality=90,method=6)
        print(output.name,output.stat().st_size)
