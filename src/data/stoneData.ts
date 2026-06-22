export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  detailedDescription: string;
  images: string[];
  origin: string;
  finishes: string[];
  applications: string[];
  thickness: string[];
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  images: string[];
  stoneUsed: string[];
  year: string;
}

export interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'alabaster-white-granite',
    name: 'Alabaster White Granite',
    category: 'Granite',
    description: 'An ultra-premium white granite featuring soft alabaster tones with delicate ivory and charcoal veining.',
    detailedDescription: 'Alabaster White Granite is one of the most sought-after natural stones globally, prized for its luminous background and sophisticated structural details. Quarried under strict quality controls, this granite provides the elegance of marble with the legendary durability and scratch-resistance of premium granite. Perfect for heavy-use applications such as high-traffic kitchen countertops, outdoor facades, and luxurious bath environments. Its neutral color profile coordinates effortlessly with dark timber, brass accents, and minimalist modern cabinetry.',
    images: [
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80'
    ],
    origin: 'India (Rajasthan High-Grade Quarries)',
    finishes: ['Polished', 'Honed', 'Leathered', 'Lapatura'],
    applications: ['Kitchen Countertops', 'Vanity Tops', 'Exterior Cladding', 'Flooring'],
    thickness: ['20mm', '30mm'],
    features: ['Exceptional Scratch Resistance', 'Low Water Absorption (<0.2%)', 'High Compressive Strength', 'Easy Maintenance']
  },
  {
    id: 'taj-mahal-quartzite',
    name: 'Taj Mahal Quartzite',
    category: 'Quartzite',
    description: 'A breathtakingly elegant Brazilian quartzite featuring a warm, soft cream background with subtle gold and bronze veins.',
    detailedDescription: 'Taj Mahal Quartzite is the epitome of modern luxury. Renowned for its marble-like appearance and granite-like strength, it features soft creamy hues with delicate, sweeping veins of gold, amber, and grey. Quartzite is a naturally occurring metamorphic rock that is harder than granite, making Taj Mahal incredibly resistant to etching, scratching, and heat. This makes it a premier choice for high-end residential projects in the USA, Europe, and the UAE, especially for dramatic waterfall kitchen islands and statement fireplace surrounds.',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'
    ],
    origin: 'Brazil (Ceará Region)',
    finishes: ['Polished', 'Honed', 'Brusheded'],
    applications: ['Kitchen Islands', 'Waterfall Backsplashes', 'Flooring', 'Feature Walls'],
    thickness: ['20mm', '30mm'],
    features: ['Acid and Stain Resistant', 'Harder than Granite (Mohs 7)', 'Translucent Properties under Backlighting', 'Extremely Low Porosity']
  },
  {
    id: 'calacatta-gold-marble',
    name: 'Calacatta Gold Marble',
    category: 'Marble',
    description: 'An iconic Italian marble with a crisp white field and bold, dramatic veins of gold, bronze, and dark grey.',
    detailedDescription: 'Calacatta Gold Marble is a legendary stone extracted from the Apuan Mountains in Carrara, Italy. Distinguished by its bold, dramatic grey and gold veining that traverses a pure white background, this marble is synonymous with royalty and prestige. Its prestigious status makes it the primary selection for luxury hotels, high-end commercial entries, and bespoke residential master baths. Due to its natural composition, each block is a unique masterpiece, lending a high-end signature look to any surface.',
    images: [
      'https://images.unsplash.com/photo-160058515526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
    ],
    origin: 'Italy (Carrara)',
    finishes: ['High-Gloss Polished', 'Velvet Honed'],
    applications: ['Master Bathrooms', 'Bespoke Furniture', 'Feature Walls', 'Staircases'],
    thickness: ['20mm'],
    features: ['Distinctive Bookmatching Potential', 'Timeless Classic Appeal', 'Increases Property Appraisal Value', 'Natural Luminous Polish']
  },
  {
    id: 'black-cosmic-granite',
    name: 'Black Cosmic Granite',
    category: 'Granite',
    description: 'A deep black granite adorned with sweeping waves of gold, silver, and copper-colored crystals.',
    detailedDescription: 'Black Cosmic Granite is a visual spectacle, resembling the swirling galaxies of the night sky. The rich black background is shot through with intense, organic patterns of gold and white quartz crystals. This dramatic stone is highly durable, making it an excellent selection for luxury bar tops, retail counters, and heavy-use kitchen prep zones. Its polished finish highlights the depth and shimmer of the quartz crystals, creating a focal point of unmatched power.',
    images: [
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80'
    ],
    origin: 'Brazil',
    finishes: ['Polished', 'Leathered'],
    applications: ['Kitchen Countertops', 'Bar Counters', 'Reception Desks', 'Accents'],
    thickness: ['20mm', '30mm'],
    features: ['Highly Stain Resistant', 'Scratch Resistant', 'Heat Tolerant', 'Striking Visual Statement']
  },
  {
    id: 'super-white-quartzite',
    name: 'Super White Quartzite',
    category: 'Quartzite',
    description: 'A striking light grey and white stone featuring intense, intersecting charcoal veins, offering the look of marble with the performance of quartzite.',
    detailedDescription: 'Super White Quartzite (often referred to as Super White Dolomite) is a modern designer favorite. It features a cool greyish-white backdrop with deep, web-like patterns of dark grey. It bridges the aesthetic gap between Carrara Marble and hard granite, offering an incredibly dense structure that resists wear and tear. It has gained widespread popularity in North America and Western Europe as a durable alternative for high-end kitchen counter installations.',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    origin: 'Brazil',
    finishes: ['Polished', 'Honed'],
    applications: ['Kitchen Counters', 'Bathroom Vanities', 'Wall Cladding', 'Floors'],
    thickness: ['20mm', '30mm'],
    features: ['High Density', 'Scratch Resistant', 'Sophisticated Cool Tone', 'Extremely Durable']
  },
  {
    id: 'nero-marquina-marble',
    name: 'Nero Marquina Marble',
    category: 'Marble',
    description: 'A deep, velvet-black Spanish marble crossed by crisp, high-contrast white calcite veins.',
    detailedDescription: 'Nero Marquina Marble is a classic selection from the Basque Country in Northern Spain. Known for its intense, dark black background and striking, crystalline white veins, it creates an elegant, moody aesthetic. Ideal for high-design bathrooms, retail boutiques, and fireplace surrounds, Nero Marquina adds immediate depth and luxury to contemporary and neoclassical designs alike.',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    origin: 'Spain (Markina)',
    finishes: ['Polished', 'Honed', 'Brushed'],
    applications: ['Flooring', 'Wall Panels', 'Fireplace Surrounds', 'Bathroom Elements'],
    thickness: ['20mm'],
    features: ['Deep Inky Blackness', 'Dramatic Contrast', 'Timeless European Aesthetic', 'Excellent Polishability']
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'dubai-luxury-villa',
    title: 'The Palm Jumeirah Penthouse',
    category: 'Residential',
    location: 'Dubai, UAE',
    description: 'A luxurious private residence featuring custom Taj Mahal Quartzite waterfall islands, bookmatched Calacatta Gold bathrooms, and massive outdoor granite pool decking, built to withstand extreme high temperatures.',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    stoneUsed: ['Taj Mahal Quartzite', 'Calacatta Gold Marble'],
    year: '2025'
  },
  {
    id: 'manhattan-modern-office',
    title: 'Fifth Avenue Corporate Plaza',
    category: 'Commercial',
    location: 'New York, USA',
    description: 'An upscale corporate lobby utilizing over 2,000 square meters of Super White Quartzite wall panels and Black Cosmic Granite reception desks, creating a commanding corporate image.',
    images: [
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80'
    ],
    stoneUsed: ['Super White Quartzite', 'Black Cosmic Granite'],
    year: '2024'
  },
  {
    id: 'sydney-harbor-residence',
    title: 'Sydney Harbor Waterside Estate',
    category: 'Residential',
    location: 'Sydney, Australia',
    description: 'A striking architectural marvel overlooking Sydney Harbor, emphasizing seamless transition from indoor to outdoor living with massive slabs of Alabaster White Granite and Nero Marquina accents.',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
    ],
    stoneUsed: ['Alabaster White Granite', 'Nero Marquina Marble'],
    year: '2025'
  }
];

export const INITIAL_BLOGS: Blog[] = [
  {
    id: 'quartzite-vs-marble-performance',
    title: 'Quartzite vs. Marble: A Guide for Luxury Countertops',
    summary: 'Discover the geological and functional differences between Quartzite and Marble to choose the perfect stone for your high-end design.',
    content: `When designing high-end spaces, the choice of countertop material is critical. Homeowners and architects are frequently torn between the unmatched elegance of Marble and the rugged performance of Quartzite.\n\n### What is Marble?\nMarble is a metamorphic rock formed from limestone. It is famous for its soft veins and classic white background, as seen in legendary materials like Calacatta Gold and Carrara. However, marble is chemically calcium carbonate, which means it reacts with acidic foods like lemon juice, vinegar, or wine. This reaction causes "etching" – dull spots on the polished surface.\n\n### What is Quartzite?\nQuartzite is a metamorphic rock that starts its life as sandstone. Under immense heat and pressure, the quartz grains fuse together. The result is a rock that is incredibly hard – harder than granite, registering a 7 on the Mohs hardness scale. Quartzite does not etch when exposed to acids, making it highly forgiving in active family kitchens.\n\n### The Final Verdict\nIf you want a timeless classic and are willing to embrace the "patina" of aged marble, Calacatta Gold is unmatched. However, if you want the marble aesthetic with maximum stain, scratch, and acid resistance, materials like Taj Mahal Quartzite or Super White Quartzite are the modern luxury standard.`,
    date: 'June 15, 2026',
    author: 'PJ Stone Team',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    tags: ['Stone Selection', 'Interior Design', 'Kitchens']
  },
  {
    id: 'maintaining-premium-granite',
    title: 'How to Keep Premium Granite Looking Flawless for Decades',
    summary: 'Simple maintenance procedures, sealing frequencies, and pH-neutral cleaning guidelines to preserve your premium granite surfaces.',
    content: `Granite is celebrated for its incredible hardness, low porosity, and resistance to heat and scratches. However, even the most durable materials like Alabaster White Granite and Black Cosmic Granite require correct maintenance to preserve their deep shine and stain resistance over decades of use.\n\n### 1. Sealing is Essential\nMost granite counters should be sealed once every 1 to 2 years. White granites, having slightly more open pores than dense dark granites, benefit from annual sealing. You can perform a simple "water drop test" – place a few drops of water on the stone; if the water absorbs and darkens the stone within 5 minutes, it is time to reapply a premium penetrating sealer.\n\n### 2. Avoid Harsh Household Cleaners\nNever use cleaners containing acids, bleach, ammonia, or citrus oils on your stone. Standard window cleaners, vinegar, and scrubbing cleansers will break down the sealer and can dull the finish over time. Instead, use a pH-neutral stone spray or simple warm water with mild dish soap.\n\n### 3. Wipe Spills Immediately\nWhile granite is highly stain-resistant, highly pigmented liquids (like turmeric, red wine, or beet juice) can slowly penetrate if left overnight. Wipe up spills immediately with a soft microfiber cloth to keep the surface pristine.`,
    date: 'May 28, 2026',
    author: 'PJ Stone Team',
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=600&q=80',
    tags: ['Care & Maintenance', 'Granite', 'Pro-Tips']
  }
];

export const CONTACT_INFO = {
  email: 'pj7coding@gmail.com',
  phone: '+91 98765 43210', // Placeholders
  whatsapp: '+919876543210', // Whatsapp number in international format without + or spaces
  address: '102 Stone Avenue, Industrial Zone, Jaipur, RJ 302001, India',
  targetMarkets: ['USA', 'Europe', 'UAE', 'Australia', 'Southeast Asia']
};
