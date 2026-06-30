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
