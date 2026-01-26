import { Property } from '@/app/types/property';

export const PROPERTIES_MOCK: Property[] = [
  {
    id: 1,
    title: 'Apartamento em São Paulo',
    description: 'Um apartamento moderno na cidade de São Paulo.',
    type: 'apartment',
    price: 250000,
    location: {
      city: 'São Paulo',
      state: 'SP',
    },
    featured: true,
    images: [
      'https://example.com/imagem1.jpg',
      'https://example.com/imagem2.jpg',
      'https://example.com/imagem3.jpg',
    ],
  },
  {
    id: 2,
    title: 'Casa em Rio de Janeiro',
    description: 'Uma casa espaçosa na cidade do Rio de Janeiro.',
    type: 'house',
    price: 350000,
    location: {
      city: 'Rio de Janeiro',
      state: 'RJ',
    },
    featured: false,
    images: [
      'https://example.com/imagem4.jpg',
      'https://example.com/imagem5.jpg',
      'https://example.com/imagem6.jpg',
    ],
  },
  {
    id: 3,
    title: 'Apartamento com vista para o mar',
    description: 'Apartamento alto padrão com varanda e vista panorâmica para o mar.',
    type: 'apartment',
    price: 480000,
    location: {
      city: 'Florianópolis',
      state: 'SC',
    },
    featured: true,
    images: [
      'https://example.com/imagem7.jpg',
      'https://example.com/imagem8.jpg',
    ],
  },
  {
    id: 4,
    title: 'Casa térrea com quintal',
    description: 'Casa térrea com amplo quintal, ideal para família com crianças e pets.',
    type: 'house',
    price: 420000,
    location: {
      city: 'Campinas',
      state: 'SP',
    },
    featured: false,
    images: [
      'https://example.com/imagem9.jpg',
      'https://example.com/imagem10.jpg',
    ],
  },
  {
    id: 5,
    title: 'Sala comercial no centro',
    description: 'Sala comercial pronta para uso em edifício moderno no centro.',
    type: 'commercial',
    price: 310000,
    location: {
      city: 'Curitiba',
      state: 'PR',
    },
    featured: false,
    images: [
      'https://example.com/imagem11.jpg',
      'https://example.com/imagem12.jpg',
    ],
  },
  {
    id: 6,
    title: 'Cobertura duplex',
    description: 'Cobertura duplex com área gourmet e piscina privativa.',
    type: 'apartment',
    price: 780000,
    location: {
      city: 'Belo Horizonte',
      state: 'MG',
    },
    featured: true,
    images: [
      'https://example.com/imagem13.jpg',
      'https://example.com/imagem14.jpg',
      'https://example.com/imagem15.jpg',
    ],
  },
  {
    id: 7,
    title: 'Casa em condomínio fechado',
    description: 'Casa em condomínio fechado com segurança 24h e área de lazer completa.',
    type: 'house',
    price: 690000,
    location: {
      city: 'Sorocaba',
      state: 'SP',
    },
    featured: true,
    images: [
      'https://example.com/imagem16.jpg',
      'https://example.com/imagem17.jpg',
    ],
  },
  {
    id: 8,
    title: 'Loja de rua em ponto movimentado',
    description: 'Loja térrea em avenida comercial com grande fluxo de pedestres.',
    type: 'commercial',
    price: 530000,
    location: {
      city: 'Porto Alegre',
      state: 'RS',
    },
    featured: false,
    images: [
      'https://example.com/imagem18.jpg',
      'https://example.com/imagem19.jpg',
    ],
  },
  {
    id: 9,
    title: 'Studio compacto mobiliado',
    description: 'Studio mobiliado próximo a universidades e estações de metrô.',
    type: 'apartment',
    price: 210000,
    location: {
      city: 'São Paulo',
      state: 'SP',
    },
    featured: false,
    images: [
      'https://example.com/imagem20.jpg',
      'https://example.com/imagem21.jpg',
    ],
  },
  {
    id: 10,
    title: 'Chácara para lazer',
    description: 'Chácara com área verde, piscina e espaço para eventos de fim de semana.',
    type: 'house',
    price: 560000,
    location: {
      city: 'Atibaia',
      state: 'SP',
    },
    featured: true,
    images: [
      'https://example.com/imagem22.jpg',
      'https://example.com/imagem23.jpg',
    ],
  },
];
