import { getStrapiURL } from '@/lib/utils';

export function blocksToText(blocks: unknown[]): string {
  return (blocks as Array<{ children?: Array<{ type?: string; text?: string }> }>)
    .flatMap((block) => block.children ?? [])
    .filter((child) => child.type === 'text')
    .map((child) => child.text ?? '')
    .join('')
    .trim();
}

// --- Strapi base types ---

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

// --- Component types ---

interface RichTextBlock {
  RichText: unknown[]; // Strapi Blocks field
}

interface IconText {
  id: number;
  Text: string;
  Icon: 'Clock' | 'Pin' | 'Phone';
  isLeft: boolean;
}

interface Link {
  id: number;
  Title: string;
  Description: string | null;
  Url: string;
  isExternal: boolean;
}

interface LogoText {
  id: number;
  Logo: StrapiMedia | null;
  DarkLogo: StrapiMedia | null;
  Title: Link | null;
}

// --- Layout types ---

interface Announcement {
  id: number;
  RichText: RichTextBlock[];
}

interface Utility {
  id: number;
  Text: IconText[];
}

interface NavBar {
  id: number;
  LogoText: LogoText | null;
}

// --- Global type ---

export interface Global {
  id: number;
  documentId: string;
  Title: string;
  Description: string | null;
  Icon: StrapiMedia | null;
  Logo: StrapiMedia | null;
  Announcement: Announcement | null;
  Utility: Utility | null;
  NavBar: NavBar | null;
}

interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

// --- Hero types ---

export type HeroIconEnum = 'Bread' | 'Fish'
export type HeroColorEnum = 'Black' | 'Blue' | 'Brown' | 'Green' | 'Orange' | 'Red' | 'Yellow' | 'White'

export interface HeroLink {
  id: number;
  Title: string;
  Url: string;
  isButton: boolean | null;
  isExternal: boolean;
  Variant: 'None' | 'Primary' | 'Secondary' | 'Outline' | 'Ghost' | 'Underline' | null;
}

export interface HeroContent {
  id: number;
  Title: string | null;
  Description: string | null;
  Badge: string | null;
  Icon: HeroIconEnum | null;
  Image: StrapiMedia | null;
  Color: HeroColorEnum | null;
  isPrimary: boolean | null;
  Link: HeroLink[];
}

interface LayoutsHeroBlock {
  __component: 'layouts.hero';
  id: number;
  Hero: HeroContent[];
}

// --- Showcase types ---

export interface ShowcaseItem {
  id: number;
  Title: string | null;
  Image: StrapiMedia | null;
  Link: HeroLink[];
}

export interface ShowcaseBlock {
  __component: 'layouts.showcase';
  id: number;
  Title: string | null;
  Description: string | null;
  Link: HeroLink[];
  Showcase: ShowcaseItem[];
}

// --- Deals types ---

export interface DealsBlock {
  __component: 'layouts.deals';
  id: number;
  Title: string | null;
  Description: string | null;
  Badge: string | null;
  Link: HeroLink[];
}

// --- Story types ---

export interface ShortText {
  id: number;
  Text: string | null;
}

export interface BulletinBlock {
  id: number;
  isVertical: boolean | null;
  Variant: 'check' | 'point' | null;
  Text: ShortText[];
}

export interface StoryContents {
  id: number;
  Title: string | null;
  Description: string | null;
  Badge: string | null;
  Image: StrapiMedia & { caption?: string | null } | null;
  RichText: { id: number; RichText: unknown[] }[];
}

export interface StoryBlock {
  __component: 'layouts.story';
  id: number;
  Story: StoryContents[];
  Bulletin: BulletinBlock[];
}

// --- Eatery types ---

export interface EateryInfo {
  id: number;
  Title: string | null;
  Description: string | null;
  Badge: string | null;
}

export interface EateryBlock {
  __component: 'layouts.eatery';
  id: number;
  Title: string | null;
  Description: string | null;
  Badge: string | null;
  Info: EateryInfo[];
}

// --- Map types ---

export interface AisleItem {
  id: number;
  Title: string | null;
  Description: string | null;
  Image: StrapiMedia | null;
}

export interface MapContents {
  id: number;
  Title: string | null;
  Description: string | null;
  Badge: string | null;
  Aisle: AisleItem[];
}

export interface MapBlock {
  __component: 'layouts.map';
  id: number;
  Map: MapContents | null;
}

type HomepageBlock = LayoutsHeroBlock | ShowcaseBlock | DealsBlock | StoryBlock | EateryBlock | MapBlock;

interface Homepage {
  Title: string | null;
  Description: string | null;
  Blocks: HomepageBlock[];
}

export async function getHomePage(): Promise<Homepage | null> {
  try {
    const params = new URLSearchParams({
      'populate[Blocks][on][layouts.hero][populate][Hero][populate][Image]': 'true',
      'populate[Blocks][on][layouts.hero][populate][Hero][populate][Link]': 'true',
      'populate[Blocks][on][layouts.showcase][populate][Link]': 'true',
      'populate[Blocks][on][layouts.showcase][populate][Showcase][populate][Image]': 'true',
      'populate[Blocks][on][layouts.showcase][populate][Showcase][populate][Link]': 'true',
      'populate[Blocks][on][layouts.deals][populate][Link]': 'true',
      'populate[Blocks][on][layouts.story][populate][Story][populate][Image]': 'true',
      'populate[Blocks][on][layouts.story][populate][Story][populate][RichText]': 'true',
      'populate[Blocks][on][layouts.story][populate][Bulletin][populate][Text]': 'true',
      'populate[Blocks][on][layouts.eatery][populate][Info]': 'true',
      'populate[Blocks][on][layouts.map][populate][Map][populate][Aisle][populate][Image]': 'true',
    });
    const res = await fetch(`${getStrapiURL()}/api/homepage?${params}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const json: StrapiResponse<Homepage> = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

export async function getGlobal(): Promise<Global | null> {
  try {
    const params = new URLSearchParams({
      'populate[NavBar][populate][LogoText][populate][Logo]': 'true',
      'populate[NavBar][populate][LogoText][populate][DarkLogo]': 'true',
      'populate[NavBar][populate][LogoText][populate][Title]': 'true',
      'populate[Utility][populate][Text]': 'true',
      'populate[Announcement][populate][RichText]': 'true',
      'populate[Logo]': 'true',
      'populate[Icon]': 'true',
    });
    const res = await fetch(`${getStrapiURL()}/api/global?${params}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const json: StrapiResponse<Global> = await res.json();
    return json.data;
  } catch {
    return null;
  }
}
