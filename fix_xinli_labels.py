from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

path = Path('K:/Codex/public/assets/xinli-22.webp')
image = Image.open(path).convert('RGB')
draw = ImageDraw.Draw(image)
font_path = Path('C:/Windows/Fonts/msyh.ttc')
font = ImageFont.truetype(str(font_path), 26) if font_path.exists() else ImageFont.load_default()
draw.rectangle((500, 865, 660, 925), fill='white')
draw.rectangle((1410, 865, 1580, 925), fill='white')
draw.text((535, 880), '样式A', font=font, fill='#555555')
draw.text((1445, 880), '样式B', font=font, fill='#555555')
image.save(path, 'WEBP', quality=90)
print('Xinli labels redrawn')
