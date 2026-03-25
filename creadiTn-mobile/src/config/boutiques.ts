/**
 * Boutiques (Partners/Merchants) Data
 * Synced with dashboard creadiTN
 */

export interface Product {
  name: string;
  price: string;
  emoji: string;
}

export interface Boutique {
  id: number;
  name: string;
  logo: string;
  category: string;
  city: string;
  conventionActive: boolean;
  description: string;
  website: string;
  founded: string;
  locations: number;
  products: Product[];
}

export const categories = [
  'Tous',
  'Informatique & Électronique',
  'Grande Distribution',
  'Mode & Beauté',
  'Électroménager',
  'Meubles & Décoration',
  'Sport & Loisirs',
];

export const cities = [
  'Toutes',
  'Tunis',
  'Sfax',
  'Sousse',
  'Ariana',
  'Ben Arous',
  'La Marsa',
  'Nabeul',
  'Monastir',
];

export const boutiques: Boutique[] = [
  {
    id: 1,
    name: 'Aziza',
    logo: '🛒',
    category: 'Grande Distribution',
    city: 'Tunis',
    conventionActive: true,
    description: 'Chaîne de supermarchés tunisienne à prix compétitifs.',
    website: 'https://www.aziza.tn',
    founded: '2009',
    locations: 120,
    products: [
      { name: 'Panier alimentaire familial', price: '45 TND', emoji: '🧺' },
      { name: 'Pack produits ménagers', price: '28 TND', emoji: '🧹' },
    ],
  },
  {
    id: 2,
    name: 'MyTek',
    logo: '💻',
    category: 'Informatique & Électronique',
    city: 'Tunis',
    conventionActive: true,
    description: 'Leader de la vente en ligne high-tech en Tunisie.',
    website: 'https://www.mytek.tn',
    founded: '2010',
    locations: 15,
    products: [
      { name: 'Laptop HP Pavilion 15"', price: '2 499 TND', emoji: '💻' },
      { name: 'iPhone 15 Pro 128Go', price: '4 299 TND', emoji: '📱' },
    ],
  },
  {
    id: 3,
    name: 'Mega PC',
    logo: '🖥️',
    category: 'Informatique & Électronique',
    city: 'Tunis',
    conventionActive: true,
    description: 'Spécialiste PC et composants informatiques.',
    website: 'https://www.megapc.tn',
    founded: '2005',
    locations: 5,
    products: [
      { name: 'PC Gamer RTX 4060', price: '3 200 TND', emoji: '🎮' },
      { name: 'Écran 27" 144Hz', price: '890 TND', emoji: '🖥️' },
    ],
  },
  {
    id: 4,
    name: 'FATALES',
    logo: '💄',
    category: 'Mode & Beauté',
    city: 'Tunis',
    conventionActive: true,
    description: 'Parfums et cosmétiques de grandes marques.',
    website: 'https://www.fatales.tn',
    founded: '2003',
    locations: 30,
    products: [
      { name: 'Coffret Dior Sauvage', price: '320 TND', emoji: '✨' },
      { name: 'Palette maquillage MAC', price: '185 TND', emoji: '💄' },
    ],
  },
  {
    id: 5,
    name: 'Zen',
    logo: '🏠',
    category: 'Meubles & Décoration',
    city: 'Tunis',
    conventionActive: true,
    description: 'Mobilier moderne et décoration d\'intérieur.',
    website: 'https://www.zen.com.tn',
    founded: '2008',
    locations: 10,
    products: [
      { name: 'Canapé d\'angle modulable', price: '2 800 TND', emoji: '🛋️' },
      { name: 'Table basse scandinave', price: '450 TND', emoji: '🪑' },
    ],
  },
  {
    id: 6,
    name: 'Hamadi Abid (HA)',
    logo: '🔌',
    category: 'Électroménager',
    city: 'Tunis',
    conventionActive: true,
    description: 'Électroménager et hi-fi depuis plus de 50 ans.',
    website: 'https://www.ha.tn',
    founded: '1970',
    locations: 25,
    products: [
      { name: 'Réfrigérateur LG 500L', price: '1 899 TND', emoji: '❄️' },
      { name: 'Machine à laver Samsung', price: '890 TND', emoji: '🧺' },
    ],
  },
  {
    id: 7,
    name: 'Nakache',
    logo: '👗',
    category: 'Mode & Beauté',
    city: 'Tunis',
    conventionActive: true,
    description: 'Mode tunisienne traditionnelle et moderne.',
    website: 'https://www.nakache.tn',
    founded: '2000',
    locations: 20,
    products: [
      { name: 'Jellaba traditionnelle', price: '120 TND', emoji: '👗' },
      { name: 'Chemise men\'s premium', price: '89 TND', emoji: '👔' },
    ],
  },
  {
    id: 8,
    name: 'Décathlon Tunisie',
    logo: '⚽',
    category: 'Sport & Loisirs',
    city: 'Tunis',
    conventionActive: true,
    description: 'Équipements et vêtements de sport pour tous.',
    website: 'https://www.decathlon.tn',
    founded: '2015',
    locations: 8,
    products: [
      { name: 'Ballon de foot Kalenji', price: '45 TND', emoji: '⚽' },
      { name: 'Chaussures running', price: '199 TND', emoji: '👟' },
    ],
  },
];
