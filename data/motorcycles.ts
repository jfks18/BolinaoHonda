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
  // SCOOTERS - Updated with Honda Philippines Official Data (2024)
  {
    id: 'click-125',
    name: 'Honda Click 125',
    category: 'Scooter',
    price: 81900,
    image: 'https://via.placeholder.com/300x200/0d6efd/ffffff?text=Click+125',
    specs: {
      engine: '4-Stroke, 2-Valve, SOHC, Liquid-Cooled, eSP',
      displacement: '125cc',
      power: '8.2 kW @ 8,500 rpm',
      torque: '10.8 Nm @ 5,000 rpm',
      transmission: 'V-Matic (CVT)',
      fuelCapacity: '5.5 L',
      weight: '112 kg',
      seatHeight: '769 mm'
    },
    colors: [
      { name: 'Pearl Arctic White', code: '#f8f9fa', image: '/images/click125-white.jpg' },
      { name: 'Pearl Sylvestris Gray', code: '#6c757d', image: '/images/click125-gray.jpg' },
      { name: 'Stellar Blue Metallic', code: '#0d6efd', image: '/images/click125-blue.jpg' },
      { name: 'Obsidian Black Metallic', code: '#212529', image: '/images/click125-black.jpg' }
    ],
    features: ['125CC Liquid-Cooled PGM-Fi eSP Engine', 'New Two-Tone Color Combination', 'Wide Tubeless Tires', 'USB Charging Port'],
    available: true
  },
  {
    id: 'click-125-se',
    name: 'Honda Click 125 Special Edition',
    category: 'Scooter',
    price: 84900,
    image: 'https://via.placeholder.com/300x200/dc3545/ffffff?text=Click+125+SE',
    specs: {
      engine: '4-Stroke, 2-Valve, SOHC, Liquid-Cooled, eSP',
      displacement: '125cc',
      power: '8.2 kW @ 8,500 rpm',
      torque: '10.8 Nm @ 5,000 rpm',
      transmission: 'V-Matic (CVT)',
      fuelCapacity: '5.5 L',
      weight: '112 kg',
      seatHeight: '769 mm'
    },
    colors: [
      { name: 'Obsidian Black Metallic', code: '#212529', image: '/images/click125se-black.jpg' },
      { name: 'Pearl Arctic White', code: '#f8f9fa', image: '/images/click125se-white.jpg' },
      { name: 'Pearl Crimson Red', code: '#dc3545', image: '/images/click125se-red.jpg' }
    ],
    features: ['3D Special Edition Emblem', 'Premium Two-Tone Design', 'Enhanced eSP Engine', 'USB Charging Port'],
    available: true
  },
  {
    id: 'beat-playful',
    name: 'Honda BeAT Playful',
    category: 'Scooter',
    price: 72400,
    image: 'https://via.placeholder.com/300x200/fd7e14/ffffff?text=BeAT+Playful',
    specs: {
      engine: '4-Stroke, Air-Cooled, SOHC, eSP',
      displacement: '109.51cc',
      power: '6.6 kW @ 7,500 rpm',
      torque: '8.9 Nm @ 5,500 rpm',
      transmission: 'V-Matic (CVT)',
      fuelCapacity: '4.2 L',
      weight: '90 kg',
      seatHeight: '740 mm'
    },
    colors: [
      { name: 'Candy Energy Orange', code: '#fd7e14', image: '/images/beat-playful-orange.jpg' },
      { name: 'Pearl Jasmine White', code: '#f8f9fa', image: '/images/beat-playful-white.jpg' },
      { name: 'Matte Axis Gray Metallic', code: '#6c757d', image: '/images/beat-playful-gray.jpg' },
      { name: 'Candy Tahitian Blue', code: '#0dcaf0', image: '/images/beat-playful-blue.jpg' }
    ],
    features: ['Enhanced Smart Power (eSP)', 'Playful Design Elements', 'Fuel Injection System', 'LED Position Light'],
    available: true
  },
  {
    id: 'beat-premium',
    name: 'Honda BeAT Premium',
    category: 'Scooter',
    price: 74400,
    image: 'https://via.placeholder.com/300x200/f8f9fa/000000?text=BeAT+Premium',
    specs: {
      engine: '4-Stroke, Air-Cooled, SOHC, eSP',
      displacement: '109.51cc',
      power: '6.6 kW @ 7,500 rpm',
      torque: '8.9 Nm @ 5,500 rpm',
      transmission: 'V-Matic (CVT)',
      fuelCapacity: '4.2 L',
      weight: '90 kg',
      seatHeight: '740 mm'
    },
    colors: [
      { name: 'Pearl Jasmine White', code: '#f8f9fa', image: '/images/beat-premium-white.jpg' },
      { name: 'Matte Axis Gray Metallic', code: '#6c757d', image: '/images/beat-premium-gray.jpg' },
      { name: 'Candy Energy Orange', code: '#fd7e14', image: '/images/beat-premium-orange.jpg' }
    ],
    features: ['Premium Design Package', 'Enhanced eSP Engine', 'PGM-Fi Fuel Injection', 'Full LED Lighting'],
    available: true
  },
  {
    id: 'giorno-plus',
    name: 'Honda Giorno+',
    category: 'Scooter',
    price: 101900,
    image: 'https://via.placeholder.com/300x200/0d6efd/ffffff?text=Giorno+Plus',
    specs: {
      engine: '4-Stroke, Air-Cooled, SOHC, eSP',
      displacement: '109.51cc',
      power: '6.6 kW @ 7,500 rpm',
      torque: '8.9 Nm @ 5,500 rpm',
      transmission: 'V-Matic (CVT)',
      fuelCapacity: '4.2 L',
      weight: '96 kg',
      seatHeight: '765 mm'
    },
    colors: [
      { name: 'Pearl Jasmine White', code: '#f8f9fa', image: '/images/giorno-white.jpg' },
      { name: 'Matte Axis Gray Metallic', code: '#6c757d', image: '/images/giorno-gray.jpg' },
      { name: 'Pearl Nightfall Blue', code: '#0d6efd', image: '/images/giorno-blue.jpg' }
    ],
    features: ['Retro-Modern Design', 'Enhanced eSP Technology', 'Smart Key System', 'LED Lighting Package'],
    available: true
  },
  {
    id: 'navi-special',
    name: 'Honda NAVi (Special Price)',
    category: 'Scooter',
    price: 56900,
    image: 'https://via.placeholder.com/300x200/ffc107/000000?text=NAVi+Special',
    specs: {
      engine: '4-Stroke, Air-Cooled, SOHC',
      displacement: '109.51cc',
      power: '6.0 kW @ 7,000 rpm',
      torque: '8.8 Nm @ 5,500 rpm',
      transmission: 'V-Matic (CVT)',
      fuelCapacity: '3.8 L',
      weight: '85 kg',
      seatHeight: '765 mm'
    },
    colors: [
      { name: 'Pearl Sports Yellow', code: '#ffc107', image: '/images/navi-yellow.jpg' },
      { name: 'Patriot Red', code: '#dc3545', image: '/images/navi-red.jpg' },
      { name: 'Black', code: '#212529', image: '/images/navi-black.jpg' }
    ],
    features: ['Adventure-Inspired Design', 'Rugged Styling Elements', 'LED Headlight', 'Special Pricing Offer'],
    available: true
  },

  // UNDERBONE MOTORCYCLES - Honda Philippines Official Data
  {
    id: 'wave-rsx-drum',
    name: 'Honda Wave RSX (Drum)',
    category: 'Commuter',
    price: 62900,
    image: 'https://via.placeholder.com/300x200/ffc107/000000?text=Wave+RSX+Drum',
    specs: {
      engine: '4-Stroke, Air-Cooled, SOHC, eSP',
      displacement: '109.51cc',
      power: '6.6 kW @ 7,500 rpm',
      torque: '8.9 Nm @ 5,500 rpm',
      transmission: 'Rotary 4-Speed',
      fuelCapacity: '3.7 L',
      weight: '96 kg',
      seatHeight: '760 mm'
    },
    colors: [
      { name: 'Pearl Sports Yellow', code: '#ffc107', image: '/images/wave-rsx-yellow.jpg' },
      { name: 'Candy Tahitian Blue', code: '#0dcaf0', image: '/images/wave-rsx-blue.jpg' },
      { name: 'Pearl Jasmine White', code: '#f8f9fa', image: '/images/wave-rsx-white.jpg' }
    ],
    features: ['Enhanced Smart Power (eSP)', 'Fuel Injection System', 'Digital Speedometer', 'LED Position Light'],
    available: true
  },
  {
    id: 'wave-rsx-disc',
    name: 'Honda Wave RSX (Disc)',
    category: 'Commuter',
    price: 64900,
    image: 'https://via.placeholder.com/300x200/0dcaf0/ffffff?text=Wave+RSX+Disc',
    specs: {
      engine: '4-Stroke, Air-Cooled, SOHC, eSP',
      displacement: '109.51cc',
      power: '6.6 kW @ 7,500 rpm',
      torque: '8.9 Nm @ 5,500 rpm',
      transmission: 'Rotary 4-Speed',
      fuelCapacity: '3.7 L',
      weight: '98 kg',
      seatHeight: '760 mm'
    },
    colors: [
      { name: 'Pearl Sports Yellow', code: '#ffc107', image: '/images/wave-rsx-disc-yellow.jpg' },
      { name: 'Candy Tahitian Blue', code: '#0dcaf0', image: '/images/wave-rsx-disc-blue.jpg' },
      { name: 'Pearl Jasmine White', code: '#f8f9fa', image: '/images/wave-rsx-disc-white.jpg' }
    ],
    features: ['Enhanced eSP Technology', 'Front Disc Brake System', 'PGM-Fi Fuel Injection', 'Digital Instrument Cluster'],
    available: true
  },
  {
    id: 'xrm-125-ds',
    name: 'Honda XRM 125 DS',
    category: 'Commuter',
    price: 71900,
    image: 'https://via.placeholder.com/300x200/fd7e14/ffffff?text=XRM+125+DS',
    specs: {
      engine: '4-Stroke, Air-Cooled, SOHC, eSP',
      displacement: '124.89cc',
      power: '7.5 kW @ 7,500 rpm',
      torque: '10.3 Nm @ 6,000 rpm',
      transmission: 'Rotary 4-Speed',
      fuelCapacity: '5.4 L',
      weight: '108 kg',
      seatHeight: '784 mm'
    },
    colors: [
      { name: 'Candy Energy Orange', code: '#fd7e14', image: '/images/xrm125ds-orange.jpg' },
      { name: 'Pearl Sports Yellow', code: '#ffc107', image: '/images/xrm125ds-yellow.jpg' },
      { name: 'Matte Axis Gray Metallic', code: '#6c757d', image: '/images/xrm125ds-gray.jpg' }
    ],
    features: ['Dual Sport Design', 'Enhanced eSP Engine', 'PGM-Fi Technology', 'Front Disc Brake'],
    available: true
  },
  {
    id: 'xrm-125-dsx',
    name: 'Honda XRM 125 DSX',
    category: 'Commuter',
    price: 75400,
    image: 'https://via.placeholder.com/300x200/fd7e14/ffffff?text=XRM+125+DSX',
    specs: {
      engine: '4-Stroke, Air-Cooled, SOHC, eSP',
      displacement: '124.89cc',
      power: '7.5 kW @ 7,500 rpm',
      torque: '10.3 Nm @ 6,000 rpm',
      transmission: 'Rotary 4-Speed',
      fuelCapacity: '5.4 L',
      weight: '110 kg',
      seatHeight: '784 mm'
    },
    colors: [
      { name: 'Candy Energy Orange', code: '#fd7e14', image: '/images/xrm125dsx-orange.jpg' },
      { name: 'Pearl Sports Yellow', code: '#ffc107', image: '/images/xrm125dsx-yellow.jpg' },
      { name: 'Matte Black Metallic', code: '#212529', image: '/images/xrm125dsx-black.jpg' }
    ],
    features: ['Premium DSX Package', 'Enhanced eSP Technology', 'Advanced PGM-Fi System', 'Premium Graphics Package'],
    available: true
  },
  {
    id: 'xrm-125-motard',
    name: 'Honda XRM 125 Motard',
    category: 'Commuter',
    price: 76900,
    image: 'https://via.placeholder.com/300x200/fd7e14/ffffff?text=XRM+125+Motard',
    specs: {
      engine: '4-Stroke, Air-Cooled, SOHC, eSP',
      displacement: '124.89cc',
      power: '7.5 kW @ 7,500 rpm',
      torque: '10.3 Nm @ 6,000 rpm',
      transmission: 'Rotary 4-Speed',
      fuelCapacity: '5.4 L',
      weight: '112 kg',
      seatHeight: '790 mm'
    },
    colors: [
      { name: 'Candy Energy Orange', code: '#fd7e14', image: '/images/xrm125motard-orange.jpg' },
      { name: 'Pearl Sports Yellow', code: '#ffc107', image: '/images/xrm125motard-yellow.jpg' },
      { name: 'Matte Black Metallic', code: '#212529', image: '/images/xrm125motard-black.jpg' }
    ],
    features: ['Motard Styling Package', 'Enhanced eSP Engine', 'Front & Rear Disc Brakes', 'Supermoto Design'],
    available: true
  },
  {
    id: 'rs-125',
    name: 'Honda RS 125',
    category: 'Commuter',
    price: 75900,
    image: 'https://via.placeholder.com/300x200/fd7e14/ffffff?text=RS+125',
    specs: {
      engine: '4-Stroke, Air-Cooled, SOHC, eSP',
      displacement: '124.89cc',
      power: '7.5 kW @ 7,500 rpm',
      torque: '10.3 Nm @ 6,000 rpm',
      transmission: 'Rotary 4-Speed',
      fuelCapacity: '5.0 L',
      weight: '105 kg',
      seatHeight: '775 mm'
    },
    colors: [
      { name: 'Candy Energy Orange', code: '#fd7e14', image: '/images/rs125-orange.jpg' },
      { name: 'Pearl Sports Yellow', code: '#ffc107', image: '/images/rs125-yellow.jpg' },
      { name: 'Matte Axis Gray Metallic', code: '#6c757d', image: '/images/rs125-gray.jpg' }
    ],
    features: ['Racing-Inspired Design', 'Enhanced eSP Technology', 'PGM-Fi System', 'Front Disc Brake'],
    available: true
  },

  // LEGACY MODELS - Updated Pricing
  {
    id: 'cbr150r',
    name: 'Honda CBR150R',
    category: 'Sport',
    price: 140000,
    image: 'https://via.placeholder.com/300x200/DC143C/ffffff?text=CBR150R',
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
    id: 'adv160',
    name: 'Honda ADV 160',
    category: 'Adventure',
    price: 135000,
    image: 'https://via.placeholder.com/300x200/424242/ffffff?text=ADV+160',
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
    id: 'pcx160',
    name: 'Honda PCX 160',
    category: 'Scooter',
    price: 130000,
    image: 'https://via.placeholder.com/300x200/FF6B35/ffffff?text=PCX+160',
    specs: {
      engine: '4-Stroke, Single Cylinder, SOHC',
      displacement: '156.9cc',
      power: '15.8 HP @ 8,500 rpm',
      torque: '15 Nm @ 6,500 rpm',
      transmission: 'Automatic CVT',
      fuelCapacity: '8.1 L',
      weight: '132 kg',
      seatHeight: '764 mm'
    },
    colors: [
      { name: 'Candy Energy Orange', code: '#FF6B35', image: '/images/pcx160-orange.jpg' },
      { name: 'Pearl Jasmine White', code: '#FFFFFF', image: '/images/pcx160-white.jpg' },
      { name: 'Matte Axis Gray Metallic', code: '#424242', image: '/images/pcx160-gray.jpg' }
    ],
    features: ['Smart Key System', 'All LED Lighting', 'USB Charging Port', 'Digital Instrument Panel'],
    available: true
  }
];