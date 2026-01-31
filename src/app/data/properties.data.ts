import { Property } from '@/app/types/property';

export const PROPERTIES_MOCK: Property[] = [
  {
    id: 1,
    title: 'HOME.PROPERTIES.P1.TITLE',
    description: 'HOME.PROPERTIES.P1.DESCRIPTION',
    type: 'apartment',
    price: 250000,
    location: {
      city: 'São Paulo',
      state: 'SP',
    },
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
    ],
  },
  {
    id: 2,
    title: 'HOME.PROPERTIES.P2.TITLE',
    description: 'HOME.PROPERTIES.P2.DESCRIPTION',
    type: 'house',
    price: 350000,
    location: {
      city: 'Rio de Janeiro',
      state: 'RJ',
    },
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://example.com/imagem5.jpg',
      'https://example.com/imagem6.jpg',
    ],
  },
  {
    id: 3,
    title: 'HOME.PROPERTIES.P3.TITLE',
    description: 'HOME.PROPERTIES.P3.DESCRIPTION',
    type: 'apartment',
    price: 480000,
    location: {
      city: 'Florianópolis',
      state: 'SC',
    },
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
    ],
  },
  {
    id: 4,
    title: 'HOME.PROPERTIES.P4.TITLE',
    description: 'HOME.PROPERTIES.P4.DESCRIPTION',
    type: 'house',
    price: 420000,
    location: {
      city: 'Campinas',
      state: 'SP',
    },
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6',
      'https://images.unsplash.com/photo-1502673530728-f79b4cab31b1',
    ],
  },
  {
    id: 5,
    title: 'HOME.PROPERTIES.P5.TITLE',
    description: 'HOME.PROPERTIES.P5.DESCRIPTION',
    type: 'commercial',
    price: 310000,
    location: {
      city: 'Curitiba',
      state: 'PR',
    },
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 6,
    title: 'HOME.PROPERTIES.P6.TITLE',
    description: 'HOME.PROPERTIES.P6.DESCRIPTION',
    type: 'apartment',
    price: 780000,
    location: {
      city: 'Belo Horizonte',
      state: 'MG',
    },
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1600&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 7,
    title: 'HOME.PROPERTIES.P7.TITLE',
    description: 'HOME.PROPERTIES.P7.DESCRIPTION',
    type: 'house',
    price: 690000,
    location: {
      city: 'Sorocaba',
      state: 'SP',
    },
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=1600&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 8,
    title: 'HOME.PROPERTIES.P8.TITLE',
    description: 'HOME.PROPERTIES.P8.DESCRIPTION',
    type: 'commercial',
    price: 530000,
    location: {
      city: 'Porto Alegre',
      state: 'RS',
    },
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=1600&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 9,
    title: 'HOME.PROPERTIES.P9.TITLE',
    description: 'HOME.PROPERTIES.P9.DESCRIPTION',
    type: 'apartment',
    price: 210000,
    location: {
      city: 'São Paulo',
      state: 'SP',
    },
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 10,
    title: 'HOME.PROPERTIES.P10.TITLE',
    description: 'HOME.PROPERTIES.P10.DESCRIPTION',
    type: 'house',
    price: 560000,
    location: {
      city: 'Atibaia',
      state: 'SP',
    },
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1600&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 11,
    title: 'HOME.PROPERTIES.P11.TITLE',
    description: 'HOME.PROPERTIES.P11.DESCRIPTION',
    type: 'apartment',
    price: 420000,
    location: {
      city: 'Campinas',
      state: 'SP',
    },
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 12,
    title: 'HOME.PROPERTIES.P12.TITLE',
    description: 'HOME.PROPERTIES.P12.DESCRIPTION',
    type: 'house',
    price: 780000,
    location: {
      city: 'Jundiaí',
      state: 'SP',
    },
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 13,
    title: 'HOME.PROPERTIES.P13.TITLE',
    description: 'HOME.PROPERTIES.P13.DESCRIPTION',
    type: 'commercial',
    price: 980000,
    location: {
      city: 'São Paulo',
      state: 'SP',
    },
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 14,
    title: 'HOME.PROPERTIES.P14.TITLE',
    description: 'HOME.PROPERTIES.P14.DESCRIPTION',
    type: 'apartment',
    price: 350000,
    location: {
      city: 'Sorocaba',
      state: 'SP',
    },
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1527030280862-64139fba04ca?w=1600&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 15,
    title: 'HOME.PROPERTIES.P15.TITLE',
    description: 'HOME.PROPERTIES.P15.DESCRIPTION',
    type: 'house',
    price: 1250000,
    location: {
      city: 'Campos do Jordão',
      state: 'SP',
    },
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=1600&auto=format&fit=crop&q=80',
    ],
  },
];
