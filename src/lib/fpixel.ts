export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "2121644675403269";

const isDev = process.env.NODE_ENV === "development";

/**
 * Track a page view.
 */
export const pageview = () => {
  if (isDev) {
    console.log("🌸 [Meta Pixel] PageView tracked");
  }
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "PageView");
  }
};

/**
 * Track a custom or standard conversion event.
 */
export const event = (name: string, options = {}) => {
  if (isDev) {
    console.log(`🌸 [Meta Pixel] Event "${name}" tracked with options:`, options);
  }
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", name, options);
  }
};
