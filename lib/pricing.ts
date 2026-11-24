// lib/pricing.ts
// Single source of truth for all subscription and reseller prices (EUR).
//
// Conversion basis (approved, "Option A"): the original USD prices of the
// source site converted at the ECB reference rate of 11 Nov 2026
// (1 EUR = 1.1127 USD) and rounded to whole euros. Package structure,
// durations, device counts and reseller credit quantities are unchanged.
//
//   USD → EUR   1 device: 35→31  45→40  75→67
//               2 devices: 59→53  79→71 109→98
//               3 devices: 75→67 110→99 149→134
//   Reseller:   299→269  549→493  749→673

export type DeviceCount = 1 | 2 | 3;
export type PlanMonths = 3 | 6 | 12;

export const DEVICE_OPTIONS: DeviceCount[] = [1, 2, 3];
export const PLAN_MONTHS: PlanMonths[] = [3, 6, 12];

export const PRICES: Record<DeviceCount, Record<PlanMonths, number>> = {
  1: { 3: 31, 6: 40, 12: 67 },
  2: { 3: 53, 6: 71, 12: 98 },
  3: { 3: 67, 6: 99, 12: 134 },
};

export const RESELLER_PRICES = {
  starter: { credits: 10, price: 269 },
  growth: { credits: 20, price: 493 },
  pro: { credits: 30, price: 673 },
} as const;

const eur = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' });
const eurWhole = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** "€ 67" for whole amounts, "€ 5,58" otherwise (nl-NL formatting). */
export const formatEUR = (amount: number) =>
  Number.isInteger(amount) ? eurWhole.format(amount) : eur.format(amount);

/** Always two decimals: "€ 67,00". Used where amounts must line up. */
export const formatEURExact = (amount: number) => eur.format(amount);

/** Monthly equivalent, rounded to cents. */
export const monthlyPrice = (devices: DeviceCount, months: PlanMonths) =>
  Math.round((PRICES[devices][months] / months) * 100) / 100;

/**
 * Saving of a plan versus buying the 3-month plan repeatedly for the same
 * period (e.g. 12 months vs 4 × 3 months), as a whole percentage.
 */
export const savingPercent = (devices: DeviceCount, months: PlanMonths) => {
  if (months === 3) return 0;
  const viaShortPlans = PRICES[devices][3] * (months / 3);
  return Math.round((1 - PRICES[devices][months] / viaShortPlans) * 100);
};

/** Lowest advertised price (the 1-device, 3-month plan). */
export const LOWEST_PRICE = PRICES[1][3];

/** Schema.org price string: "31.00". */
export const schemaPrice = (amount: number) => amount.toFixed(2);

export const deviceLabel = (n: number) => (n === 1 ? '1 apparaat' : `${n} apparaten`);
export const monthsLabel = (n: number) => `${n} maanden`;
