export const STORE = {
  name: 'Kim Nhung Superfood',
  tagline: 'Metro Detroit\u2019s Asian Superstore',
  address: '29411 John R Rd',
  city: 'Madison Heights',
  state: 'MI',
  zip: '48071',
  phone: '(248) 555-0142',
  hours: '9:00 AM \u2013 9:00 PM, Daily',
  mapsQuery: '29411 John R Rd, Madison Heights, MI 48071',
}

export const NAV_LINKS = [
  { label: 'The Store', href: '#departments' },
  { label: 'Weekly Specials', href: '#specials' },
  { label: 'Food Hall', href: '#food-hall' },
  { label: 'Our Story', href: '#story' },
  { label: 'Community', href: '#community' },
  { label: 'Visit', href: '#visit' },
  { label: 'Blog', href: '/blog' },
]

export const DEPARTMENTS = [
  {
    id: 'seafood',
    name: 'Live Seafood Market',
    blurb:
      'Tanks of live lobster, crab, tilapia and clams, plus daily fresh catch and our signature live tuna cutting events.',
    highlight: 'Live tuna cutting events',
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=720&h=900&fit=crop&auto=format',
  },
  {
    id: 'bakery',
    name: 'Bakery & Bánh Mì',
    blurb:
      'Crackly French baguettes, warm bánh mì, sponge cakes and traditional pastries baked fresh every single morning.',
    highlight: 'Baked fresh daily',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=720&h=900&fit=crop&auto=format',
  },
  {
    id: 'pantry',
    name: 'Imported Pantry',
    blurb:
      'Thousands of sauces, noodles, rice, snacks and kitchen essentials imported from Vietnam, Thailand, Japan, Korea and beyond.',
    highlight: 'Thousands of imports',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=720&h=900&fit=crop&auto=format',
  },
  {
    id: 'produce',
    name: 'Fresh Produce',
    blurb:
      'Mountains of bok choy, Thai basil, durian, rambutan, lychee and hard-to-find herbs delivered throughout the week.',
    highlight: 'Fresh durian in season',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=720&h=900&fit=crop&auto=format',
  },
  {
    id: 'beauty',
    name: 'Asian Beauty',
    blurb:
      'A curated wall of K-beauty and J-beauty — sheet masks, serums, sunscreens and cult skincare brands.',
    highlight: 'K-beauty & J-beauty',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=720&h=900&fit=crop&auto=format',
  },
  {
    id: 'frozen',
    name: 'Frozen & Hot Pot',
    blurb:
      'Dumplings, bao, sliced hot pot meats, broths and everything you need for a feast at home, ready from the freezer.',
    highlight: 'Hot pot headquarters',
    image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=720&h=900&fit=crop&auto=format',
  },
]

export const SPECIALS = [
  {
    slug: 'live-maine-lobster',
    title: 'Live Maine Lobster',
    detail: 'Fresh from the tank, weighed to order',
    price: '$9.99',
    unit: '/ lb',
    was: '$13.99',
    tag: 'Seafood',
    image: 'https://images.unsplash.com/photo-1550747528-cdb45925b3f7?w=400&h=400&fit=crop&auto=format',
  },
  {
    slug: 'whole-monthong-durian',
    title: 'Whole Monthong Durian',
    detail: 'King of fruits, in season now',
    price: '$4.99',
    unit: '/ lb',
    was: '$6.99',
    tag: 'Produce',
    image: 'https://images.unsplash.com/photo-1604917778898-f45f4f7a7b2e?w=400&h=400&fit=crop&auto=format',
  },
  {
    slug: 'banh-mi-combo',
    title: 'Bánh Mì Combo',
    detail: 'Two house bánh mì + Vietnamese iced coffee',
    price: '$11.99',
    unit: 'combo',
    was: '$15.00',
    tag: 'Bakery',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&auto=format',
  },
  {
    slug: 'jasmine-rice-25lb',
    title: 'Jasmine Rice 25 lb',
    detail: 'Premium new-crop fragrant jasmine rice',
    price: '$24.99',
    unit: 'bag',
    was: '$32.99',
    tag: 'Pantry',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&auto=format',
  },
  {
    slug: 'korean-beef-bulgogi',
    title: 'Korean Beef Bulgogi',
    detail: 'Thin-sliced ribeye, hot-pot & BBQ ready',
    price: '$7.99',
    unit: '/ lb',
    was: '$10.99',
    tag: 'Frozen',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=400&fit=crop&auto=format',
  },
  {
    slug: 'fresh-bok-choy',
    title: 'Fresh Bok Choy',
    detail: 'Crisp baby bok choy by the bunch',
    price: '$0.99',
    unit: '/ lb',
    was: '$1.79',
    tag: 'Produce',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop&auto=format',
  },
]

export const VENDORS = [
  {
    name: 'Phở Sài Gòn',
    cuisine: 'Vietnamese Noodle House',
    note: 'Slow-simmered beef phở & bún bò Huế',
  },
  {
    name: 'Bến Thành Grill',
    cuisine: 'Vietnamese BBQ',
    note: 'Cơm tấm, grilled pork & broken rice plates',
  },
  {
    name: 'Seoul Street',
    cuisine: 'Korean Street Food',
    note: 'Korean fried chicken, tteokbokki & kimbap',
  },
  {
    name: 'Bangkok Wok',
    cuisine: 'Thai Kitchen',
    note: 'Pad see ew, boat noodles & mango sticky rice',
  },
  {
    name: 'Taipei Bites',
    cuisine: 'Taiwanese Snacks',
    note: 'Popcorn chicken, bao buns & bubble tea',
  },
  {
    name: 'Tokyo Counter',
    cuisine: 'Japanese',
    note: 'Hand rolls, donburi & fresh ramen bowls',
  },
]

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  categoryColor: string
  date: string
  readingTime: string
  author: string
  authorRole: string
  coverImage: string
  body: { type: 'p' | 'h2' | 'h3' | 'img' | 'blockquote'; content: string }[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'live-tuna-cutting-what-to-expect',
    title: 'Live Tuna Cutting at Kim Nhung: What to Expect',
    excerpt:
      'Every weekend our seafood team brings in a whole bluefin tuna and breaks it down live on the floor. Here is what happens, why it matters, and which cuts to grab first.',
    category: 'Seafood',
    categoryColor: 'bg-teal/15 text-teal',
    date: 'June 14, 2025',
    readingTime: '5 min read',
    author: 'Minh Tran',
    authorRole: 'Seafood Department Lead',
    coverImage: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=1200&h=630&fit=crop&auto=format',
    body: [
      { type: 'p', content: 'Every Saturday and Sunday morning, a crowd gathers near the back of our store. There is no announcement — word travels fast. Our seafood team wheels out a whole bluefin tuna, sometimes over 200 lbs, and over the next 30 minutes they break it down by hand, right in front of you.' },
      { type: 'h2', content: 'Why we do it' },
      { type: 'p', content: 'Freshness is not just marketing. When you watch a fish go from whole to sliced in minutes, you know exactly what you are getting. No mystery about when it was processed or how far it traveled portioned. The belly, the collar, the loin — all cut to order, right there.' },
      { type: 'h2', content: 'The cuts, ranked' },
      { type: 'h3', content: 'Otoro (fatty belly)' },
      { type: 'p', content: 'The most marbled section, running along the underside of the fish. It melts at room temperature and sells out within the first ten minutes. Get there early.' },
      { type: 'h3', content: 'Chutoro (medium belly)' },
      { type: 'p', content: 'The sweet spot for most home cooks — enough fat to stay rich, firm enough to hold up on a hot grill or in a quick sear. Great value compared to otoro.' },
      { type: 'h3', content: 'Akami (lean loin)' },
      { type: 'p', content: 'The most abundant cut. Deep red, clean flavor, ideal for Vietnamese-style tuna salad (gỏi cá ngừ) or a simple soy and sesame bowl.' },
      { type: 'img', content: 'https://images.unsplash.com/photo-1545816250-0cd4b69d341b?w=1100&h=600&fit=crop&auto=format' },
      { type: 'h2', content: 'Tips for attending' },
      { type: 'p', content: 'Events start around 10 AM on weekends but there is no fixed schedule — follow our Facebook page for same-day announcements. Bring a cooler if you plan on buying more than a pound. Our team will vacuum-seal on request. Ask for the collar (kama) — it is often set aside and is one of the best pieces on the fish for grilling.' },
      { type: 'blockquote', content: '"The collar alone is worth the trip. Most people walk right past it, which means more for the ones who know." — Minh, Seafood Lead' },
      { type: 'p', content: 'We will see you on the floor.' },
    ],
  },
  {
    slug: 'tet-grocery-guide-2026',
    title: 'Your Complete Tết Grocery Guide for 2026',
    excerpt:
      'From bánh chưng ingredients to lucky fruit arrangements, here is every item on the traditional Tết shopping list and where to find it in the store.',
    category: 'Culture',
    categoryColor: 'bg-berry/12 text-berry',
    date: 'January 8, 2026',
    readingTime: '7 min read',
    author: 'Lan Nguyen',
    authorRole: 'Community & Events',
    coverImage: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=1200&h=630&fit=crop&auto=format',
    body: [
      { type: 'p', content: 'Tết Nguyên Đán 2026 falls on January 29th. If you are preparing a traditional spread for family, the shopping list can feel overwhelming. This guide breaks it down by category so nothing gets forgotten.' },
      { type: 'h2', content: 'The altar essentials' },
      { type: 'p', content: 'The five-fruit tray (mâm ngũ quả) is the centerpiece of every Tết altar. The fruits vary by region — Northern families often use chuối (banana), bưởi (pomelo), cam (orange), quýt (mandarin), and hồng (persimmon). We stock all of these starting the first week of January.' },
      { type: 'h2', content: 'Bánh chưng ingredients' },
      { type: 'p', content: 'The square sticky rice cake requires nếp (glutinous rice), đậu xanh (split mung beans), thịt ba chỉ (pork belly), and lá dong (dong leaves for wrapping). All four are in-store through the end of January. Ask our produce team for pre-washed dong leaves — they save about 20 minutes of prep.' },
      { type: 'img', content: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1100&h=600&fit=crop&auto=format' },
      { type: 'h2', content: 'Pantry items to stock up on' },
      { type: 'p', content: 'Mắm tôm, nước mắm, tương hoisin, dried mushrooms, glass noodles, and rice paper should all go in the cart early. Our pantry aisles are fully restocked each Monday morning during the Tết season, but certain items — especially premium fish sauce — move fast.' },
      { type: 'blockquote', content: '"Every year we tell people: come the week before, not the day before. The day before Tết, the parking lot is a different story." — Lan, Events Team' },
      { type: 'h2', content: 'For the kids' },
      { type: 'p', content: 'Red envelopes (bao lì xì) are near the checkout counters starting January 10th. We also carry a large selection of Vietnamese candy and dried fruits for the traditional Tết tray — ô mai, mứt dừa, hạt dưa, and more.' },
    ],
  },
  {
    slug: 'how-to-build-the-perfect-banh-mi',
    title: 'How to Build the Perfect Bánh Mì at Home',
    excerpt:
      'Our bakery team breaks down the anatomy of a great bánh mì — from the right baguette to the balance of pickled vegetables, proteins, and sauces.',
    category: 'Recipes',
    categoryColor: 'bg-tangerine/15 text-tangerine',
    date: 'May 3, 2025',
    readingTime: '6 min read',
    author: 'Thu Pham',
    authorRole: 'Head Baker',
    coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=630&fit=crop&auto=format',
    body: [
      { type: 'p', content: 'A great bánh mì is a study in contrasts: a shattering crust and a pillowy interior, fatty proteins against sharp pickled vegetables, a cool slick of pâté next to a hit of chili. Get the balance wrong and it is just a sandwich. Get it right and it is one of the best things you can eat for under five dollars.' },
      { type: 'h2', content: 'Start with the right bread' },
      { type: 'p', content: 'This is non-negotiable. A Vietnamese baguette is not a French baguette. It uses a portion of rice flour, which makes the crumb lighter and airier and the crust thinner. Our bakery bakes them fresh at 7 AM and 1 PM daily. Buy them the same day you plan to eat them.' },
      { type: 'h2', content: 'The protein layer' },
      { type: 'p', content: 'Classic options from our deli and freezer sections: chả lụa (Vietnamese pork roll), thịt nướng (grilled pork), and canned pâté. Crispy tofu works well too — press it dry, fry it in sesame oil, and season with a splash of soy.' },
      { type: 'img', content: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1100&h=600&fit=crop&auto=format' },
      { type: 'h2', content: 'The pickled vegetables (đồ chua)' },
      { type: 'p', content: 'Julienned carrots and daikon, quick-pickled in rice vinegar, sugar, and a pinch of salt. They need at least one hour in the jar but are better after a full night. We sell them pre-made in the refrigerated section if you want to skip the prep.' },
      { type: 'h3', content: 'The ratio that works' },
      { type: 'p', content: 'About a third of the sandwich volume should be pickled vegetables. Most people under-do this step. The acid is what cuts through the richness of the pâté and meat — it is doing real structural work, not just garnish.' },
      { type: 'blockquote', content: '"The bread is 50% of the sandwich. You can put perfect ingredients inside a mediocre baguette and the whole thing falls flat." — Thu, Head Baker' },
      { type: 'h2', content: 'Finishing touches' },
      { type: 'p', content: 'A thin layer of mayo on both sides of the bread (Kewpie, if you have it). Fresh cucumber slices, cilantro, and sliced jalapeño. A few drops of Maggi seasoning sauce over the top before closing. That is it. Do not overthink it.' },
    ],
  },
  {
    slug: 'hot-pot-for-beginners',
    title: 'Hot Pot for Beginners: Everything You Need from One Store',
    excerpt:
      'Never hosted a hot pot night? This guide covers broths, proteins, vegetables, dipping sauces, and the gear — everything stocked in one trip to Kim Nhung.',
    category: 'Recipes',
    categoryColor: 'bg-tangerine/15 text-tangerine',
    date: 'February 20, 2025',
    readingTime: '8 min read',
    author: 'Kevin Dang',
    authorRole: 'Frozen & Specialty Foods',
    coverImage: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&h=630&fit=crop&auto=format',
    body: [
      { type: 'p', content: 'Hot pot is one of those meals that sounds complicated but is almost entirely about shopping well. Once you have the right ingredients on the table, the cooking happens in front of your guests — which means you get to sit down and enjoy it too.' },
      { type: 'h2', content: 'Choose your broth base' },
      { type: 'p', content: 'Start with one of two approaches: a store-bought concentrate (our freezer section has excellent Sichuan mala, Japanese shabu, and a mild Vietnamese phở base) or a homemade stock. For beginners, we recommend the phở base — it is mild enough for everyone at the table and pairs with almost any protein.' },
      { type: 'h2', content: 'Proteins to grab' },
      { type: 'p', content: 'Thin-sliced beef and lamb are in the hot pot section of our freezer, pre-portioned and ready to go. Look for: bò nhúng dấm (beef for vinegar fondue), ba chỉ thái mỏng (thin pork belly), and a variety of fish balls, squid balls, and shrimp dumplings. Plan on 6–8 oz of protein per person.' },
      { type: 'img', content: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=1100&h=600&fit=crop&auto=format' },
      { type: 'h2', content: 'Vegetables' },
      { type: 'p', content: 'Napa cabbage, water spinach (rau muống), enoki mushrooms, thinly sliced lotus root, and corn on the cob cut into rounds. All in our produce section. Tofu — both firm and silken — goes in the broth early to absorb flavor.' },
      { type: 'h2', content: 'The dipping sauce bar' },
      { type: 'p', content: 'This is where hot pot gets personal. The base is usually a 50/50 blend of hoisin sauce and peanut butter, thinned with a little hot broth from the pot. From there: fresh garlic, chili oil, sesame paste, or a squeeze of lime. All the components are in our sauce aisle.' },
      { type: 'blockquote', content: '"Do not skip the dipping sauce. That is where all the personality is. The broth cooks the food — the sauce is what people remember." — Kevin, Frozen Foods' },
      { type: 'h2', content: 'Equipment' },
      { type: 'p', content: 'A dedicated hot pot burner is ideal but not required. An electric skillet or a regular pot on a portable induction burner works perfectly. We carry portable butane burners and split-pot vessels in our kitchenware aisle.' },
    ],
  },
  {
    slug: 'k-beauty-guide-for-beginners',
    title: 'K-Beauty Explained: A First-Timer\'s Guide to Our Beauty Aisle',
    excerpt:
      'Sheet masks, essences, sunscreens, and snail serums — our beauty team walks you through what each step does and which products to start with.',
    category: 'Beauty',
    categoryColor: 'bg-leaf/15 text-leaf',
    date: 'April 11, 2025',
    readingTime: '5 min read',
    author: 'Jenny Kim',
    authorRole: 'Beauty Department',
    coverImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=630&fit=crop&auto=format',
    body: [
      { type: 'p', content: 'The K-beauty section at Kim Nhung can look overwhelming if you are used to a two-step drugstore routine. But the core logic is simple: layering lightweight products from thinnest to thickest, so each one can absorb fully before the next goes on.' },
      { type: 'h2', content: 'Start with three products' },
      { type: 'p', content: 'If you are new, do not try to build a 10-step routine on day one. Our team recommends starting with a gentle cleanser, a hydrating toner (not an exfoliating one), and a sunscreen. Get those three right before adding anything else.' },
      { type: 'h2', content: 'What is an essence?' },
      { type: 'p', content: 'An essence sits between toner and serum in the routine. It is more watery than a serum but more concentrated than a toner — it preps the skin to absorb what comes next. The most famous is SK-II Facial Treatment Essence (fermented rice water base), but excellent drugstore versions exist at a fraction of the price.' },
      { type: 'img', content: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1100&h=600&fit=crop&auto=format' },
      { type: 'h2', content: 'Sheet masks' },
      { type: 'p', content: 'A single-use mask soaked in serum, designed to stay on the skin for 15–20 minutes. They are more of a weekly treatment than a daily step. Our beauty section carries over 40 varieties — brightening, hydrating, firming, and soothing. A good starting pick is any mask from MEDIHEAL or Benton.' },
      { type: 'h2', content: 'The sunscreen question' },
      { type: 'p', content: 'Korean sunscreens have a different texture from Western ones — lighter, less white-cast, often worn instead of moisturizer. SPF 50+ PA++++ is standard. Brands to look for: Beauty of Joseon, Skin Aqua, Anessa. This is the one product the entire K-beauty community agrees on: use it every day, not just at the beach.' },
      { type: 'blockquote', content: '"Sunscreen is the one anti-aging product that actually works. Everything else in the routine supports it." — Jenny, Beauty Dept' },
      { type: 'p', content: 'Come in and talk to our team. We can walk you through what we personally use and what has worked for customers with similar skin types. No upselling — just honest advice.' },
    ],
  },
]

export type StockStatus = 'in_stock' | 'limited' | 'out_of_stock'

export type Product = {
  slug: string
  name: string
  nativeName?: string
  department: string
  subcategory: string
  description: string
  highlights: string[]
  price: string
  unit: string
  was?: string
  stockStatus: StockStatus
  freshnessNote?: string
  images: string[]
  promo?: { label: string; detail: string; expires: string }
  nutrition?: { servingSize: string; calories: number; rows: { label: string; value: string; indent?: boolean }[] }
  specs: { label: string; value: string }[]
  origin: { country: string; imported: boolean; brandNative?: string; brandNativeScript?: string; note: string }
  pairings: { slug: string; name: string; image: string; price: string; unit: string }[]
  reviews: { author: string; rating: number; date: string; body: string }[]
}

export const PRODUCTS: Product[] = [
  {
    slug: 'live-maine-lobster',
    name: 'Live Maine Lobster',
    nativeName: 'Tôm Hùm Maine Sống',
    department: 'Seafood',
    subcategory: 'Live Tank',
    description:
      'Sourced direct from the cold Atlantic waters off Maine, our live lobsters are held in oxygenated tanks at the optimal salinity and temperature. Weighed to the gram at the counter — you only pay for what you take home.',
    highlights: [
      'Live in-store tank, harvested to order',
      'Average weight 1.25 – 2 lbs each',
      'Best for boiling, steaming, or grilling split',
      'Ask the counter team for cleaning & cracking',
    ],
    price: '$9.99',
    unit: '/ lb',
    was: '$13.99',
    stockStatus: 'limited',
    freshnessNote: 'Live tank — limited daily quantity. Arrive early on weekends.',
    images: [
      'https://images.unsplash.com/photo-1550747528-cdb45925b3f7?w=900&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=900&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=900&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=900&h=900&fit=crop&auto=format',
    ],
    promo: {
      label: 'Weekly Special',
      detail: 'Save $4.00/lb this week only — valid through Sunday while supplies last.',
      expires: 'Sunday, June 29',
    },
    nutrition: {
      servingSize: '3 oz (85g) cooked, meat only',
      calories: 76,
      rows: [
        { label: 'Total Fat', value: '0.7g' },
        { label: 'Saturated Fat', value: '0.1g', indent: true },
        { label: 'Cholesterol', value: '61mg' },
        { label: 'Sodium', value: '413mg' },
        { label: 'Total Carbohydrate', value: '0g' },
        { label: 'Protein', value: '16g' },
      ],
    },
    specs: [
      { label: 'Sold by', value: 'Weight (lb)' },
      { label: 'Average size', value: '1.25 – 2 lbs each' },
      { label: 'Storage', value: 'Live tank; cook same day as purchase' },
      { label: 'Department', value: 'Live Seafood Market' },
    ],
    origin: {
      country: 'United States (Maine)',
      imported: false,
      note: 'Wild-caught from the Gulf of Maine. MSC-traceable supply chain. Lobsters are shipped live overnight from our Maine supplier and transferred to our in-store tanks within 24 hours of catch.',
    },
    pairings: [
      {
        slug: 'jasmine-rice-25lb',
        name: 'Jasmine Rice 25 lb',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop&auto=format',
        price: '$24.99',
        unit: 'bag',
      },
      {
        slug: 'fresh-bok-choy',
        name: 'Fresh Bok Choy',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop&auto=format',
        price: '$0.99',
        unit: '/ lb',
      },
      {
        slug: 'korean-beef-bulgogi',
        name: 'Korean Beef Bulgogi',
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=300&fit=crop&auto=format',
        price: '$7.99',
        unit: '/ lb',
      },
    ],
    reviews: [
      {
        author: 'Thanh L.',
        rating: 5,
        date: 'June 10, 2025',
        body: 'Freshest lobster I have had outside of a restaurant. The counter team was super helpful — they split and cleaned it for me on the spot. Will be back every week.',
      },
      {
        author: 'Michael R.',
        rating: 5,
        date: 'May 28, 2025',
        body: 'Price is unbeatable for live lobster in Metro Detroit. Tanks are clean, lobsters are lively. Grabbed two for a dinner party and everyone was impressed.',
      },
      {
        author: 'Linh P.',
        rating: 4,
        date: 'May 15, 2025',
        body: 'Great product. Only reason for 4 stars is that they sold out early on Saturday. Going to arrive right when the store opens next time.',
      },
    ],
  },
  {
    slug: 'whole-monthong-durian',
    name: 'Whole Monthong Durian',
    nativeName: 'Sầu Riêng Monthong',
    department: 'Produce',
    subcategory: 'Tropical Fruit',
    description:
      'Monthong — meaning "golden pillow" in Thai — is prized for its large, pale-yellow flesh with a creamy, custard-like texture and a relatively mild aroma compared to other varieties. Our durians are sourced from Thailand and Malaysia at peak ripeness.',
    highlights: [
      'Monthong variety — mildest and creamiest',
      'Sourced from Thailand and Malaysia at peak ripeness',
      'Whole fruit, cracked open at the counter on request',
      'Rich in potassium, B vitamins, and healthy fats',
    ],
    price: '$4.99',
    unit: '/ lb',
    was: '$6.99',
    stockStatus: 'in_stock',
    images: [
      'https://images.unsplash.com/photo-1604917778898-f45f4f7a7b2e?w=900&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&h=900&fit=crop&auto=format',
    ],
    promo: {
      label: 'In Season Now',
      detail: 'Peak Monthong season runs June through August. Stock is refreshed three times a week.',
      expires: 'While in season',
    },
    specs: [
      { label: 'Variety', value: 'Monthong (ทุเรียนหมอนทอง)' },
      { label: 'Sold by', value: 'Weight (lb) — whole fruit' },
      { label: 'Average weight', value: '8 – 14 lbs per fruit' },
      { label: 'Origin', value: 'Thailand / Malaysia' },
      { label: 'Storage', value: 'Room temperature until ripe; refrigerate opened sections up to 3 days' },
    ],
    origin: {
      country: 'Thailand / Malaysia',
      imported: true,
      brandNative: 'Monthong',
      brandNativeScript: 'หมอนทอง',
      note: 'Imported directly from certified farms in Chanthaburi Province, Thailand — one of the most renowned durian-growing regions in the world. Each shipment is inspected for optimal Brix (sugar) levels before hitting the floor.',
    },
    pairings: [
      {
        slug: 'jasmine-rice-25lb',
        name: 'Jasmine Rice 25 lb',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop&auto=format',
        price: '$24.99',
        unit: 'bag',
      },
    ],
    reviews: [],
  },
  {
    slug: 'banh-mi-combo',
    name: 'Bánh Mì Combo',
    nativeName: 'Bánh Mì + Cà Phê Sữa Đá',
    department: 'Bakery',
    subcategory: 'Bánh Mì',
    description:
      'Two freshly baked bánh mì sandwiches paired with a Vietnamese iced coffee (cà phê sữa đá). The bread is baked in-house daily using a traditional rice-flour baguette formula — thin, crackly crust with a light, airy crumb.',
    highlights: [
      'Bread baked fresh at 7 AM and 1 PM daily',
      'Choice of filling: classic pork & pâté, lemongrass chicken, or tofu',
      'Paired with house-made Vietnamese iced coffee',
      'Served immediately — best eaten fresh',
    ],
    price: '$11.99',
    unit: 'combo',
    was: '$15.00',
    stockStatus: 'in_stock',
    freshnessNote: 'Baked fresh twice daily. Available while bread lasts — typically sells out by 7 PM.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&h=900&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Includes', value: '2 bánh mì + 1 Vietnamese iced coffee' },
      { label: 'Filling options', value: 'Pork & pâté, lemongrass chicken, tofu' },
      { label: 'Bread', value: 'House-baked rice-flour baguette' },
      { label: 'Pickup', value: 'Bakery counter, aisle 1' },
    ],
    origin: {
      country: 'Vietnam (recipe)',
      imported: false,
      note: 'Baked on-site by our in-house bakery team using a recipe that traces back to traditional Saigon street bánh mì. The bread formula uses a portion of rice flour, consistent with Southern Vietnamese style.',
    },
    pairings: [
      {
        slug: 'fresh-bok-choy',
        name: 'Fresh Bok Choy',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop&auto=format',
        price: '$0.99',
        unit: '/ lb',
      },
    ],
    reviews: [
      {
        author: 'Hoa T.',
        rating: 5,
        date: 'June 3, 2025',
        body: 'The bread is exactly like the bánh mì you get in Vietnam — so light and crispy. The combo deal is a steal. I come here for lunch at least twice a week.',
      },
    ],
  },
  {
    slug: 'jasmine-rice-25lb',
    name: 'Jasmine Rice 25 lb',
    nativeName: 'Gạo Thơm Lài 25 lbs',
    department: 'Pantry',
    subcategory: 'Rice & Grains',
    description:
      'Premium new-crop fragrant jasmine rice from Thailand\'s Surin province. New-crop rice is harvested and milled within the same season, resulting in a more aromatic, softer, and stickier grain compared to older stock.',
    highlights: [
      'New-crop harvest — milled the same season',
      'Surin Province, Thailand — benchmark jasmine region',
      'Long grain, naturally fragrant, slightly sticky when cooked',
      '25 lb resealable bag',
    ],
    price: '$24.99',
    unit: 'bag',
    was: '$32.99',
    stockStatus: 'in_stock',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=900&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&h=900&fit=crop&auto=format',
    ],
    nutrition: {
      servingSize: '1/4 cup dry (45g)',
      calories: 160,
      rows: [
        { label: 'Total Fat', value: '0g' },
        { label: 'Sodium', value: '0mg' },
        { label: 'Total Carbohydrate', value: '36g' },
        { label: 'Dietary Fiber', value: '0g', indent: true },
        { label: 'Total Sugars', value: '0g', indent: true },
        { label: 'Protein', value: '3g' },
      ],
    },
    specs: [
      { label: 'Net weight', value: '25 lbs (11.3 kg)' },
      { label: 'Variety', value: 'Jasmine (Hom Mali)' },
      { label: 'Crop year', value: '2024–2025 new crop' },
      { label: 'Package', value: 'Resealable bag' },
      { label: 'SKU', value: 'KN-RICE-JAS-25' },
    ],
    origin: {
      country: 'Thailand',
      imported: true,
      brandNative: 'Gạo Thơm Lài',
      brandNativeScript: 'ข้าวหอมมะลิ',
      note: 'Sourced from Surin Province in northeast Thailand, one of the original Hom Mali jasmine rice cultivation regions. Imported directly — no intermediate warehousing — to preserve fragrance.',
    },
    pairings: [
      {
        slug: 'live-maine-lobster',
        name: 'Live Maine Lobster',
        image: 'https://images.unsplash.com/photo-1550747528-cdb45925b3f7?w=300&h=300&fit=crop&auto=format',
        price: '$9.99',
        unit: '/ lb',
      },
      {
        slug: 'fresh-bok-choy',
        name: 'Fresh Bok Choy',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop&auto=format',
        price: '$0.99',
        unit: '/ lb',
      },
    ],
    reviews: [
      {
        author: 'Mai N.',
        rating: 5,
        date: 'June 18, 2025',
        body: 'The fragrance when you open the bag is incredible. This is the real thing — not the old stock you find at chain grocery stores. My family goes through a 25 lb bag every month.',
      },
      {
        author: 'David K.',
        rating: 5,
        date: 'May 30, 2025',
        body: 'Best jasmine rice I have found in Michigan. The price is also very competitive for the quality. I always grab a couple bags when I visit.',
      },
    ],
  },
  {
    slug: 'korean-beef-bulgogi',
    name: 'Korean Beef Bulgogi',
    nativeName: '불고기 (Bulgogi)',
    department: 'Frozen',
    subcategory: 'Hot Pot & BBQ',
    description:
      'Thin-sliced ribeye, pre-marinated in a classic bulgogi blend of soy sauce, Asian pear, sesame oil, garlic, and ginger. Ready for the hot pot, tabletop BBQ, or a quick stir-fry. No prep needed.',
    highlights: [
      'USDA Choice ribeye, thinly sliced in-house',
      'Marinated in classic bulgogi sauce — ready to cook',
      'Ideal for hot pot, Korean BBQ grill, or stir-fry',
      'Vacuum-sealed for freshness',
    ],
    price: '$7.99',
    unit: '/ lb',
    was: '$10.99',
    stockStatus: 'in_stock',
    images: [
      'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=900&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=900&h=900&fit=crop&auto=format',
    ],
    nutrition: {
      servingSize: '4 oz (113g)',
      calories: 210,
      rows: [
        { label: 'Total Fat', value: '11g' },
        { label: 'Saturated Fat', value: '4g', indent: true },
        { label: 'Cholesterol', value: '65mg' },
        { label: 'Sodium', value: '520mg' },
        { label: 'Total Carbohydrate', value: '6g' },
        { label: 'Protein', value: '22g' },
      ],
    },
    specs: [
      { label: 'Cut', value: 'Ribeye, thin-sliced' },
      { label: 'Grade', value: 'USDA Choice' },
      { label: 'Sold by', value: 'Weight (lb)' },
      { label: 'Storage', value: 'Keep frozen; thaw in refrigerator overnight' },
      { label: 'Department', value: 'Frozen & Hot Pot' },
    ],
    origin: {
      country: 'United States',
      imported: false,
      brandNative: '불고기',
      brandNativeScript: '불고기',
      note: 'USDA Choice American beef, sliced and marinated on-site by our meat team using a traditional Korean bulgogi marinade. Sauce ingredients include Sempio soy sauce (imported from Korea) and fresh Asian pear.',
    },
    pairings: [
      {
        slug: 'jasmine-rice-25lb',
        name: 'Jasmine Rice 25 lb',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop&auto=format',
        price: '$24.99',
        unit: 'bag',
      },
      {
        slug: 'fresh-bok-choy',
        name: 'Fresh Bok Choy',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop&auto=format',
        price: '$0.99',
        unit: '/ lb',
      },
    ],
    reviews: [],
  },
  {
    slug: 'fresh-bok-choy',
    name: 'Fresh Bok Choy',
    nativeName: 'Cải Thìa / 白菜',
    department: 'Produce',
    subcategory: 'Leafy Greens',
    description:
      'Baby bok choy harvested young for maximum tenderness. Mild, slightly sweet flavour with crisp white stalks and dark green leaves. One of the most versatile vegetables in Asian cooking — stir-fry, soup, braised, or raw.',
    highlights: [
      'Baby variety — more tender than full-size',
      'Delivered fresh multiple times per week',
      'Grown in Ontario and Michigan in season',
      'Excellent source of vitamins A, C, and K',
    ],
    price: '$0.99',
    unit: '/ lb',
    was: '$1.79',
    stockStatus: 'in_stock',
    images: [
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&h=900&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Variety', value: 'Baby bok choy' },
      { label: 'Sold by', value: 'Weight (lb)' },
      { label: 'Storage', value: 'Refrigerate in a damp bag; use within 4–5 days' },
      { label: 'Season', value: 'Year-round; local in season May–October' },
    ],
    origin: {
      country: 'Canada / United States',
      imported: false,
      note: 'Sourced from Ontario and Michigan farms in season (May–October). Off-season supply comes from California. We do not carry imported bok choy when local is available.',
    },
    pairings: [
      {
        slug: 'live-maine-lobster',
        name: 'Live Maine Lobster',
        image: 'https://images.unsplash.com/photo-1550747528-cdb45925b3f7?w=300&h=300&fit=crop&auto=format',
        price: '$9.99',
        unit: '/ lb',
      },
      {
        slug: 'jasmine-rice-25lb',
        name: 'Jasmine Rice 25 lb',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop&auto=format',
        price: '$24.99',
        unit: 'bag',
      },
    ],
    reviews: [],
  },
]

export const FESTIVALS = [
  {
    name: 'Lunar New Year',
    season: 'Late January – February',
    blurb:
      'Lion dancers, lucky red envelopes, bánh chưng and a full Tết collection take over the store.',
    image: 'https://images.unsplash.com/photo-1582386312757-76d2dc685e56?w=520&h=640&fit=crop&auto=format',
  },
  {
    name: 'Mid-Autumn Festival',
    season: 'September',
    blurb:
      'Mooncakes, paper lanterns and family traditions celebrating the harvest moon together.',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=520&h=640&fit=crop&auto=format',
  },
  {
    name: 'Cooking Demos',
    season: 'Year-round',
    blurb:
      'Free tastings, live cooking demos and seasonal product showcases from our team and partners.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=520&h=640&fit=crop&auto=format',
  },
]
