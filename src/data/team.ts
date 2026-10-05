export type TeamMember = {
  name: string;
  title: string;
  bio: string;
  photo: string;
  linkedin?: string;
  github?: string;
  advisor?: boolean;
};

export const team: TeamMember[] = [
  {
    name: 'Luis Molina Salvador',
    title: 'Co-founder, Strategy',
    bio: 'Leads strategy, partnerships, fundraising and go-to-market. Software developer at Amazon, studying Computer Engineering and Business Administration at UCM. Previously AI developer at Grupo Oesía and equity analyst at Arcanix Fund.',
    photo: '/luisNueva.jpeg',
    linkedin: 'https://www.linkedin.com/in/luis-molina-salvador/',
    github: 'https://github.com/34lumo',
  },
  {
    name: 'Mateo Pérez Guzmán',
    title: 'Co-founder, MVP Engineering',
    bio: 'Leads MVP architecture and the computer vision implementation. Software engineer at Galeo, studying Computer Science and Business Administration at UCM.',
    photo: '/team/mateo.jpg',
    linkedin: 'https://www.linkedin.com/in/mateoperezguzman/',
    github: 'https://github.com/mpchachi',
  },
  {
    name: 'Álvaro Gil Arjona',
    title: 'Co-founder, Product and Strategy',
    bio: 'Leads product direction, user experience and positioning. Studies Computer Science and Business at Universidad Complutense de Madrid. Turns the clinical problem into something clinicians, mentors and investors can understand and use.',
    photo: '/AlvaroNueva.png',
    linkedin: 'https://www.linkedin.com/in/alvarogilarjona/',
    github: 'https://github.com/alvarogilarjona',
  },
  {
    name: 'Marco García López',
    title: 'Co-founder, MVP Engineering',
    bio: 'Leads software development, product architecture and computer vision logic. Studies Computer Science and Business Administration at UCM, with earlier browser-based neuromotor tracking prototypes from previous hackathons.',
    photo: '/team/marco.jpg',
    linkedin: 'https://www.linkedin.com/in/marco-garcia-lopez-4b0037308/',
    github: 'https://github.com/marcusen78-sketch',
  },
  {
    name: 'Helene Weinberg',
    title: 'Co-founder, Clinical and Biomedical Translation',
    bio: 'Connects the product with rehabilitation needs: biomarker logic and the clinician-facing report. Cum Laude Biomedical Engineering graduate from Binghamton University, incoming Master in Management at IESE, Healthcare Management certificate from Cornell.',
    photo: '/team/helene.jpg',
    linkedin: 'https://www.linkedin.com/in/helene-weinberg/',
  },
  {
    name: 'José Antonio López-Martín',
    title: 'Clinical Advisor',
    bio: 'Physician, PhD in Medicine, Director of Research and Innovation at Atrys. Advises the founding team on clinical validation and medical research: he challenges our medical assumptions, helps define a credible validation pathway and keeps the product aligned with real clinical workflows.',
    photo: '/team/jal.jpg',
    advisor: true,
  },
];
