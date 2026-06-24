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
      '/placeholder.svg?height=900&width=720&query=fresh%20live%20seafood%20market%20display%20fish%20on%20ice%20asian%20supermarket',
  },
  {
    id: 'bakery',
    name: 'Bakery & Bánh Mì',
    blurb:
      'Crackly French baguettes, warm bánh mì, sponge cakes and traditional pastries baked fresh every single morning.',
    highlight: 'Baked fresh daily',
    image:
      '/placeholder.svg?height=900&width=720&query=fresh%20banh%20mi%20french%20bread%20asian%20bakery%20pastries%20display',
  },
  {
    id: 'pantry',
    name: 'Imported Pantry',
    blurb:
      'Thousands of sauces, noodles, rice, snacks and kitchen essentials imported from Vietnam, Thailand, Japan, Korea and beyond.',
    highlight: 'Thousands of imports',
    image:
      '/placeholder.svg?height=900&width=720&query=asian%20grocery%20aisle%20sauces%20noodles%20snacks%20packed%20shelves',
  },
  {
    id: 'produce',
    name: 'Fresh Produce',
    blurb:
      'Mountains of bok choy, Thai basil, durian, rambutan, lychee and hard-to-find herbs delivered throughout the week.',
    highlight: 'Fresh durian in season',
    image:
      '/placeholder.svg?height=900&width=720&query=fresh%20asian%20produce%20vegetables%20herbs%20bok%20choy%20colorful%20market',
  },
  {
    id: 'beauty',
    name: 'Asian Beauty',
    blurb:
      'A curated wall of K-beauty and J-beauty \u2014 sheet masks, serums, sunscreens and cult skincare brands.',
    highlight: 'K-beauty & J-beauty',
    image:
      '/placeholder.svg?height=900&width=720&query=asian%20beauty%20skincare%20cosmetics%20shelf%20kbeauty%20display',
  },
  {
    id: 'frozen',
    name: 'Frozen & Hot Pot',
    blurb:
      'Dumplings, bao, sliced hot pot meats, broths and everything you need for a feast at home, ready from the freezer.',
    highlight: 'Hot pot headquarters',
    image:
      '/placeholder.svg?height=900&width=720&query=frozen%20asian%20food%20dumplings%20hot%20pot%20meat%20freezer%20aisle',
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
      '/placeholder.svg?height=400&width=400&query=live%20lobster%20fresh%20seafood%20on%20ice',
  },
  {
    title: 'Whole Monthong Durian',
    detail: 'King of fruits, in season now',
    price: '$4.99',
    unit: '/ lb',
    was: '$6.99',
    tag: 'Produce',
    image:
      '/placeholder.svg?height=400&width=400&query=whole%20durian%20fruit%20fresh%20produce',
  },
  {
    title: 'Bánh Mì Combo',
    detail: 'Two house bánh mì + Vietnamese iced coffee',
    price: '$11.99',
    unit: 'combo',
    was: '$15.00',
    tag: 'Bakery',
    image:
      '/placeholder.svg?height=400&width=400&query=banh%20mi%20sandwich%20vietnamese%20iced%20coffee',
  },
  {
    title: 'Jasmine Rice 25 lb',
    detail: 'Premium new-crop fragrant jasmine rice',
    price: '$24.99',
    unit: 'bag',
    was: '$32.99',
    tag: 'Pantry',
    image:
      '/placeholder.svg?height=400&width=400&query=jasmine%20rice%20bag%2025%20pound%20asian%20grocery',
  },
  {
    title: 'Korean Beef Bulgogi',
    detail: 'Thin-sliced ribeye, hot-pot & BBQ ready',
    price: '$7.99',
    unit: '/ lb',
    was: '$10.99',
    tag: 'Frozen',
    image:
      '/placeholder.svg?height=400&width=400&query=thin%20sliced%20beef%20bulgogi%20hot%20pot%20meat',
  },
  {
    title: 'Fresh Bok Choy',
    detail: 'Crisp baby bok choy by the bunch',
    price: '$0.99',
    unit: '/ lb',
    was: '$1.79',
    tag: 'Produce',
    image:
      '/placeholder.svg?height=400&width=400&query=fresh%20baby%20bok%20choy%20green%20vegetable',
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
      '/placeholder.svg?height=640&width=520&query=lunar%20new%20year%20tet%20celebration%20red%20lanterns%20lion%20dance',
  },
  {
    name: 'Mid-Autumn Festival',
    season: 'September',
    blurb:
      'Mooncakes, paper lanterns and family traditions celebrating the harvest moon together.',
    image:
      '/placeholder.svg?height=640&width=520&query=mid%20autumn%20festival%20mooncakes%20paper%20lanterns%20warm',
  },
  {
    name: 'Cooking Demos',
    season: 'Year-round',
    blurb:
      'Free tastings, live cooking demos and seasonal product showcases from our team and partners.',
    image:
      '/placeholder.svg?height=640&width=520&query=cooking%20demonstration%20asian%20food%20tasting%20event%20people',
  },
]
