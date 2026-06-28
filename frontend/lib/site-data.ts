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
]

export const DEPARTMENTS = [
  {
    id: 'seafood',
    name: 'Live Seafood Market',
    blurb:
      'Tanks of live lobster, crab, tilapia and clams, plus daily fresh catch and our signature live tuna cutting events.',
    highlight: 'Live tuna cutting events',
    image:
      'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=720&q=80',
  },
  {
    id: 'bakery',
    name: 'Bakery & Bánh Mì',
    blurb:
      'Crackly French baguettes, warm bánh mì, sponge cakes and traditional pastries baked fresh every single morning.',
    highlight: 'Baked fresh daily',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=720&q=80',
  },
  {
    id: 'pantry',
    name: 'Imported Pantry',
    blurb:
      'Thousands of sauces, noodles, rice, snacks and kitchen essentials imported from Vietnam, Thailand, Japan, Korea and beyond.',
    highlight: 'Thousands of imports',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=720&q=80',
  },
  {
    id: 'produce',
    name: 'Fresh Produce',
    blurb:
      'Mountains of bok choy, Thai basil, durian, rambutan, lychee and hard-to-find herbs delivered throughout the week.',
    highlight: 'Fresh durian in season',
    image:
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=720&q=80',
  },
  {
    id: 'beauty',
    name: 'Asian Beauty',
    blurb:
      'A curated wall of K-beauty and J-beauty \u2014 sheet masks, serums, sunscreens and cult skincare brands.',
    highlight: 'K-beauty & J-beauty',
    image:
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=720&q=80',
  },
  {
    id: 'frozen',
    name: 'Frozen & Hot Pot',
    blurb:
      'Dumplings, bao, sliced hot pot meats, broths and everything you need for a feast at home, ready from the freezer.',
    highlight: 'Hot pot headquarters',
    image:
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=720&q=80',
  },
]

export const SPECIALS = [
  {
    title: 'Live Maine Lobster',
    detail: 'Fresh from the tank, weighed to order',
    price: '$9.99',
    unit: '/ lb',
    was: '$13.99',
    tag: 'Seafood',
    image:
      'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Whole Monthong Durian',
    detail: 'King of fruits, in season now',
    price: '$4.99',
    unit: '/ lb',
    was: '$6.99',
    tag: 'Produce',
    image:
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Bánh Mì Combo',
    detail: 'Two house bánh mì + Vietnamese iced coffee',
    price: '$11.99',
    unit: 'combo',
    was: '$15.00',
    tag: 'Bakery',
    image:
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Jasmine Rice 25 lb',
    detail: 'Premium new-crop fragrant jasmine rice',
    price: '$24.99',
    unit: 'bag',
    was: '$32.99',
    tag: 'Pantry',
    image:
      'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Korean Beef Bulgogi',
    detail: 'Thin-sliced ribeye, hot-pot & BBQ ready',
    price: '$7.99',
    unit: '/ lb',
    was: '$10.99',
    tag: 'Frozen',
    image:
      'https://images.unsplash.com/photo-1529059997568-3d847b1154f0?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Fresh Bok Choy',
    detail: 'Crisp baby bok choy by the bunch',
    price: '$0.99',
    unit: '/ lb',
    was: '$1.79',
    tag: 'Produce',
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
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
    coverImage: 'https://images.unsplash.com/photo-1516815231560-8f41ec531527?w=1200&h=630&fit=crop&auto=format',
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
    title: "K-Beauty Explained: A First-Timer's Guide to Our Beauty Aisle",
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

export const FESTIVALS = [
  {
    name: 'Lunar New Year',
    season: 'Late January \u2013 February',
    blurb:
      'Lion dancers, lucky red envelopes, bánh chưng and a full Tết collection take over the store.',
    image:
      'https://images.unsplash.com/photo-1516815231560-8f41ec531527?auto=format&fit=crop&w=520&q=80',
  },
  {
    name: 'Mid-Autumn Festival',
    season: 'September',
    blurb:
      'Mooncakes, paper lanterns and family traditions celebrating the harvest moon together.',
    image:
      'https://images.unsplash.com/photo-1502116811450-7773df0d3b29?auto=format&fit=crop&w=520&q=80',
  },
  {
    name: 'Cooking Demos',
    season: 'Year-round',
    blurb:
      'Free tastings, live cooking demos and seasonal product showcases from our team and partners.',
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=520&q=80',
  },
]
