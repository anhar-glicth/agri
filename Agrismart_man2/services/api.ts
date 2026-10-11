export const DEFAULT_API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://coupon-fool-dry-person.trycloudflare.com";

export function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    const custom = localStorage.getItem("custom_api_url");
    if (custom && custom.trim()) {
      return custom.trim().replace(/\/$/, "");
    }
  }
  return DEFAULT_API_URL.replace(/\/$/, "");
}

export function setCustomApiUrl(url: string | null) {
  if (typeof window !== "undefined") {
    if (url && url.trim()) {
      localStorage.setItem("custom_api_url", url.trim().replace(/\/$/, ""));
    } else {
      localStorage.removeItem("custom_api_url");
    }
  }
}

const BASE_URL = DEFAULT_API_URL;

export default BASE_URL;