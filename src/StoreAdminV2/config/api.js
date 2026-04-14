/**
 * API Configuration
 *
 * ORDERS, SELLERS, BRANDS, STATISTICS → served from /public/data/ (static JSON).
 *   db.json has empty arrays for these, so we fetch directly from /data/*.json.
 *
 * PRODUCTS  → json-server (localhost:4000)
 * REVIEWS   → json-server (localhost:4000)
 * PROFILE   → json-server (localhost:4000) — persisted via PUT on edit
 */

// json-server endpoints (data lives in db.json)
const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
const PRODUCTS_BASE  = `${baseUrl}/products`;
const REVIEWS_BASE   = `${baseUrl}/reviews`;
const PROFILE_BASE   = `${baseUrl}/profile`;

export const API = {
  // ── Static JSON in /public/data/ ──────────────────────────────────────
  ORDERS:     "/data/orders.json",
  SELLERS:    "/data/sellers.json",
  BRANDS:     "/data/brands.json",
  STATISTICS: "/data/statistics.json",
  STORES:     "/data/stores.json",
  DELIVERY_PARTNERS: "/data/delivery_partners.json",

  // ── json-server (db.json) ─────────────────────────────────────────────
  PRODUCTS: `${PRODUCTS_BASE}/products.json`,
  REVIEWS:  `${REVIEWS_BASE}`,
  PROFILE:  `${PROFILE_BASE}`,
};

// Default headers for REST endpoints
export const API_HEADERS = {
  "Content-Type": "application/json",
  // "Authorization": `Bearer ${your_token_here}`,
};
