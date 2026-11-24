// @/lib/reviews.ts
//
// Customer reviews shown on /reviews.
//
// ⚠️ The source project contained 20 named US "customer" reviews plus fixed
// statistics (4.9 average, 1,255 reviews, 50,000+ customers, 98% recommend).
// None of these could be verified, so they were removed. Add only genuine,
// verifiable reviews from real IPTVAbonnement customers here (with their
// consent). While the list is empty the /reviews page shows an empty state and
// is set to noindex, and no rating statistics or Review/AggregateRating
// structured data are published.

export interface Review {
  id: string;
  /** First name + initial, as approved by the customer. */
  name: string;
  /** Optional place of residence, only if the customer agreed to publish it. */
  city?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  text: string;
  /** ISO date "YYYY-MM-DD" on which the review was received. */
  date: string;
  device?: string;
}

export const reviews: Review[] = [];

export const REVIEW_FAQS: { q: string; a: string }[] = [
  {
    q: 'Waarom staan hier nog geen reviews?',
    a: 'We publiceren alleen echte reviews van klanten die daar toestemming voor geven. Zodra die er zijn, vind je ze op deze pagina.',
  },
  {
    q: 'Hoe kan ik zelf beoordelen of het bij me past?',
    a: 'Vraag via WhatsApp de gratis proefperiode van 24 uur aan. Dan test je de beeldkwaliteit, het aanbod en de werking op je eigen apparaat voordat je iets betaalt.',
  },
  {
    q: 'Hoe kan ik een review achterlaten?',
    a: 'Stuur je ervaring via WhatsApp. Laat erbij weten of we je review (met voornaam en eerste letter van je achternaam) op de website mogen plaatsen.',
  },
];
