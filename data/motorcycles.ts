export interface Motorcycle {
  id: string;
  name: string;
  category: 'Scooter' | 'Sport' | 'Adventure' | 'Cruiser' | 'Commuter';
  price: number;
  image: string;
  specs: {
    engine: string;
    displacement: string;
    power: string;
    torque: string;
    transmission: string;
    fuelCapacity: string;
    weight: string;
    seatHeight: string;
  };
  colors: {
    name: string;
    code: string;
    image: string;
  }[];
  features: string[];
  available: boolean;
}

export const motorcycles: Motorcycle[] = [
  {
    id: '1',
    name: 'Honda PCX 160',
    category: 'Scooter',
    price: 120000,
  image: 'https://placehold.co/300x200/FF6B35/ffffff?text=PCX+160',
    specs: {
      engine: '4-Stroke, 4-Valve, SOHC, Liquid-Cooled, eSP+',
      displacement: '157cc',
      power: '11.8 kW @ 8,500 rpm',
      torque: '14.7 Nm @ 6,500 rpm',
      transmission: 'Automatic',
      fuelCapacity: '8.1 L',
      weight: '132 kg',
      seatHeight: '764 mm'
    },
    colors: [
  { name: 'Vortex Red Metallic', code: '#da0000', image: 'https://placehold.co/300x200/FF6B35/ffffff?text=PCX+160+Orange' },
  { name: 'Pearl Fadeless White', code: '#FFFFFF', image: 'https://placehold.co/300x200/FFFFFF/000000?text=PCX+160+White' },
  { name: 'Matte Axis Gray Metallic', code: '#767575', image: 'https://placehold.co/300x200/767575/ffffff?text=PCX+160+Gray' }
    ],
    features: ['Smart Key System', 'All LED Lighting', 'USB Charging Port', 'Digital Instrument Panel'],
    available: true
  },
  {
    id: '2',
    name: 'Honda Click 160i',
    category: 'Scooter',
    price: 95000,
  image: 'https://placehold.co/300x200/1E88E5/ffffff?text=Click+160i',
    specs: {
      engine: '4-Stroke, Single Cylinder, SOHC',
      displacement: '156.9cc',
      power: '15.8 HP @ 8,500 rpm',
      torque: '15 Nm @ 6,500 rpm',
      transmission: 'Automatic CVT',
      fuelCapacity: '5.5 L',
      weight: '116 kg',
      seatHeight: '776 mm'
    },
    colors: [
      { name: 'Candy Tahitian Blue', code: '#1E88E5', image: '/images/click160-blue.jpg' },
      { name: 'Pearl Jasmine White', code: '#FFFFFF', image: '/images/click160-white.jpg' },
      { name: 'Matte Axis Gray Metallic', code: '#424242', image: '/images/click160-gray.jpg' }
    ],
    features: ['eSP+ Engine', 'All LED Lighting', 'Digital Instrument Panel', 'Under Seat Storage'],
    available: true
  },
  {
    id: '3',
    name: 'Honda CBR150R',
    category: 'Sport',
    price: 140000,
  image: 'https://placehold.co/300x200/DC143C/ffffff?text=CBR150R',
    specs: {
      engine: '4-Stroke, Single Cylinder, DOHC',
      displacement: '149.16cc',
      power: '17.1 HP @ 9,000 rpm',
      torque: '14.4 Nm @ 7,000 rpm',
      transmission: '6-Speed Manual',
      fuelCapacity: '12 L',
      weight: '137 kg',
      seatHeight: '790 mm'
    },
    colors: [
      { name: 'Racing Red', code: '#DC143C', image: '/images/cbr150r-red.jpg' },
      { name: 'Victory Black Red', code: '#000000', image: '/images/cbr150r-black.jpg' },
      { name: 'White', code: '#FFFFFF', image: '/images/cbr150r-white.jpg' }
    ],
    features: ['Liquid Cooled Engine', 'Full Digital Meter', 'LED Headlight', 'ABS'],
    available: true
  },
  {
    id: '4',
    name: 'Honda ADV 160',
    category: 'Adventure',
    price: 135000,
  image: 'https://placehold.co/300x200/424242/ffffff?text=ADV+160',
    specs: {
      engine: '4-Stroke, Single Cylinder, SOHC',
      displacement: '156.9cc',
      power: '15.8 HP @ 8,500 rpm',
      torque: '15 Nm @ 6,500 rpm',
      transmission: 'Automatic CVT',
      fuelCapacity: '8.1 L',
      weight: '134 kg',
      seatHeight: '795 mm'
    },
    colors: [
      { name: 'Matte Axis Gray Metallic', code: '#424242', image: '/images/adv160-gray.jpg' },
      { name: 'Pearl Jasmine White', code: '#FFFFFF', image: '/images/adv160-white.jpg' },
      { name: 'Candy Energy Orange', code: '#FF6B35', image: '/images/adv160-orange.jpg' }
    ],
    features: ['Smart Key System', 'All LED Lighting', 'USB Charging Port', 'Large Ground Clearance'],
    available: true
  },
  {
    id: '5',
    name: 'Honda Wave 110i',
    category: 'Commuter',
    price: 65000,
  image: 'https://placehold.co/300x200/DC143C/ffffff?text=Wave+110i',
    specs: {
      engine: '4-Stroke, Single Cylinder, SOHC',
      displacement: '109.51cc',
      power: '8.8 HP @ 7,500 rpm',
      torque: '9.0 Nm @ 5,500 rpm',
      transmission: '4-Speed Semi-Automatic',
      fuelCapacity: '3.7 L',
      weight: '96 kg',
      seatHeight: '767 mm'
    },
    colors: [
      { name: 'Candy Tahitian Blue', code: '#1E88E5', image: '/images/wave110-blue.jpg' },
      { name: 'Black', code: '#000000', image: '/images/wave110-black.jpg' },
      { name: 'Red', code: '#DC143C', image: '/images/wave110-red.jpg' }
    ],
    features: ['Fuel Efficient', 'Electric Start', 'Tubeless Tires', 'LED Headlight'],
    available: true
  },
  {
    id: '6',
    name: 'Honda TMX Supremo 150',
    category: 'Commuter',
    price: 88000,
  image: 'https://placehold.co/300x200/1E88E5/ffffff?text=TMX+Supremo+150',
    specs: {
      engine: '4-Stroke, Single Cylinder, SOHC',
      displacement: '149.16cc',
      power: '12.8 HP @ 8,000 rpm',
      torque: '12.4 Nm @ 6,000 rpm',
      transmission: '5-Speed Manual',
      fuelCapacity: '11 L',
      weight: '118 kg',
      seatHeight: '789 mm'
    },
    colors: [
      { name: 'Candy Tahitian Blue', code: '#1E88E5', image: '/images/tmx-supremo-150-blue.jpg' },
      { name: 'Black', code: '#000000', image: '/images/tmx-supremo-150-black.jpg' },
      { name: 'Red', code: '#DC143C', image: '/images/tmx-supremo-150-red.jpg' }
    ],
    features: ['Fuel Efficient', 'Electric Start', 'Digital-Analog Meter', 'Tubeless Tires', 'Enhanced Performance'],
    available: true
  },
  {
    id: '7',
    name: 'Honda Click 125 SE',
    category: 'Scooter',
    price: 78000,
  image: 'https://placehold.co/300x200/FF6B35/ffffff?text=Click+125+SE',
    specs: {
      engine: '4-Stroke, Single Cylinder, SOHC',
      displacement: '124.9cc',
      power: '11.7 HP @ 8,000 rpm',
      torque: '10.9 Nm @ 6,000 rpm',
      transmission: 'Automatic CVT',
      fuelCapacity: '5.5 L',
      weight: '105 kg',
      seatHeight: '776 mm'
    },
    colors: [
      { name: 'Candy Energy Orange', code: '#FF6B35', image: '/images/click125se-orange.jpg' },
      { name: 'Pearl Jasmine White', code: '#FFFFFF', image: '/images/click125se-white.jpg' },
      { name: 'Matte Axis Gray Metallic', code: '#424242', image: '/images/click125se-gray.jpg' }
    ],
    features: ['eSP Engine', 'LED Headlight', 'Digital Instrument Panel', 'Under Seat Storage', 'Special Edition Design'],
    available: true
  },
  {
    id: '8',
    name: 'Honda Click 125 Standard',
    category: 'Scooter',
    price: 72000,
  image: 'https://placehold.co/300x200/1E88E5/ffffff?text=Click+125+Standard',
    specs: {
      engine: '4-Stroke, Single Cylinder, SOHC',
      displacement: '124.9cc',
      power: '11.7 HP @ 8,000 rpm',
      torque: '10.9 Nm @ 6,000 rpm',
      transmission: 'Automatic CVT',
      fuelCapacity: '5.5 L',
      weight: '103 kg',
      seatHeight: '776 mm'
    },
    colors: [
      { name: 'Candy Tahitian Blue', code: '#1E88E5', image: '/images/click125std-blue.jpg' },
      { name: 'Pearl Jasmine White', code: '#FFFFFF', image: '/images/click125std-white.jpg' },
      { name: 'Black', code: '#000000', image: '/images/click125std-black.jpg' }
    ],
    features: ['eSP Engine', 'LED Headlight', 'Analog Speedometer', 'Under Seat Storage'],
    available: true
  },
  {
    id: '9',
    name: 'Honda Beat Premium',
    category: 'Scooter',
    price: 65000,
  image: 'https://placehold.co/300x200/FFFFFF/000000?text=Beat+Premium',
    specs: {
      engine: '4-Stroke, Single Cylinder, SOHC',
      displacement: '109.51cc',
      power: '8.8 HP @ 7,500 rpm',
      torque: '9.0 Nm @ 5,500 rpm',
      transmission: 'Automatic CVT',
      fuelCapacity: '4.2 L',
      weight: '89 kg',
      seatHeight: '740 mm'
    },
    colors: [
      { name: 'Pearl Jasmine White', code: '#FFFFFF', image: '/images/beat-premium-white.jpg' },
      { name: 'Candy Energy Orange', code: '#FF6B35', image: '/images/beat-premium-orange.jpg' },
      { name: 'Matte Axis Gray Metallic', code: '#424242', image: '/images/beat-premium-gray.jpg' }
    ],
    features: ['eSP Engine', 'LED Headlight', 'Digital Speedometer', 'Premium Design', 'Combi Brake System'],
    available: true
  },
  {
    id: '10',
    name: 'Honda Beat Playful',
    category: 'Scooter',
    price: 58000,
  image: 'https://placehold.co/300x200/FF69B4/ffffff?text=Beat+Playful',
    specs: {
      engine: '4-Stroke, Single Cylinder, SOHC',
      displacement: '109.51cc',
      power: '8.8 HP @ 7,500 rpm',
      torque: '9.0 Nm @ 5,500 rpm',
      transmission: 'Automatic CVT',
      fuelCapacity: '4.2 L',
      weight: '87 kg',
      seatHeight: '740 mm'
    },
    colors: [
      { name: 'Playful Pink', code: '#FF69B4', image: '/images/beat-playful-pink.jpg' },
      { name: 'Vibrant Yellow', code: '#FFD700', image: '/images/beat-playful-yellow.jpg' },
      { name: 'Candy Energy Orange', code: '#FF6B35', image: '/images/beat-playful-orange.jpg' }
    ],
    features: ['eSP Engine', 'LED Headlight', 'Analog Speedometer', 'Playful Colors', 'Lightweight Design'],
    available: true
  },
  {
    id: '11',
    name: 'Honda Winner X Premium',
    category: 'Commuter',
    price: 95000,
  image: 'https://placehold.co/300x200/1E88E5/ffffff?text=Winner+X+Premium',
    specs: {
      engine: '4-Stroke, Single Cylinder, SOHC',
      displacement: '149.16cc',
      power: '13.2 HP @ 8,000 rpm',
      torque: '12.8 Nm @ 6,000 rpm',
      transmission: '5-Speed Manual',
      fuelCapacity: '4.3 L',
      weight: '116 kg',
      seatHeight: '789 mm'
    },
    colors: [
  { name: 'Candy Tahitian Blue', code: '#1E88E5', image: 'https://placehold.co/300x200/1E88E5/ffffff?text=Winner+X+Premium+Blue' },
  { name: 'Pearl Jasmine White', code: '#FFFFFF', image: 'https://placehold.co/300x200/FFFFFF/000000?text=Winner+X+Premium+White' },
  { name: 'Matte Axis Gray Metallic', code: '#424242', image: 'https://placehold.co/300x200/424242/ffffff?text=Winner+X+Premium+Gray' }
    ],
    features: ['Smart Key System', 'Full LED Lighting', 'Digital Instrument Panel', 'Premium Design', 'Enhanced Performance'],
    available: true
  },
  {
    id: '12',
    name: 'Honda Winner X Standard',
    category: 'Commuter',
    price: 88000,
  image: 'https://placehold.co/300x200/DC143C/ffffff?text=Winner+X+Standard',
    specs: {
      engine: '4-Stroke, Single Cylinder, SOHC',
      displacement: '149.16cc',
      power: '13.2 HP @ 8,000 rpm',
      torque: '12.8 Nm @ 6,000 rpm',
      transmission: '5-Speed Manual',
      fuelCapacity: '4.3 L',
      weight: '114 kg',
      seatHeight: '789 mm'
    },
    colors: [
  { name: 'Racing Red', code: '#DC143C', image: 'https://placehold.co/300x200/DC143C/ffffff?text=Winner+X+Standard+Red' },
  { name: 'Black', code: '#000000', image: 'https://placehold.co/300x200/000000/ffffff?text=Winner+X+Standard+Black' },
  { name: 'Pearl Jasmine White', code: '#FFFFFF', image: 'https://placehold.co/300x200/FFFFFF/000000?text=Winner+X+Standard+White' }
    ],
    features: ['LED Headlight', 'Digital-Analog Meter', 'Electric Start', 'Fuel Efficient', 'Reliable Performance'],
    available: true
  },
  {
    id: '13',
    name: 'Honda Winner X Racing',
    category: 'Sport',
    price: 105000,
  image: 'https://placehold.co/300x200/FF0000/ffffff?text=Winner+X+Racing',
    specs: {
      engine: '4-Stroke, Single Cylinder, SOHC',
      displacement: '149.16cc',
      power: '13.5 HP @ 8,200 rpm',
      torque: '13.2 Nm @ 6,200 rpm',
      transmission: '5-Speed Manual',
      fuelCapacity: '4.3 L',
      weight: '118 kg',
      seatHeight: '789 mm'
    },
    colors: [
  { name: 'Racing Red', code: '#FF0000', image: 'https://placehold.co/300x200/FF0000/ffffff?text=Winner+X+Racing+Red' },
  { name: 'Matte Black', code: '#1C1C1C', image: 'https://placehold.co/300x200/1C1C1C/ffffff?text=Winner+X+Racing+Black' },
  { name: 'Racing Blue', code: '#0066FF', image: 'https://placehold.co/300x200/0066FF/ffffff?text=Winner+X+Racing+Blue' }
    ],
    features: ['Racing Graphics', 'Sport Suspension', 'Full LED Lighting', 'Digital Instrument Panel', 'Enhanced Power', 'Racing Design'],
    available: true
  },
  {
    id: '14',
    name: 'Honda TMX 125 Alpha',
    category: 'Commuter',
    price: 78000,
  image: 'https://placehold.co/300x200/228B22/ffffff?text=TMX+125+Alpha',
    specs: {
      engine: '4-Stroke, Single Cylinder, SOHC',
      displacement: '124.9cc',
      power: '11.0 HP @ 8,000 rpm',
      torque: '10.3 Nm @ 6,000 rpm',
      transmission: '4-Speed Manual',
      fuelCapacity: '8.5 L',
      weight: '108 kg',
      seatHeight: '789 mm'
    },
    colors: [
  { name: 'Forest Green', code: '#228B22', image: 'https://placehold.co/300x200/228B22/ffffff?text=TMX+125+Alpha+Green' },
  { name: 'Black', code: '#000000', image: 'https://placehold.co/300x200/000000/ffffff?text=TMX+125+Alpha+Black' },
  { name: 'Candy Tahitian Blue', code: '#1E88E5', image: 'https://placehold.co/300x200/1E88E5/ffffff?text=TMX+125+Alpha+Blue' }
    ],
    features: ['Fuel Efficient', 'Electric Start', 'Analog Speedometer', 'Reliable Engine', 'Affordable Maintenance'],
    available: true
  },
  {
    id: '15',
    name: 'Honda Giorno+',
    category: 'Scooter',
    price: 62000,
  image: 'https://placehold.co/300x200/FF1493/ffffff?text=Giorno+Plus',
    specs: {
      engine: '4-Stroke, Single Cylinder, SOHC',
      displacement: '109.51cc',
      power: '8.8 HP @ 7,500 rpm',
      torque: '9.0 Nm @ 5,500 rpm',
      transmission: 'Automatic CVT',
      fuelCapacity: '4.2 L',
      weight: '89 kg',
      seatHeight: '740 mm'
    },
    colors: [
  { name: 'Deep Pink', code: '#FF1493', image: 'https://placehold.co/300x200/FF1493/ffffff?text=Giorno+Plus+Pink' },
  { name: 'Pearl Jasmine White', code: '#FFFFFF', image: 'https://placehold.co/300x200/FFFFFF/000000?text=Giorno+Plus+White' },
  { name: 'Matte Axis Gray Metallic', code: '#424242', image: 'https://placehold.co/300x200/424242/ffffff?text=Giorno+Plus+Gray' }
    ],
    features: ['eSP Engine', 'LED Headlight', 'Digital Speedometer', 'Stylish Design', 'Compact Size', 'Easy Handling'],
    available: true
  }
];