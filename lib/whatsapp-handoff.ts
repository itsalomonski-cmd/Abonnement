// lib/whatsapp-handoff.ts
//
// Hands a visitor's own text (contact form, chat widget) over to WhatsApp
// WITHOUT putting it in a URL. Personal data such as names, e-mail addresses
// and questions never travel in a query string: the text is copied to the
// visitor's clipboard locally and the plain WhatsApp chat is opened, where the
// visitor pastes and sends it. Nothing is sent by this website itself, so the
// UI must never claim that a message was delivered.
//
// Client-side only: call it from an event handler (click / submit), because
// browsers only allow window.open() and clipboard writes during a user gesture.
import { CONSTANTS, WHATSAPP_AVAILABLE } from './seo';

export type HandoffResult = {
  /** False when WhatsApp is not configured or the browser blocked the new tab. */
  opened: boolean;
  /** Resolves to true when the text was placed on the clipboard. */
  copied: Promise<boolean>;
};

export function handOffToWhatsApp(text: string): HandoffResult {
  if (!WHATSAPP_AVAILABLE) {
    return { opened: false, copied: Promise.resolve(false) };
  }

  // Start the clipboard write first, while the page still has focus.
  const copied: Promise<boolean> =
    typeof navigator !== 'undefined' && navigator.clipboard?.writeText
      ? navigator.clipboard.writeText(text).then(
          () => true,
          () => false
        )
      : Promise.resolve(false);

  const win = window.open(CONSTANTS.CONTACT.whatsappUrl, '_blank');
  if (win) win.opener = null;

  return { opened: Boolean(win), copied };
}
