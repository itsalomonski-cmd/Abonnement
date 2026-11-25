'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  Clock,
  Tag,
  Sparkles,
  Zap,
  MessageCircle,
  Flame,
  Crown,
  CheckCircle2,
} from 'lucide-react';
import { CONSTANTS, whatsappUrl, WHATSAPP_LINK_TARGET } from '@/lib/seo';
import { PRICES, formatEUR, savingPercent } from '@/lib/pricing';
import type { BlogPost } from '@/lib/blog';
import { blogImageProps, formatPostDate, getPostCategoryLabel, getPostReadMinutes } from '@/lib/blog-helpers';

const BRAND = CONSTANTS.BRAND_NAME;

// ---------------------------------------------------------------------------
// SIDEBAR
// ---------------------------------------------------------------------------
export default function ArticleScrollSidebar({
  relatedPosts,
  whatsappIboMsg,
  whatsappSubMsg,
}: {
  relatedPosts: BlogPost[];
  whatsappIboMsg: string;
  whatsappSubMsg: string;
}) {
  return (
    <aside className="lg:col-span-4 order-2 lg:order-2 lg:self-start lg:sticky lg:top-24 h-fit">
      <div className="space-y-6">
        {/* =====================================================
            Card 1 — IPTV Smarters Pro
        ===================================================== */}
        <div className="bg-[#18181B] border-2 border-[#39FF14]/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#39FF14]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 bg-[#39FF14] text-[#09090B] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
            <Flame className="w-3.5 h-3.5" /> Aanbevolen app
          </div>

          <p className="text-lg sm:text-xl font-black text-[#F8FAFC] uppercase tracking-tight mb-2">
            Hulp met IPTV Smarters Pro
          </p>
          <p className="text-[#94A3B8] text-xs sm:text-sm font-bold leading-relaxed mb-6">
            IPTV Smarters Pro is een veelgebruikte app om je abonnement op te kijken. Via WhatsApp helpen we je met de installatie.
          </p>

          <a
            href={whatsappUrl(whatsappIboMsg)}
            target={WHATSAPP_LINK_TARGET}
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-[#FFD700] text-[#09090B] font-black text-xs uppercase tracking-wider hover:bg-[#E6C200] transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Vraag hulp via WhatsApp</span>
          </a>
        </div>

        {/* =====================================================
            Card 2 — Official Plans
        ===================================================== */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#27272A] bg-[#18181B]">
          <div className="absolute inset-0 bg-[#18181B]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(57,255,20,0.10),_transparent_60%)] pointer-events-none" />
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #F8FAFC 1px, transparent 1px), linear-gradient(to bottom, #F8FAFC 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 p-6">
            <div className="inline-flex items-center gap-1.5 bg-[#39FF14] text-[#09090B] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 shadow-md">
              <Crown className="w-3.5 h-3.5" /> Abonnementen
            </div>

            <p className="text-xl sm:text-2xl font-black text-[#F8FAFC] uppercase tracking-tight mb-2 drop-shadow-md">
              {BRAND} <br />
              <span className="text-[#39FF14]">Prijzen</span>
            </p>
            <p className="text-[#94A3B8] text-xs sm:text-sm font-bold leading-relaxed mb-6">
              Live tv · films &amp; series · 3, 6 of 12 maanden · 1, 2 of 3 apparaten.
            </p>

            <div className="space-y-3">
              {/* Standard — 3 Months */}
              <div className="group bg-[#09090B] border-2 border-[#27272A] rounded-2xl p-4 hover:border-[#39FF14] hover:-translate-y-0.5 transition-all shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#39FF14]/15 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-[#39FF14]" />
                    </div>
                    <span className="text-[#F8FAFC] font-black text-sm uppercase tracking-tight">
                      Starter
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-[#F8FAFC] font-black text-xl leading-none">
                      {formatEUR(PRICES[1][3])}
                    </div>
                    <div className="text-[9px] font-black uppercase tracking-wider text-[#94A3B8] mt-0.5">
                      3 maanden · 1 apparaat
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-[#94A3B8]">
                  <CheckCircle2 className="w-3 h-3 text-[#39FF14]" />
                  <span>Installatiehulp via WhatsApp</span>
                </div>
                <a
                  href={whatsappUrl(whatsappSubMsg)}
                  target={WHATSAPP_LINK_TARGET}
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 rounded-full bg-[#FFD700] text-[#09090B] hover:bg-[#E6C200] transition-all font-black text-[10px] uppercase tracking-widest block shadow-md hover:scale-105 cursor-pointer"
                >
                  Bestel via WhatsApp
                </a>
              </div>

              {/* VIP — 12 Months */}
              <div className="group relative bg-[#09090B] border-2 border-[#FFD700] rounded-2xl p-4 hover:border-[#F8FAFC] hover:-translate-y-0.5 transition-all shadow-2xl">
                <div className="absolute -top-3 right-4 bg-[#FFD700] text-[#09090B] px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md">
                  ⭐ Voordeligst per maand
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#FFD700]/20 flex items-center justify-center">
                      <Crown className="w-4 h-4 text-[#FFD700]" />
                    </div>
                    <span className="text-[#F8FAFC] font-black text-sm uppercase tracking-tight">
                      12 maanden VIP
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-[#FFD700] font-black text-xl leading-none">
                      {formatEUR(PRICES[1][12])}
                    </div>
                    <div className="text-[9px] font-black uppercase tracking-wider text-[#94A3B8] mt-0.5">
                      1 apparaat · bespaar {savingPercent(1, 12)}%
                    </div>
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#94A3B8]">
                    <CheckCircle2 className="w-3 h-3 text-[#FFD700]" />
                    <span>Aparte VIP-serverlijn</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#94A3B8]">
                    <CheckCircle2 className="w-3 h-3 text-[#FFD700]" />
                    <span>Eerst 24 uur gratis testen</span>
                  </div>
                </div>

                <a
                  href={whatsappUrl(whatsappSubMsg)}
                  target={WHATSAPP_LINK_TARGET}
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 rounded-full bg-[#FFD700] text-[#09090B] hover:bg-[#E6C200] transition-all font-black text-[10px] uppercase tracking-widest block shadow-lg hover:scale-105 cursor-pointer"
                >
                  Bestel VIP via WhatsApp
                </a>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#27272A] text-center">
              <Link
                href="/prijzen"
                className="text-xs font-black text-[#F8FAFC] uppercase tracking-wider hover:underline inline-flex items-center gap-1 group cursor-pointer py-2 -my-2"
              >
                Bekijk alle prijzen
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#39FF14]" />
              </Link>
            </div>
          </div>
        </div>

        {/* =====================================================
            Card 3 — Related Articles
        ===================================================== */}
        {relatedPosts.length > 0 && (
          <div className="bg-[#18181B] border-2 border-[#27272A] rounded-3xl p-5 shadow-xl">
            <h2 className="text-lg font-black text-[#F8FAFC] uppercase tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#39FF14]" /> Gerelateerde artikelen
            </h2>

            <div className="space-y-4">
              {relatedPosts.map((relPost) => {
                const relCategory = getPostCategoryLabel(relPost, 'IPTV-gids');
                const relReadTime = getPostReadMinutes(relPost);
                const relDate = formatPostDate(relPost.date);

                // The link is the article title only (concise anchor text); its
                // ::after covers this card (made `relative`, no layout change),
                // so the whole card stays clickable.
                return (
                  <div
                    key={relPost.slug}
                    className="group relative block bg-[#09090B] rounded-2xl overflow-hidden border-2 border-[#27272A] hover:border-[#39FF14] hover:shadow-[0_15px_35px_rgba(57,255,20,0.15)] hover:-translate-y-1 transition-all duration-500 cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#09090B]">
                      <img
                        {...blogImageProps(relPost.image, '(max-width: 1024px) 100vw, 350px')}
                        alt={relPost.title}
                        width={400}
                        height={250}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

                      <div className="absolute top-2 left-2 z-10">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#39FF14] text-[#09090B] text-[9px] font-black uppercase tracking-wider shadow-lg">
                          <Tag className="w-2.5 h-2.5" />
                          {relCategory}
                        </span>
                      </div>

                      <div className="absolute top-2 right-2 z-10">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#18181B]/80 backdrop-blur-md text-[#F8FAFC] text-[9px] font-black uppercase tracking-wider border border-[#27272A]">
                          <Clock className="w-2.5 h-2.5" />
                          {relReadTime} min
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-[#94A3B8] mb-2">
                        <Calendar className="w-3 h-3 text-[#39FF14]" />
                        <span>{relDate}</span>
                      </div>

                      <h3 className="text-sm font-black text-[#F8FAFC] uppercase tracking-tight leading-snug mb-2 line-clamp-2 group-hover:text-[#39FF14] transition-colors">
                        <Link
                          href={`/blog/${relPost.slug}`}
                          className="after:absolute after:inset-0 after:z-20 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-[#39FF14]"
                        >
                          {relPost.title}
                        </Link>
                      </h3>

                      <p className="text-[#94A3B8] text-xs font-medium leading-relaxed line-clamp-2 mb-3">
                        {relPost.description || relPost.excerpt}
                      </p>

                      <div className="pt-3 border-t border-[#27272A] flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-[#39FF14] font-black text-[10px] uppercase tracking-widest group-hover:gap-2 transition-all">
                          Lees
                          <ArrowRight className="w-3 h-3" />
                        </span>
                        <div className="w-6 h-6 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/30 flex items-center justify-center text-[#39FF14] group-hover:bg-[#39FF14] group-hover:text-[#09090B] transition-all duration-300">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}