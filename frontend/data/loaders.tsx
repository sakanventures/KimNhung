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

interface StrapiMedia {
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
  Text: string;
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
