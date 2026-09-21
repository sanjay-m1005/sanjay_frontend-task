/**
 * TALARA - The Palmyra Company
 * Borassus flabellifer Multi-Product Ecosystem Data Store
 * All nutritional, material, and safety data strictly follows scientific guidelines.
 */

const PALM_ANATOMY = [
  {
    id: "inflorescence",
    partName: "Inflorescence Spadix & Sap",
    botanicalTerm: "Inflorescentia Borassi",
    harvestSeason: "February – July (Peak Sap Flow)",
    role: "The living vascular sap tapped non-destructively twice daily from flowering stalks.",
    modernValue: "Liquid raw jaggery, granulated golden sugar, isotonic botanical elixirs, fermented reserve spirits.",
    utilizationRate: "High biological yield; 100–150 liters sap per mature tree annually without harm to tree life.",
    relatedProductIds: ["nectar-reserve", "sugar-crystal", "botanical-elixir", "solid-jaggery", "toddy-reserve"],
    icon: "flower"
  },
  {
    id: "fruit",
    partName: "Tender Fruit Endosperm (Nungu)",
    botanicalTerm: "Endospermium Borassi",
    harvestSeason: "May – August (Peak Summer)",
    role: "Translucent, gelatinous, high-moisture seed sockets protected by a fibrous drupe husk.",
    modernValue: "Hydrating tropical fruit preserves, natural culinary desserts, cold-pressed electrolyte extracts.",
    utilizationRate: "Harvested at peak tenderness; empty drupe husks redirected into high-lignin bio-composites.",
    relatedProductIds: ["nungu-hydration-cubes"],
    icon: "droplet"
  },
  {
    id: "frond",
    partName: "Fan Fronds & Petioles",
    botanicalTerm: "Folium & Petiolus",
    harvestSeason: "Year-Round (Cyclical Seasonal Shedding & Pruning)",
    role: "Aerodynamic, rigid 2-meter leaves with tough fibrous stems engineered by nature to withstand tropical cyclones.",
    modernValue: "Thermo-pressed compostable dining ware, micro-woven luxury carryalls, tree-free molded paper packaging.",
    utilizationRate: "12–15 fallen or sustainably pruned fronds per tree annually; 100% biodegradable within 45 days.",
    relatedProductIds: ["frond-tableware", "palm-silk-tote", "zero-tree-pulp"],
    icon: "layers"
  },
  {
    id: "fiber",
    partName: "Basal Leaf Sheath Fibers",
    botanicalTerm: "Fibra Vaginae Foliorum",
    harvestSeason: "Annual Maintenance Pruning",
    role: "Tough, wire-like structural fiber bundles securing the leaf base to the trunk.",
    modernValue: "Heavy-duty industrial and household natural bristle brushes, geotextile erosion control nets.",
    utilizationRate: "Zero synthetic microplastics; high tensile strength and natural oil/water resistance.",
    relatedProductIds: ["coira-brushes"],
    icon: "scissors"
  },
  {
    id: "tuber",
    partName: "Germinated Seed Tuber (Odiyal)",
    botanicalTerm: "Borassus Haustorium / Tuber",
    harvestSeason: "Post-Monsoon (November – January)",
    role: "Subterranean starch reservoir developed from planted Palmyra seeds during early germination.",
    modernValue: "Gluten-free resistant starch prebiotic flour, low-glycemic dietary baking thickener.",
    utilizationRate: "High dietary fiber yield; supports soil microbiome through regenerative field sowing.",
    relatedProductIds: ["tal-root-flour"],
    icon: "sprout"
  },
  {
    id: "trunk",
    partName: "Mature Natural-Fall Hardwood",
    botanicalTerm: "Lignum Borassi",
    harvestSeason: "End-of-Life Natural Windfalls Only (No Felling)",
    role: "Dense fibrous heartwood renowned for extreme termite resistance and dramatic dark striated grain.",
    modernValue: "Turned heirloom tableware, luxury presentation caskets, architectural interior accents.",
    utilizationRate: "Strict non-felling policy; harvested exclusively from trees that have naturally concluded their 80–100 year lifespan.",
    relatedProductIds: ["emperor-gift-box"],
    icon: "box"
  }
];

const PRODUCTS_DATA = [
  {
    id: "nectar-reserve",
    name: "TALARA Nectar Reserve",
    subtitle: "Single-Origin Liquid Palm Jaggery",
    category: "sweeteners",
    categoryLabel: "Natural Sweeteners",
    palmPart: "Fresh Inflorescence Sap (Neera)",
    palmPartId: "inflorescence",
    price: 24.00,
    currency: "$",
    rating: 4.95,
    reviewsCount: 128,
    badge: "Signature Reserve",
    isFeatured: true,
    isNew: false,
    image: "images/product-nectar.jpg",
    gallery: [
      "images/product-nectar.jpg",
      "images/hero-palmyra.jpg"
    ],
    shortDesc: "Unbleached, low-heat concentrated floral nectar with subtle notes of salted caramel, toasted macadamia, and woodsmoke.",
    fullDescription: "TALARA Nectar Reserve is our flagship botanical sweetener. Unlike commercial sugars subjected to sulfur bleaching and bone-char refinement, our nectar is collected at dawn from wild female Palmyra inflorescences using stainless steel vacuum-insulated chill vessels that arrest natural fermentation without the need for slaked lime. The raw sap is slowly concentrated under gentle low-temperature vacuum evaporators at 68°C to retain naturally occurring potassium, magnesium, and polyphenols.",
    productionStory: "Tapped at 30 meters above the grove floor by master tappers equipped with modern safety harnesses. Chilled to 4°C within 15 minutes of collection. Screened through micro-filtration down to 5 microns, then gently condensed to 76° Brix. Packaged hot into pharmaceutical-grade UV-filtering amber glass to ensure shelf stability without chemical preservatives.",
    ingredients: [
      "100% Pure Non-Fermented Palmyra Palm Sap (Borassus flabellifer)"
    ],
    nutrition: {
      servingSize: "1 tbsp (15 ml)",
      servingsPerContainer: "16",
      calories: "50 kcal",
      carbs: "13 g",
      sugars: "12 g (Naturally occurring fructose, glucose, and sucrose)",
      protein: "0.2 g",
      fat: "0 g",
      sodium: "8 mg",
      potassium: "140 mg (3% DV)",
      iron: "0.8 mg (4% DV)",
      magnesium: "12 mg (3% DV)"
    },
    glycemicContext: "Measured Glycemic Index (GI) of ~38–42, significantly lower than commercial cane sucrose (GI ~65). While it produces a more gradual metabolic response, it remains a caloric sweetener and must be used mindfully.",
    allergens: "Free from gluten, dairy, soy, nuts, and sulfur dioxide. Produced in a dedicated palm-processing facility.",
    safetyDisclaimers: "Notice: This product is an unrefined natural food sweetener. It is not intended to treat, cure, or manage diabetes or any metabolic illness. Persons with diabetes must consult their endocrinologist or dietitian before incorporating any concentrated carbohydrate source into their meal plan.",
    ageRestricted: false,
    usage: "Drizzle over overnight steel-cut oats, artisanal goat cheese, Belgian waffles, or whisk into single-origin espresso and craft cocktails.",
    storage: "Store in a cool, dark pantry. Refrigerate after breaking vacuum seal. Use within 12 months.",
    sustainability: "100% non-destructive harvesting. The palm continues photosynthesizing and growing for 80+ years.",
    packagingConcept: "Bespoke 250ml square amber apothecary flask crafted from 40% post-consumer recycled glass with a solid palmyra hardwood screw cap and recyclable tamper seal.",
    howItReachesYou: "Grove in Thoothukudi / Tirunelveli Coastal Belt → Insulated Cold-Chain Logistics → ISO 22000 Certified Clean Lab → Direct to Your Pantry.",
    variants: [
      { name: "250ml Amber Flask", price: 24.00, sku: "TLR-NEC-250" },
      { name: "500ml Kitchen Decanter", price: 42.00, sku: "TLR-NEC-500" },
      { name: "Trio Reserve Pack (3 x 250ml)", price: 65.00, sku: "TLR-NEC-TR3" }
    ],
    inStock: true
  },
  {
    id: "sugar-crystal",
    name: "AURA Palm Sugar Crystals",
    subtitle: "Raw Artisanal Granulated Palm Sugar",
    category: "sweeteners",
    categoryLabel: "Natural Sweeteners",
    palmPart: "Concentrated Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 18.00,
    currency: "$",
    rating: 4.90,
    reviewsCount: 94,
    badge: "1:1 Cane Sugar Alternative",
    isFeatured: true,
    isNew: false,
    image: "images/product-nectar.jpg",
    gallery: [
      "images/product-nectar.jpg"
    ],
    shortDesc: "Golden, unrefined granulated sugar with a buttery molasses aroma, milled for seamless 1:1 replacement in baking and specialty coffee.",
    fullDescription: "AURA Palm Sugar Crystals deliver the complex flavor profile of brown sugar with the crisp, dry dissolution of fine turbinado. Sourced from slow-reduced Palmyra nectar, the crystallizing syrup is agitated in traditional stainless crystallization vats until micro-crystals spontaneously form. No additives, no bone char, and no synthetic flow agents.",
    productionStory: "Filtered fresh sap is evaporated to 85° Brix in multi-stage stainless kettles. At critical saturation, the mass is continuously aerated using mechanized paddle shears to induce uniform granule formation. The crystals are warm-air dried at 45°C to under 1.5% moisture, sieved, and nitrogen-sealed.",
    ingredients: [
      "100% Pure Crystallized Palmyra Palm Sap"
    ],
    nutrition: {
      servingSize: "1 tsp (4 g)",
      servingsPerContainer: "75",
      calories: "15 kcal",
      carbs: "3.8 g",
      sugars: "3.7 g",
      protein: "0 g",
      fat: "0 g",
      sodium: "2 mg",
      potassium: "35 mg"
    },
    glycemicContext: "Retains trace minerals and complex oligosaccharides. Moderately lower glycemic impact than standard table sugar, yet contributes caloric carbohydrates.",
    allergens: "None. Naturally vegan and gluten-free.",
    safetyDisclaimers: "Not a low-calorie food. Does not prevent or reverse diabetes. Consume as part of an overall balanced lifestyle.",
    ageRestricted: false,
    usage: "Direct 1:1 culinary substitute for white or brown sugar in cookies, tarts, specialty coffee brewing, and savory glazes.",
    storage: "Keep in an airtight jar in a cool, dry area. Moisture sensitive; do not insert wet utensils.",
    sustainability: "Produced in solar-hybrid drying tunnels, reducing thermal fuel consumption by 65% compared to open-wood vats.",
    packagingConcept: "Airtight, resealable compostable stand-up pouch made of FSC-certified kraft paper lined with plant-based biopolymer barrier.",
    howItReachesYou: "Hand-harvested sap → Solar crystallizer facility → Laser color-sorting → Nitrogen-flushed packaging → Delivered fresh.",
    variants: [
      { name: "300g Kraft Pouch", price: 18.00, sku: "TLR-SUG-300" },
      { name: "750g Chef's Reserve", price: 36.00, sku: "TLR-SUG-750" }
    ],
    inStock: true
  },
  {
    id: "botanical-elixir",
    name: "VITAL-TALA Sparkling Botanical Elixir",
    subtitle: "Chilled Sparkling Palm Sap Beverage",
    category: "beverages",
    categoryLabel: "Functional Beverages",
    palmPart: "Cold-Extracted Fresh Neera Sap",
    palmPartId: "inflorescence",
    price: 28.00,
    currency: "$",
    rating: 4.88,
    reviewsCount: 76,
    badge: "Non-Alcoholic (<0.5% ABV)",
    isFeatured: true,
    isNew: true,
    image: "images/product-elixir.jpg",
    gallery: [
      "images/product-elixir.jpg"
    ],
    shortDesc: "Naturally isotonic sparkling botanical drink infused with cold-pressed green lime, cardamom, and mountain mint.",
    fullDescription: "VITAL-TALA captures the elusive, delicate floral nectar of the living Palmyra palm within hours of the tapper's climb. Naturally rich in electrolytes like potassium and magnesium, we marry the crisp sweetness of virgin sap with organic lime peel extract and wild botanicals, finished with champagne-style fine carbonation.",
    productionStory: "Harvested at 5:00 AM under cryogenic cold-chain protection to prevent natural fermentation. Subjected to pulsed-electric-field (PEF) non-thermal pasteurization which preserves delicate floral aromatics while neutralizing spoilage yeasts. Carbonated at 3.2 volumes and cold-bottled.",
    ingredients: [
      "Pure Palmyra Palm Sap (88%)",
      "Carbonated Pure Spring Water",
      "Cold-Pressed Key Lime Extract",
      "Organic Green Cardamom Distillate",
      "Wild Himalayan Mint Leaf Extract"
    ],
    nutrition: {
      servingSize: "1 Bottle (330 ml)",
      servingsPerContainer: "1",
      calories: "68 kcal",
      carbs: "16 g",
      sugars: "15 g (Naturally occurring from palm sap)",
      protein: "0.4 g",
      fat: "0 g",
      sodium: "18 mg",
      potassium: "280 mg (6% DV)",
      vitaminC: "14 mg (15% DV)"
    },
    glycemicContext: "Refreshing isotonic osmolarity. Provides natural carbohydrates for rapid post-activity cellular rehydration without artificial chemical electrolyte salts.",
    allergens: "None.",
    safetyDisclaimers: "Contains less than 0.5% ABV from microscopic natural fermentation traces prior to PEF stabilization. Not marketed as medicine or as an energy cure. Consult your physician if pregnant or nursing regarding herbal botanical extracts.",
    ageRestricted: false,
    usage: "Serve chilled between 4°C–6°C. Excellent as an afternoon revitalizer or paired with spicy modern gastronomy.",
    storage: "Keep refrigerated. Enjoy immediately upon opening.",
    sustainability: "Zero synthetic syrups. Carbon-neutral distribution through regional refrigerated hubs.",
    packagingConcept: "Heavyweight recycled glass bottle with screen-printed organic ceramic inks and a recyclable crown cap.",
    howItReachesYou: "Harvested at dawn → Cryo-blended in 4 hours → Ultra-filtered & carbonated → Express refrigerated delivery.",
    variants: [
      { name: "4-Pack (4 x 330ml Bottles)", price: 28.00, sku: "TLR-ELX-4PK" },
      { name: "12-Pack Case (12 x 330ml)", price: 72.00, sku: "TLR-ELX-12PK" }
    ],
    inStock: true
  },
  {
    id: "toddy-reserve",
    name: "HERITAGE TODDY Reserve 1840",
    subtitle: "Aged Wild-Fermented Palm Wine (5.4% ABV)",
    category: "beverages",
    categoryLabel: "Functional Beverages",
    palmPart: "Naturally Fermented Live Sap",
    palmPartId: "inflorescence",
    price: 38.00,
    currency: "$",
    rating: 4.92,
    reviewsCount: 53,
    badge: "Age 21+ Required",
    isFeatured: false,
    isNew: false,
    image: "images/product-elixir.jpg",
    gallery: [
      "images/product-elixir.jpg"
    ],
    shortDesc: "Naturally wild-fermented living palm wine aged for 60 days in toasted Palmyra heartwood casks. Silky, sour-sweet, and effervescent.",
    fullDescription: "A tribute to ancient maritime South Asian fermentation traditions. When Palmyra sap is harvested into non-sterilized clay pots, natural airborne yeasts and lactobacilli trigger a spontaneous wild fermentation within hours. We elevate this rustic village drink into a refined culinary reserve by transferring live-fermented sap into lightly charred Borassus wood barrels, yielding complex notes of green apple, yeast lees, toasted coconut, and citrus zest.",
    productionStory: "Wild fermentation takes place over 18 hours at ambient coastal temperatures until alcohol naturally balances at 5.2%–5.5% ABV. The young wine is transferred to palmyra wood casks for 60 days of slow maturation, followed by gentle sedimentation and bottle conditioning for natural sparkle.",
    ingredients: [
      "Naturally Wild-Fermented Palmyra Palm Sap",
      "Native Saccharomyces & Brettanomyces Yeasts (Wild Cultures)"
    ],
    nutrition: {
      servingSize: "1 Glass (150 ml)",
      alcoholByVolume: "5.4% ABV",
      calories: "85 kcal",
      carbs: "6 g",
      sugars: "4 g",
      protein: "0.3 g"
    },
    glycemicContext: "Carbohydrates are substantially metabolized into alcohol and organic acids (acetic, lactic, succinic acids) during wild fermentation.",
    allergens: "Contains natural sulfites produced during wild fermentation.",
    safetyDisclaimers: "GOVERNMENT & STATUTORY WARNING: (1) Alcohol consumption is strictly restricted to individuals of legal drinking age (21+ in USA / 18+ in applicable regions). (2) According to the Surgeon General, women should not drink alcoholic beverages during pregnancy because of the risk of birth defects. (3) Consumption of alcoholic beverages impairs your ability to drive a car or operate machinery, and may cause health problems. Drink responsibly.",
    ageRestricted: true,
    ageRestrictionText: "Legal Age Verification Required (21+ / 18+). You must verify your age before adding this item to your cart.",
    usage: "Serve chilled in tulip glassware at 8°C–10°C. Complements aged hard cheeses, cured ocean fish, and tamarind-glazed braises.",
    storage: "Store upright in a wine cellar or dark chiller at 10°C–14°C.",
    sustainability: "Produced exclusively from seasonal sap surpluses, preventing tapper economic waste during monsoon blooms.",
    packagingConcept: "Dark smoke-gray European glass wine bottle sealed with natural cork and wax dipped seal.",
    howItReachesYou: "Grove fermentation → Cask aging cellar → Micro-filtration & corking → Verified adult signature delivery.",
    variants: [
      { name: "750ml Cask Bottle", price: 38.00, sku: "TLR-TDY-750" },
      { name: "Collector's Wooden Crate (2 x 750ml)", price: 80.00, sku: "TLR-TDY-CRT" }
    ],
    inStock: true
  },
  {
    id: "solid-jaggery",
    name: "BORASSUS Solid Jaggery Blocks",
    subtitle: "Stone-Ground Unrefined Palm Sugar Cake",
    category: "sweeteners",
    categoryLabel: "Natural Sweeteners",
    palmPart: "Concentrated Inflorescence Sap",
    palmPartId: "inflorescence",
    price: 16.00,
    currency: "$",
    rating: 4.87,
    reviewsCount: 82,
    badge: "Traditional Artisan Craft",
    isFeatured: false,
    isNew: false,
    image: "images/product-nectar.jpg",
    gallery: [
      "images/product-nectar.jpg"
    ],
    shortDesc: "Dense, aromatic dark jaggery cakes cast in conical palmyra leaf molds, infused with wild ginger and black pepper.",
    fullDescription: "Known in Tamil as 'Karupatti', this is the oldest form of condensed palm sweetener recorded in Indian civilization. We preserve this ancient heritage by boiling fresh palm sap in hygienic food-grade stainless vats over low embers, infusing crushed dried ginger and Tellicherry black pepper to balance the richness, and casting the warm molten candy into conical woven leaf cups.",
    productionStory: "Boiled down slowly over 4 hours until reaching hard-ball candy stage (118°C). Poured by hand into leaf cups fabricated from dried Palmyra fronds. Allowed to cure and set naturally over 12 hours without chemical hardeners, hydrosulfite, or coloring agents.",
    ingredients: [
      "Pure Palmyra Palm Sap",
      "Sun-Dried Sunthi Ginger (<1%)",
      "Crushed Tellicherry Black Pepper (<0.5%)"
    ],
    nutrition: {
      servingSize: "20 g piece",
      servingsPerContainer: "20",
      calories: "72 kcal",
      carbs: "18 g",
      sugars: "17 g",
      iron: "1.6 mg (9% DV)",
      potassium: "190 mg (4% DV)"
    },
    glycemicContext: "Rich in mineral ash and natural molasses. While cherished in traditional Siddha/Ayurvedic customs, it remains a calorie-dense sweetener.",
    allergens: "None.",
    safetyDisclaimers: "Not a clinical cure for anemia or respiratory infections. Traditional folklore associates palm jaggery with respiratory warmth, but these historical uses should not replace modern medical guidance.",
    ageRestricted: false,
    usage: "Shave or grate over hot herbal chai, South Indian filter coffee, whole-grain porridge, or use in traditional confectionery.",
    storage: "Store in a dry ceramic container away from direct humidity.",
    sustainability: "Zero plastic packaging; leaf cups are 100% compostable yard waste.",
    packagingConcept: "Two 200g conical blocks cradled in a woven palm-leaf basket tied with organic raw palm-fiber twine.",
    howItReachesYou: "Tapped grove → Copper-free kettle boil → Hand poured in leaf molds → Air cured → Shipped in compostable box.",
    variants: [
      { name: "400g Hand-Cured Box (2 Cakes)", price: 16.00, sku: "TLR-JAG-400" },
      { name: "1kg Family Pantry Pack", price: 32.00, sku: "TLR-JAG-1KG" }
    ],
    inStock: true
  },
  {
    id: "tal-root-flour",
    name: "TAL-ROOT Prebiotic Fiber Flour",
    subtitle: "Stone-Ground Germinated Tuber Flour",
    category: "foods",
    categoryLabel: "Gourmet Foods",
    palmPart: "Germinated Seed Tuber (Odiyal)",
    palmPartId: "tuber",
    price: 22.00,
    currency: "$",
    rating: 4.82,
    reviewsCount: 41,
    badge: "Resistant Starch Prebiotic",
    isFeatured: true,
    isNew: true,
    image: "images/product-tuber.jpg",
    gallery: [
      "images/product-tuber.jpg"
    ],
    shortDesc: "Grain-free, low-glycemic functional flour made from sun-dried germinated Palmyra tubers, naturally rich in resistant starch type-2.",
    fullDescription: "A forgotten botanical super-grain. In ancient coastal agroforestry, Palmyra seeds planted in sandy trenches germinate over 4 months to produce a dense, nutrient-dense subterranean tuber known as Odiyal. We harvest these tubers at peak starch maturation, steam-blanch them to deactivate bitter enzymes, and stone-mill them into an ultra-fine gluten-free culinary flour.",
    productionStory: "Planted seeds are nurtured in sandy nursery beds for 120 days. Tubers are hand-unearthed, thoroughly pressure-washed with spring water, sliced, steam-sterilized, sun-dried in clean glass tunnels, and cold stone-milled under 35°C to protect resistant starch structures.",
    ingredients: [
      "100% Germinated Palmyra Palm Tubers (Odiyal - Borassus haustorium)"
    ],
    nutrition: {
      servingSize: "30 g (approx. 1/4 cup)",
      servingsPerContainer: "15",
      calories: "105 kcal",
      carbs: "23 g",
      dietaryFiber: "6 g (21% DV)",
      resistantStarch: "4.2 g",
      sugars: "1 g",
      protein: "2.1 g",
      fat: "0.2 g",
      calcium: "38 mg",
      iron: "1.2 mg"
    },
    glycemicContext: "Extremely low glycemic response compared to wheat or white rice flour due to high resistant starch content, which passes unabsorbed into the colon to nourish beneficial gut microbiota.",
    allergens: "Gluten-Free. Processed in an allergen-controlled facility.",
    safetyDisclaimers: "Contains high resistant starch. When introducing high-fiber functional flours, begin with small servings to allow your digestive flora to adapt. Consult your gastroenterologist if you have severe IBS or bowel conditions.",
    ageRestricted: false,
    usage: "Blend 20%–30% with almond or cassava flour for gut-healthy sourdoughs, pancakes, flatbreads, or whisk into warm savory morning broths.",
    storage: "Seal tightly and keep in a cool, dry pantry or refrigerator after opening.",
    sustainability: "Cultivated in arid coastal sands requiring zero irrigation, pesticides, or synthetic fertilizers.",
    packagingConcept: "Multi-ply biodegradable pouch made from 100% post-consumer unbleached recycled fiber.",
    howItReachesYou: "Regenerative sandy trenches → 120-day harvest → Cold stone milling → Particle-size sieved → Direct delivery.",
    variants: [
      { name: "450g Kraft Stand-up Pouch", price: 22.00, sku: "TLR-ODL-450" },
      { name: "1kg Bulk Baker's Bag", price: 42.00, sku: "TLR-ODL-1KG" }
    ],
    inStock: true
  },
  {
    id: "nungu-hydration-cubes",
    name: "NUNGU Ice-Fruit Hydration Cubes",
    subtitle: "Preserved Tender Palm Fruit Kernels",
    category: "foods",
    categoryLabel: "Gourmet Foods",
    palmPart: "Tender Fruit Endosperm (Nungu)",
    palmPartId: "fruit",
    price: 19.50,
    currency: "$",
    rating: 4.89,
    reviewsCount: 65,
    badge: "92% Natural Moisture",
    isFeatured: false,
    isNew: false,
    image: "images/product-nungu.jpg",
    gallery: [
      "images/product-nungu.jpg"
    ],
    shortDesc: "Translucent, tender gelatinous palm fruit endosperms lightly suspended in cold-extracted palm blossom syrup with a hint of rose water.",
    fullDescription: "Nungu (often referred to as 'Ice Apple') is the crown jewel of tropical summer hydration. Each tough woody fruit protects three translucent, jelly-like chambers bursting with nutrient-rich cellular water. We delicately slice open the husks by hand and preserve the whole tender kernels in a light, clarified palm-blossom syrup with organic damask rose water.",
    productionStory: "Harvested only during the brief 6-week window when the inner fruit kernel remains tender and gelatinous before hardening into seed. Peeled under sterile conditions, immediately transferred into glass jars, topped with delicate floral syrup, and batch-retorted at low temperature.",
    ingredients: [
      "Tender Palmyra Palm Fruit Endosperm (Borassus flabellifer)",
      "Clarified Palmyra Blossom Nectar Syrup",
      "Organic Damask Rose Hydrosol",
      "Citric Acid (Non-GMO, for pH balance)"
    ],
    nutrition: {
      servingSize: "100 g",
      servingsPerContainer: "3.5",
      calories: "45 kcal",
      carbs: "10.5 g",
      sugars: "9 g",
      protein: "0.8 g",
      fat: "0.1 g",
      potassium: "160 mg",
      vitaminA: "45 mcg"
    },
    glycemicContext: "Low calorie density and high cellular hydration. A cooling summer delicacy with mild sweetness.",
    allergens: "None.",
    safetyDisclaimers: "Not formulated as an infant formula. Ensure small children chew the gelatinous fruit cubes thoroughly to avoid potential choking hazards.",
    ageRestricted: false,
    usage: "Serve chilled over crushed ice, fold into chia seed puddings, spoon over matcha parfaits, or enjoy directly from the jar.",
    storage: "Refrigerate after opening and consume within 7 days.",
    sustainability: "Hand-picked from mature palms; outer husks are recycled into mulch and bio-composites.",
    packagingConcept: "Wide-mouth flint glass jar with a hermetic gold lid and debossed paper neck collar.",
    howItReachesYou: "Morning grove harvest → Sterile hand peeling → Gentle floral bath → Nitrogen vacuum seal → Shipped to your doorstep.",
    variants: [
      { name: "350g Glass Preserve Jar", price: 19.50, sku: "TLR-NNG-350" },
      { name: "Duo Jar Gift Pack (2 x 350g)", price: 36.00, sku: "TLR-NNG-DUO" }
    ],
    inStock: true
  },
  {
    id: "frond-tableware",
    name: "FROND-FORM Sculpted Tableware",
    subtitle: "Thermo-Pressed Palm Frond Dining Set",
    category: "biomaterials",
    categoryLabel: "Bio-Homeware & Fiber",
    palmPart: "Fallen Frond Petioles & Leaf Sheaths",
    palmPartId: "frond",
    price: 34.00,
    currency: "$",
    rating: 4.96,
    reviewsCount: 112,
    badge: "100% Home-Compostable",
    isFeatured: true,
    isNew: false,
    image: "images/product-homeware.jpg",
    gallery: [
      "images/product-homeware.jpg"
    ],
    shortDesc: "Architectural 12-piece entertaining set thermo-molded from naturally shed Palmyra leaf fronds. Water-resistant, microwave-safe, zero plastic.",
    fullDescription: "Redefining single-use and reusable tableware through botanical geometry. Instead of felling trees or utilizing plastic polymer coatings, FROND-FORM transforms the fibrous, rigid petioles and leaf bases shed naturally by wild Palmyra palms. High-pressure steam molding at 145°C binds the natural lignin in the leaf, creating a smooth, hydrophobic dining surface with organic striations.",
    productionStory: "Shed fronds are collected from grove floors by local farmer cooperatives. Washed in recirculated rainwater, UV-sterilized, softened with clean steam, and pressed into precision aluminum dies. No glues, resins, or chemical binders are ever introduced.",
    ingredients: [
      "100% Naturally Shed Palmyra Palm Leaf Fronds (Borassus flabellifer)",
      "Zero Synthetic Adhesives, Resins, or Bleaches"
    ],
    nutrition: null,
    allergens: "None.",
    safetyDisclaimers: "Food-contact certified under US FDA 21 CFR and EU 1935/2004 standards for dry, liquid, hot, and cold foods. Microwave-safe up to 2 minutes at 800W. Oven-safe up to 120°C for reheating.",
    ageRestricted: false,
    usage: "Ideal for conscious modern weddings, catering, high-end outdoor picnics, or daily pantry use. Hand washable and reusable multiple times for dry foods.",
    storage: "Store in a dry cupboard away from direct standing moisture.",
    sustainability: "Completely decomposes in home garden compost in 45–60 days, enriching soil with organic carbon.",
    packagingConcept: "Banded with 100% recycled unbleached paper tape printed with soy-based non-toxic inks.",
    howItReachesYou: "Collected from forest floor → Triple-washed in rainwater → 145°C Steam press → Quality laser cut → Direct shipping.",
    variants: [
      { name: "12-Piece Dinner Set (4 Plates, 4 Bowls, 4 Trays)", price: 34.00, sku: "TLR-FRN-12P" },
      { name: "24-Piece Party Host Crate", price: 62.00, sku: "TLR-FRN-24P" }
    ],
    inStock: true
  },
  {
    id: "coira-brushes",
    name: "COIRA Architectural Bristle Brushes",
    subtitle: "Heavy-Duty Palm Fiber Cleaning Set",
    category: "biomaterials",
    categoryLabel: "Bio-Homeware & Fiber",
    palmPart: "Leaf Base Sheath Coarse Fibers",
    palmPartId: "fiber",
    price: 26.00,
    currency: "$",
    rating: 4.91,
    reviewsCount: 68,
    badge: "Zero Microplastics",
    isFeatured: false,
    isNew: false,
    image: "images/product-homeware.jpg",
    gallery: [
      "images/product-homeware.jpg"
    ],
    shortDesc: "Tough, spring-resilient household and kitchen brushes crafted from combed Palmyra leaf-base fibers set into fallen palmyra hardwood handles.",
    fullDescription: "Synthetic nylon brushes shed millions of microplastic particles into city water systems with every wash. The COIRA collection utilizes the formidable tensile strength of Palmyra leaf-sheath fibers—traditionally used for marine rigging and deep-well ropes. These natural plant bristles are naturally grease-repelling, acid-resistant, and retain their stiff spring for years.",
    productionStory: "Pruned leaf sheath bases undergo mechanical carding to separate fine from coarse fiber grades. Bristles are steam-straightened, conditioned with natural plant oils, and set into ergonomic handles sculpted from end-of-life fallen palmyra wood.",
    ingredients: [
      "100% Palmyra Palm Sheath Coarse Fiber (Borassus flabellifer)",
      "Handle: Naturally Fallen Palmyra Palm Hardwood",
      "Binding: Copper wire and natural plant resin"
    ],
    nutrition: null,
    allergens: "None.",
    safetyDisclaimers: "Clean with mild soap and warm water. Hang to air dry. Do not leave submerged in standing water for prolonged weeks.",
    ageRestricted: false,
    usage: "Stiff bristle brush cleans cast iron cookware, stoneware, and root vegetables without scratching. Medium brush for glassware and countertop care.",
    storage: "Hang by the organic cotton loop in an airy, ventilated space.",
    sustainability: "100% circular product. The fibers and wooden handle can be returned directly to the earth or compost bin at end of life.",
    packagingConcept: "Minimalist carton made of 100% recycled unbleached cardboard with zero plastic window films.",
    howItReachesYou: "Pruned fiber harvest → Combing & sorting → Hand-bristled into turned wood handles → Zero-plastic packaging.",
    variants: [
      { name: "2-Piece Trio Duo (Pot & Dish Brush)", price: 26.00, sku: "TLR-BRS-2P" },
      { name: "Master Cleanse Set (4 Brushes + Wall Hook)", price: 48.00, sku: "TLR-BRS-MST" }
    ],
    inStock: true
  },
  {
    id: "palm-silk-tote",
    name: "PALM-SILK Woven Carryall",
    subtitle: "Artisanal Micro-Woven Palm Leaf Bag",
    category: "biomaterials",
    categoryLabel: "Bio-Homeware & Fiber",
    palmPart: "Young Tender Frond Leaf Blades",
    palmPartId: "frond",
    price: 88.00,
    currency: "$",
    rating: 4.98,
    reviewsCount: 57,
    badge: "Artisan Cooperative Made",
    isFeatured: true,
    isNew: true,
    image: "images/product-homeware.jpg",
    gallery: [
      "images/product-homeware.jpg"
    ],
    shortDesc: "Feather-light, resilient tote bag micro-woven by master women artisans from hand-split, sun-bleached young Palmyra palm leaves.",
    fullDescription: "A fusion of ancestral craftsmanship and contemporary minimalist luxury. Young, supple Palmyra leaf blades are carefully harvested during seasonal canopy maintenance, finely split into 2-millimeter strands, naturally bleached under the coastal sun, and hand-woven over 18 hours by women artisans in our partner rural cooperatives.",
    productionStory: "Each tote takes over two full days of meticulous handwork. The weaving technique uses a reinforced herringbone weave that can support up to 15 kg of weight while weighing less than 350 grams. Finished with reinforced braided handles and an embossed vegetable-tanned plant-leather badge.",
    ingredients: [
      "100% Hand-Split Palmyra Palm Leaf (Borassus flabellifer)",
      "Handle Core: Organic Cotton Twine",
      "Badge: Upcycled Apple Leather"
    ],
    nutrition: null,
    allergens: "None.",
    safetyDisclaimers: "Spot clean with a damp microfiber cloth. Do not machine wash or soak. Keep away from prolonged intense rain.",
    ageRestricted: false,
    usage: "The ultimate effortless summer carryall for beach retreats, farmer's market hauls, or everyday urban carry.",
    storage: "Store in the included organic cotton dust bag when not in use.",
    sustainability: "Directly funds fair living wages and healthcare for 280+ women artisans across rural coastal villages.",
    packagingConcept: "Delivered inside a reusable undyed organic cotton canvas tote with certificate of authenticity signed by the artisan.",
    howItReachesYou: "Artisan Cooperative in Coastal Tamil Nadu → Quality Control & Finishing → Studio Packaging → Delivered to you.",
    variants: [
      { name: "Classic Natural Sand Tote", price: 88.00, sku: "TLR-TOT-SND" },
      { name: "Obsidian Dip-Dyed Reserve Tote", price: 98.00, sku: "TLR-TOT-OBS" }
    ],
    inStock: true
  },
  {
    id: "zero-tree-pulp",
    name: "TALA-PULP Zero-Tree Packaging",
    subtitle: "Engineered Palm Biomaterial Cartons",
    category: "biomaterials",
    categoryLabel: "Bio-Homeware & Fiber",
    palmPart: "Pruned Petiole & Leaf Sheath Biomass",
    palmPartId: "frond",
    price: 45.00,
    currency: "$",
    rating: 4.85,
    reviewsCount: 33,
    badge: "B2B & Retail Packs",
    isFeatured: false,
    isNew: true,
    image: "images/hero-palmyra.jpg",
    gallery: [
      "images/hero-palmyra.jpg"
    ],
    shortDesc: "Rigid protective packaging molded entirely from unbleached Palmyra palm agricultural residues. 100% tree-free and ocean-safe.",
    fullDescription: "Industrial packaging consumes billions of virgin trees every year. TALA-PULP provides an ultra-protective alternative engineered entirely from pruned Palmyra leaf petioles and processing residues. Through thermo-mechanical pulping without chlorine or heavy chemicals, we produce high-density molded pulp trays and mailer boxes that cushion luxury goods, cosmetics, and electronics.",
    productionStory: "Agricultural biomass is mechanically shredded, soaked in clean water, and refined into a clean plant slurry. Precision vacuum dies draw the slurry into exact structural shapes, then hot-press them at 160°C to cure natural lignin into a rigid, smooth protective shell.",
    ingredients: [
      "100% Upcycled Palmyra Palm Agricultural Residue Pulp",
      "Zero Synthetic Bleaches, VOCs, or PFAS Forever Chemicals"
    ],
    nutrition: null,
    allergens: "None.",
    safetyDisclaimers: "Industrial biomaterial. Store away from open flames and standing water. Conforms to ASTM D6400 commercial compostability standards.",
    ageRestricted: false,
    usage: "Used across TALARA product packaging lines; also available in bulk for forward-thinking beauty, beverage, and tech brands.",
    storage: "Store flat in dry warehousing.",
    sustainability: "Saves 1.8 kg of virgin timber and 45 liters of industrial water per kilogram of packaging produced.",
    packagingConcept: "Bundles strapped with compostable twine.",
    howItReachesYou: "Grove residue collection → Zero-chemical mechanical pulping → Custom mold pressing → Shipped in bulk.",
    variants: [
      { name: "Sample Evaluation Kit (10 Assorted Boxes)", price: 45.00, sku: "TLR-PLP-KIT" },
      { name: "Production Case (100 Wine/Flask Shippers)", price: 180.00, sku: "TLR-PLP-100" }
    ],
    inStock: true
  },
  {
    id: "emperor-gift-box",
    name: "THE EMPEROR PALM Gift Box",
    subtitle: "Curated Luxury Heritage Collection",
    category: "curations",
    categoryLabel: "Luxury Curations",
    palmPart: "Full Tree Integration (Sap, Wood, Frond, Fiber)",
    palmPartId: "trunk",
    price: 135.00,
    currency: "$",
    rating: 4.99,
    reviewsCount: 47,
    badge: "Collector's Limited Edition",
    isFeatured: true,
    isNew: false,
    image: "images/product-nectar.jpg",
    gallery: [
      "images/product-nectar.jpg",
      "images/product-homeware.jpg"
    ],
    shortDesc: "A master celebration of the Borassus ecosystem: Nectar Reserve, Sugar Crystals, leaf tableware, and a hand-turned wood salt cellar in a bespoke casket.",
    fullDescription: "The definitive gift of sustainable luxury. Housed within an heirloom storage casket hand-crafted from naturally fallen Palmyra heartwood, the Emperor Palm Collection unites our finest culinary and lifestyle treasures. Every piece exemplifies our zero-waste philosophy—transforming every facet of the tree into modern artistic utility.",
    productionStory: "Each casket is individually numbered and turned by master woodworkers from timber salvaged only from naturally fallen century-old palms. The interior is custom-fitted with molded TALA-PULP cradles lined with unbleached organic linen.",
    ingredients: [
      "1x TALARA Nectar Reserve (250ml Amber Flask)",
      "1x AURA Palm Sugar Crystals (300g Pouch)",
      "1x BORASSUS Solid Jaggery Leaf Cake (200g)",
      "1x Hand-Turned Palmyra Wood Condiment Cellar with Spoon",
      "2x FROND-FORM Sculpted Appetizer Platters",
      "1x Signed Certificate of Provenance & Tapper Stewardship Card"
    ],
    nutrition: null,
    allergens: "Refer to individual item packaging. Vegan and dairy-free.",
    safetyDisclaimers: "Contains natural food products. Keep culinary items sealed until consumption. Review individual food item labels for nutrition and allergy statements.",
    ageRestricted: false,
    usage: "The ultimate statement gift for executive milestones, conscious luxury weddings, culinary connoisseurs, and holidays.",
    storage: "Store at ambient room temperature.",
    sustainability: "Strictly limited to 500 numbered boxes annually, governed by the availability of naturally fallen timber.",
    packagingConcept: "Heirloom Palmyra wood casket with brass magnetic latches, finished with cold-pressed natural tung nut oil.",
    howItReachesYou: "Artisan woodwork studio → Curated product assembly → Hand-wax sealed provenance document → White-glove shipping.",
    variants: [
      { name: "Standard Collector's Casket", price: 135.00, sku: "TLR-EMP-BOX" },
      { name: "Reserve Casket with Engraved Monogram", price: 160.00, sku: "TLR-EMP-ENG" }
    ],
    inStock: true
  }
];

const PROCESS_STEPS = [
  {
    step: "01",
    phase: "ETHICAL WILD HARVEST",
    title: "Climbing with Modern Safety",
    summary: "Master tappers scale 30-meter wild palms using our engineered arbor safety harness systems, gathering pure dawn sap and shed fronds with zero harm to tree longevity.",
    detail: "Palmyra palms are not orchard clones; they are wild, resilient perennials growing in drought-prone coastal tracts. We eliminate the extreme physical peril of traditional climbing by supplying high-tensile safety ascenders and life-insurance coverage to every cooperative member.",
    metrics: "100% Non-Felled Trees • 420+ Certified Tappers • Fair Living Wage",
    icon: "shield-check"
  },
  {
    step: "02",
    phase: "CRYO-COLD EXTRACTION",
    title: "Arresting Fermentation Purely",
    summary: "Traditional harvesting coats collection pots with chemical slaked lime to halt yeast action. TALARA replaces this with lime-free stainless vacuum-insulated chill vessels.",
    detail: "By maintaining sap temperature at 3°C from the moment of exudation atop the tree crown, we naturally arrest wild fermentation without chemical alkaline additives, delivering pure, neutral-pH virgin nectar.",
    metrics: "Zero Slaked Lime • Under 4°C Collection • Pristine Neutral pH",
    icon: "thermometer-snowflake"
  },
  {
    step: "03",
    phase: "PRECISION EVAPORATION",
    title: "Low-Thermal Vacuum Concentration",
    summary: "Instead of burning open wood vats that char sugars, our automated sanitary evaporators gently concentrate sap at 68°C under gentle vacuum.",
    detail: "Controlled low-heat reduction prevents caramel scorching while safeguarding heat-sensitive micro-nutrients, natural polyphenols, and delicate floral volatiles.",
    metrics: "68°C Gentle Vacuum Boil • 65% Less Energy • Preserved Mineral Profile",
    icon: "flame"
  },
  {
    step: "04",
    phase: "LABORATORY ACCREDITATION",
    title: "ISO 17025 Safety & Purity Assays",
    summary: "Every production batch undergoes comprehensive chromatographic screening for heavy metals, pesticides, microbial pathogens, and glycemic stability.",
    detail: "We bridge ancient nature with clinical modern accountability. Certificates of Analysis (CoA) are logged digitally on each product's batch QR code for full customer transparency.",
    metrics: "FSSAI & US FDA Compliant • Heavy Metal Screened • Zero Synthetic Preservatives",
    icon: "microscope"
  },
  {
    step: "05",
    phase: "CLOSED-LOOP PACKAGING",
    title: "Zero-Tree Molded Pulp & Glass",
    summary: "Secondary packaging and cushioning are engineered directly from pruned palmyra leaves, paired with UV-protecting amber apothecary glass.",
    detail: "No petroleum bubble wraps or virgin paperboards. The palm wraps its own products in a fully compostable closed lifecycle loop.",
    metrics: "100% Tree-Free Pulp • Recyclable UV Amber Glass • Home Compostable Seals",
    icon: "package-check"
  },
  {
    step: "06",
    phase: "PROVENANCE TRACEABILITY",
    title: "Direct Grove-to-Door Delivery",
    summary: "From coastal agroforestry clusters straight to your doorstep with cold-chain freshness and batch-level farm provenance.",
    detail: "Customers can scan the underside of every container to view the exact geographical palm grove coordinates, harvest date, and the master tapper family who gathered the sap.",
    metrics: "Real-Time Grove GPS • Batch Harvest Date • Direct Consumer Trace",
    icon: "map-pin"
  }
];

const SCIENCE_VS_TRADITION = [
  {
    aspect: "Glycemic Impact & Blood Sugar",
    traditionTitle: "Traditional Belief",
    traditionText: "Folk healers and elders historically referred to palm jaggery as 'diabetes-safe sugar' that could be eaten without restriction.",
    scienceTitle: "Modern Scientific Reality",
    scienceText: "Rigorous clinical testing reveals unrefined palm sugar has a moderately lower Glycemic Index (~38–42 vs 65 for table sugar) and causes fewer sharp blood glucose spikes. However, it still contains ~90% carbohydrates by weight and contributes caloric energy. It is NOT a diabetes cure and must be accounted for in diabetic diets.",
    status: "Nuanced: Favorable profile, but requires moderation."
  },
  {
    aspect: "Microbial Safety & Natural Sap",
    traditionTitle: "Traditional Method",
    traditionText: "Tappers coated clay pots with wet slaked lime (calcium hydroxide) to raise pH and prevent yeast fermentation in hot weather.",
    scienceTitle: "Modern Scientific Innovation",
    scienceText: "While lime is chemically effective at retarding yeast, it introduces high alkalinity, unpleasant chalky taste, and requires harsh acid neutralization. Modern food safety achieves far superior sterility through insulated stainless cryo-chambers, micro-filtration, and non-thermal pulsed electric field processing.",
    status: "Upgraded: Eliminated chemical lime with cryo-technology."
  },
  {
    aspect: "Mineral & Micronutrient Value",
    traditionTitle: "Traditional Belief",
    traditionText: "Prescribed in Ayurvedic traditions for nourishing vitality, combating seasonal fatigue, and supporting maternal recovery.",
    scienceTitle: "Modern Scientific Reality",
    scienceText: "Spectrometric assays confirm unrefined Palmyra nectar contains meaningful trace amounts of potassium, magnesium, iron, and zinc, along with B-complex vitamins that are stripped completely out of refined white cane sugar. While not a pharmaceutical supplement, it is demonstrably more nutrient-dense than refined alternatives.",
    status: "Verified: Substantially higher trace mineral density."
  },
  {
    aspect: "Biodegradable Frond Mechanics",
    traditionTitle: "Traditional Craft",
    traditionText: "Centuries of coastal villagers stitched fallen palm leaves together for disposable plates at feasts and temple gatherings.",
    scienceTitle: "Modern Scientific Innovation",
    scienceText: "Material science analysis shows Palmyra petiole fibers have high lignin content (~32%) and natural hydrophobic waxes. By applying controlled 145°C steam pressure, we trigger thermal lignin plasticization, forming structurally rigid, water-resistant, oil-resistant homeware without synthetic adhesives.",
    status: "Validated: Natural botanical lignin replaces toxic polymers."
  }
];

const SUSTAINABILITY_METRICS = {
  treesFelled: "0",
  treesFelledLabel: "Trees Felled (Strict Non-Destructive Harvest Policy)",
  biomassUtilization: "94.8%",
  biomassUtilizationLabel: "Maximum-Value Biomass Utilization Rate across Sap, Frond, Fruit, Fiber & Tuber",
  tapperFamilies: "420+",
  tapperFamiliesLabel: "Tapper & Artisan Families Supported with Living Wages & Modern Safety Rigging",
  plasticDisplaced: "18.5 Tons",
  plasticDisplacedLabel: "Single-Use Plastics Displaced Annually by Frond Tableware & Molded Pulp",
  waterFootprint: "Near-Zero Irrigation",
  waterFootprintLabel: "Deep Taproots Thrive Solely on Natural Coastal Groundwater & Seasonal Monsoons"
};

const FAQ_DATA = [
  {
    q: "Is TALARA palm sugar safe for people with diabetes?",
    a: "TALARA palm sweeteners have a lower glycemic index (GI ~38–42) than standard white cane sugar (GI ~65) and contain natural trace minerals. However, it is still a concentrated source of carbohydrates. It does NOT lower blood glucose, nor does it treat or cure diabetes. If you are diabetic or prediabetic, always consult your physician or registered dietitian before introducing any sweetener into your dietary plan."
  },
  {
    q: "How does TALARA harvest without harming or chopping down the palm?",
    a: "Palmyra palms live for 80 to 120 years. We harvest living inflorescence sap twice daily, gather naturally shed fronds from the ground, harvest seasonal surplus fruit, and prune leaf-sheath fibers during annual canopy health maintenance. We never chop down trees for our consumer products. The only timber we ever utilize comes from trees that have reached end-of-life natural windfall."
  },
  {
    q: "What is the difference between Palmyra Palm and Coconut Palm?",
    a: "While both belong to the Arecaceae palm family, the Palmyra Palm (Borassus flabellifer) is a rugged, drought-resilient wild palm native to South and Southeast Asia with iconic broad fan-shaped fronds. Its sap produces a distinctively deeper, more complex caramel-molasses note with higher mineral ash density, and its leaf petioles are significantly tougher and more fibrous than coconut fronds."
  },
  {
    q: "Are your products certified and tested for heavy metals?",
    a: "Yes. Every production batch is tested in accredited ISO/IEC 17025 laboratory facilities for heavy metals (lead, arsenic, cadmium, mercury), pesticide residues, microbial pathogens (E. coli, Salmonella), and moisture levels. Certificates of Analysis can be accessed by scanning the batch QR code on your product."
  },
  {
    q: "What is your policy on alcoholic beverages like Toddy?",
    a: "Our Heritage Toddy Reserve undergoes wild yeast fermentation to ~5.4% ABV. It is strictly age-gated (21+ in USA / 18+ in applicable jurisdictions) and requires age verification at purchase. It is not sold to minors or recommended for pregnant women."
  }
];
