'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, X } from 'lucide-react';
import { CONSTANTS, WHATSAPP_AVAILABLE, whatsappUrl } from '@/lib/seo';

// Longest message accepted by the widget. Keeps the prefilled WhatsApp link
// well within URL length limits of browsers and the WhatsApp apps.
const MAX_MESSAGE_LENGTH = 1000;


function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Presentational pieces live at module scope so React keeps a stable component
// identity across renders (defining them inside the component remounts them).
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="white"
    className="w-7 h-7 md:w-8 md:h-8"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.448 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const SupportProfilePic = () => (
  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-white/20">
    <img
      src="/img/profile.webp"
      alt={`${CONSTANTS.BRAND_NAME} klantenservice`}
      width={40}
      height={40}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>
);

const BUBBLE_SEEN_KEY = 'iptvabonnement-help-bubble-seen';
const BUBBLE_DELAY_MS = 3000;
const BUBBLE_VISIBLE_MS = 6000;

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'support',
      text: `Hallo! Waarmee kunnen we je helpen met ${CONSTANTS.BRAND_NAME}?`,
      time: getCurrentTime(),
    },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Show the "Need help?" bubble once per browser session: it appears after a
  // short delay, stays for a few seconds, then hides for good. (It used to
  // reappear every 10 seconds, which repeatedly interrupted visitors.)
  // sessionStorage can be unavailable (private mode, blocked storage); in that
  // case the bubble simply shows once per page load.
  useEffect(() => {
    // Widget is not rendered without a verified number: store nothing.
    if (!WHATSAPP_AVAILABLE) return;
    try {
      if (sessionStorage.getItem(BUBBLE_SEEN_KEY) === '1') return;
    } catch {
      // storage unavailable: fall through and show once
    }

    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    const showTimer = setTimeout(() => {
      setShowBubble(true);
      try {
        sessionStorage.setItem(BUBBLE_SEEN_KEY, '1');
      } catch {
        // ignore
      }
      hideTimer = setTimeout(() => setShowBubble(false), BUBBLE_VISIBLE_MS);
    }, BUBBLE_DELAY_MS);

    return () => {
      clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  useEffect(() => {
    if (!open) return;
    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(focusTimer);
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      // Return focus to the launcher when closing from inside the chat window.
      const focusWasInside = dialogRef.current?.contains(document.activeElement) ?? false;
      setOpen(false);
      if (focusWasInside) fabRef.current?.focus();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const [error, setError] = useState('');
  // Last WhatsApp link opened, offered as a manual link in case the browser
  // blocked the new tab.
  const [lastUrl, setLastUrl] = useState('');

  // Opens WhatsApp with the visitor's exact message prefilled (owner decision,
  // 24 Nov 2026), via the same central destination as the pricing cards
  // (whatsappUrl in lib/seo.ts, which URL-encodes the text). Nothing is sent
  // by this website: the visitor reviews the message in WhatsApp and sends it
  // there, and the confirmation below says exactly that.
  const sendToWhatsapp = () => {
    if (!message.trim()) {
      setError('Typ eerst je bericht.');
      inputRef.current?.focus();
      return;
    }
    setError('');

    const typed = message;
    const url = whatsappUrl(typed);
    // Opened synchronously inside the click/Enter so pop-up blockers allow
    // it. Without the "noopener" feature window.open() returns the window,
    // which tells us whether it was blocked; the opener link is cut manually.
    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    setLastUrl(url);

    setChatHistory((prev) => [
      ...prev,
      { sender: 'user', text: typed, time: getCurrentTime() },
      {
        sender: 'support',
        text: win
          ? 'WhatsApp is geopend met je bericht. Controleer het en tik daar op Verzenden.'
          : 'WhatsApp kon niet automatisch worden geopend. Gebruik de link hieronder.',
        time: getCurrentTime(),
      },
    ]);
    setMessage('');
  };

  // No verified WhatsApp number yet (lib/seo.ts): do not show a chat launcher
  // that cannot reach anyone.
  if (!WHATSAPP_AVAILABLE) return null;

  return (
    <div className="whatsapp-global-wrapper">
      {/* Auto Help Bubble */}
      {!open && showBubble && (
        <div className="fixed bottom-28 right-6 z-[30] animate-fade-in whatsapp-element">
          <div className="bg-gradient-to-r from-green-500 to-green-600 shadow-lg rounded-2xl px-4 py-2.5 text-sm font-medium text-white relative max-w-[220px] whitespace-nowrap">
            Hulp nodig? Chat met ons!
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rotate-45" />
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        ref={fabRef}
        onClick={() => {
          setOpen(!open);
          setShowBubble(false);
        }}
        className="fixed bottom-6 right-6 z-[35] group whatsapp-element"
        aria-label="Chat met ons via WhatsApp"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="whatsapp-chat"
      >
        <div className="relative">
          {!open && (
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
          )}
          <div className="relative bg-gradient-to-r from-green-500 to-green-600 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 group-hover:shadow-xl">
            <WhatsAppIcon />
          </div>
        </div>
      </button>

      {/* WhatsApp Chat Window */}
      {open && (
        <div
          className="fixed bottom-24 right-4 md:right-6 w-[340px] sm:w-[380px] max-w-[calc(100vw-32px)] rounded-3xl overflow-hidden shadow-2xl z-[34] bg-white border border-slate-200 flex flex-col max-h-[80vh] md:max-h-[500px] whatsapp-element"
          id="whatsapp-chat"
          ref={dialogRef}
          role="dialog"
          aria-label="WhatsApp-chatvenster"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 flex items-center justify-between text-white flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <SupportProfilePic />
              <div className="min-w-0">
                <h3 className="font-bold text-sm sm:text-base truncate">
                  {CONSTANTS.BRAND_NAME} klantenservice
                </h3>
                <p className="text-[10px] sm:text-xs opacity-90 truncate">
                  Je bericht wordt geopend in WhatsApp
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setOpen(false);
                fabRef.current?.focus();
              }}
              className="hover:bg-white/20 rounded-full p-1 transition flex-shrink-0"
              aria-label="Chatvenster sluiten"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto bg-slate-50 min-h-[200px] max-h-[300px] md:max-h-[350px]">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-message-in`}
              >
                {msg.sender === 'support' && (
                  <div className="flex-shrink-0 mr-2 self-end">
                    <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <img
                        src="/img/profile.webp"
                        alt="Klantenservice"
                        width={28}
                        height={28}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
                <div className={`max-w-[80%] px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-green-500 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none'
                }`}>
                  <p className="text-sm sm:text-base break-words">{msg.text}</p>
                  <span className={`block text-[10px] sm:text-xs mt-1 text-right ${
                    msg.sender === 'user' ? 'text-green-100' : 'text-gray-400'
                  }`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
            {lastUrl && (
              <a
                href={lastUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="self-center text-xs sm:text-sm font-semibold text-green-700 underline underline-offset-2 hover:text-green-800"
              >
                Opent WhatsApp niet? Open WhatsApp met je bericht
              </a>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Box */}
          <form
            className="p-3 bg-white border-t flex-shrink-0"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              sendToWhatsapp();
            }}
          >
            {error && (
              <p id="whatsapp-message-error" role="alert" className="text-xs text-red-600 font-medium mb-2 px-2">
                {error}
              </p>
            )}
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                placeholder="Typ een bericht..."
                aria-label="Je bericht"
                maxLength={MAX_MESSAGE_LENGTH}
                enterKeyHint="send"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (error) setError('');
                }}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? 'whatsapp-message-error' : undefined}
                className="flex-1 rounded-full px-4 py-2.5 sm:py-3 border border-slate-200 outline-none bg-white text-gray-700 text-sm sm:text-base placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 transition min-w-0"
              />
              <button
                type="submit"
                aria-disabled={!message.trim()}
                className={`bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-2.5 sm:p-3 rounded-full shadow-md transition-transform flex-shrink-0 ${
                  message.trim() ? 'hover:scale-105' : 'opacity-50'
                }`}
                aria-label="Open WhatsApp met dit bericht"
              >
                <Send size={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Global CSS to hide floating elements when mobile menu is open */}
      <style jsx global>{`
        body.mobile-menu-open .whatsapp-element {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes message-in {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-message-in { animation: message-in 0.2s ease-out; }
      `}</style>
    </div>
  );
}