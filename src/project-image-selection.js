// Visually reviewed archive images and supporting drawings, by source file number.
export const imageSelection = {
 tianyuan: {archive:[1,8,11,17], drawings:[3,4,5]},
 future: {archive:[3,5,9,12]},
 yosemite: {archive:[1,3,9,14]},
 gongyuan: {archive:[1,3,4,7]},
 shangyuan: {archive:[1,4,9,10]},
 poly: {archive:[1,3,24,30], drawings:[15,16,17,18,19,20,23]},
 runze: {archive:[1,7,10,13], drawings:[2,3,4,5]},
 yuansheng: {archive:[1,3,6,10]},
 guoan: {archive:[1,3,5,7], drawings:[9,10]},
 yuyuan: {archive:[1,3,5,10], drawings:[12,13]},
 taihe: {archive:[1,4,6,10]},
 huayue: {archive:[2,3,6,8]},
 wangshan: {archive:[1,4,8,15], drawings:[18,19]},
 lighting: {archive:[1,3,7,9], drawings:[12,13,14,15]},
 xiongan: {archive:[1,4,5,6]},
 shengboke: {archive:[1,3,9,17], drawings:[14,15,22,23,24,25,26]},
 baochao: {archive:[1,4,8,11]},
 'hangzhou-cafe': {archive:[14,15,18,21], prefix:'baochao'},
 xinli: {archive:[2,4,10,15], drawings:[20,21,22]},
 jinzhe: {archive:[2,8,16,19], drawings:[23,24,25]}
};
export function selectProjectImages(project) {
 const selection=imageSelection[project.id];
 const path=number=>`/assets/${selection.prefix||project.id}-${number}.webp`;
 const drawings=(selection.drawings||[]).map(path);
 return {...project, archiveImages:selection.archive.map(path),
  images:[...project.images.filter(src=>!drawings.includes(src)),...drawings]};
}
