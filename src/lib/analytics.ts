// Google Analytics helper functions

type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID!, {
      page_path: url,
    });
  }
};

// Track events
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track artwork views
export const trackArtworkView = (artworkId: string, artworkTitle: string) => {
  event({
    action: "view_item",
    category: "artwork",
    label: artworkTitle,
  });
};

// Track add to cart
export const trackAddToCart = (
  artworkId: string,
  artworkTitle: string,
  price: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "add_to_cart", {
      currency: "EUR",
      value: price,
      items: [
        {
          item_id: artworkId,
          item_name: artworkTitle,
          price: price,
          quantity: 1,
        },
      ],
    });
  }
};

// Track purchase
export const trackPurchase = (
  transactionId: string,
  items: { id: string; title: string; price: number }[],
  total: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: transactionId,
      currency: "EUR",
      value: total,
      items: items.map((item) => ({
        item_id: item.id,
        item_name: item.title,
        price: item.price,
        quantity: 1,
      })),
    });
  }
};

// Track contact form submission
export const trackContactSubmit = () => {
  event({
    action: "generate_lead",
    category: "contact",
    label: "contact_form",
  });
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js",
      targetIdOrAction: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
