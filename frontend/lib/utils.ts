import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export function getStrapiURL() {
  return process.env.STRAPI_URL ?? "http://localhost:1337";
}
export function getPublicURL() {
  return process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
}
export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  // Use NEXT_PUBLIC_STRAPI_URL for media so the browser can reach it
  const base = process.env.NEXT_PUBLIC_STRAPI_URL ?? getStrapiURL();
  return `${base}${url}`;
}