import type { Prize, Mention, PressItem, AwardPhoto } from '@/components/home/motion/AwardsBoard';

export const prizes: Prize[] = [
  {
    event: 'Madrid entrepreneurship awards',
    year: '2026',
    title: 'Best project for scientific impact',
    detail: 'First prize of the competition, plus five special mentions from the jury partners.',
  },
  {
    event: 'Harvard HSIL Hackathon, global final',
    year: '2026',
    title: 'Second place worldwide',
    detail: 'Final held at Pillar VC in Boston, judged by Boston investors and Harvard T.H. Chan faculty.',
  },
  {
    event: 'Harvard HSIL Hackathon, Madrid hub',
    year: '2026',
    title: 'First place',
    detail: 'Among 190 participants at Universidad Complutense de Madrid, with a place in the global final.',
  },
];

export const awardPhotos: AwardPhoto[] = [
  {
    src: '/home/awards-ucm.webp',
    alt: 'Three of the founders receiving the award on stage at Universidad Complutense',
    caption: 'Madrid, 2026. Award ceremony at Universidad Complutense.',
  },
  {
    src: '/home/awards-pillar.webp',
    alt: 'The team with their certificates at Pillar VC, Boston',
    caption: 'Boston, June 2026. Global final at Pillar VC.',
  },
  {
    src: '/GANADORES.jpeg',
    alt: 'The team with the Madrid hub award',
    caption: 'Madrid, April 2026. Madrid hub winners.',
  },
];

export const mentions: Mention[] = [
  { by: 'Cámara de Comercio de Madrid', title: 'Best project with local growth potential' },
  { by: 'Spain Startup', title: 'Best project with international potential' },
  { by: 'Netmentora Madrid', title: 'Best project for job creation potential' },
  { by: 'Fundación madri+d', title: 'Technology-based project with the highest development potential' },
  { by: 'Innpar, Pozuelo de Alarcón', title: 'Best technology entrepreneurship project' },
];

export const press: PressItem[] = [
  {
    outlet: 'Tribuna Complutense',
    date: 'June 2026',
    title: 'El equipo de la UCM, segundo en el Harvard Health Systems Innovation Lab Hackathon 2026',
    url: 'https://tribuna.ucm.es/news/el-equipo-de-la-ucm-segundo-en-el-harvard-health-systems-innovation-lab-hackathon-2026',
    image: '/home/press-tribuna-boston.webp',
  },
  {
    outlet: 'The Objective',
    date: 'April 2026',
    title: 'Seis emprendedores crean un guante para evaluar la recuperación después de un ictus',
    url: 'https://theobjective.com/sociedad/ciencia/2026-04-21/seis-emprendedores-guante-recuperacion-ictus/',
    image: '/home/press-theobjective.webp',
  },
  {
    outlet: 'Tribuna Complutense',
    date: 'April 2026',
    title: 'Cuatro complutenses, núcleo del equipo ganador del hackathon de la Universidad de Harvard celebrado en la UCM',
    url: 'https://tribuna.ucm.es/news/cuatro-complutenses-equipo-ganador-hackathon-universidad-harvard-celebrado-ucm',
    image: '/home/press-tribuna-madrid.webp',
  },
];
