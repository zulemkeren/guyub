# Guyub — Business Plan

> One-line pitch: *An SaaS platform that replaces Indonesia's paper-based
> neighborhood administration (RT/RW) with WhatsApp-first digital
> workflows.*

---

## 1. Problem

Indonesia has **~750,000 Rukun Tetangga (RT)** — the smallest
administrative unit, typically 30–60 households per RT. Every RT handles:

- **Citizen records** (data warga, KK, KTP) — usually a paper ledger
- **Finances** (cash, monthly dues, RT income/expenses) — typically Excel or paper
- **Communication** (announcements, patrol schedules, community news) — bulletin board + WhatsApp groups
- **Administrative letters** (domicile letters, poverty letters) — handwritten, physically signed

**Core pain points:**

1. **Error-prone** — handwriting errors, misplaced ledgers, lost data
2. **Slow** — residents wait hours or days for a single letter
3. **Uneven reach** — announcements on bulletin boards miss busy residents
4. **Reporting burden** — monthly financial reports take 4–8 hours of Bendahara's time
5. **Knowledge loss** — when Pak RT leadership changes, records often don't transfer cleanly

**Validated in:** RT 003 / RW 007 Purwokerto (189 residents, 52 KK).
Informal interviews with 12 neighboring RTs show the same pattern.

---

## 2. Solution

**Guyub** — a SaaS platform that digitalizes all four core RT workflows:

| Feature | Replaces |
|---|---|
| Data warga + KK database | Paper ledger |
| Kas & iuran tracking | Excel / notebooks |
| Announcements via WhatsApp | Bulletin board |
| Digital surat pengantar | Handwritten letters |
| Ronda / kerja bakti scheduling | Rotating paper roster |

**Differentiators (not copy-paste from enterprise SaaS):**

1. **WhatsApp-first** — residents interact entirely through WhatsApp; no
   new app to install. This is the killer feature for Indonesian
   mass-market.
2. **QRIS iuran integration** — residents scan QRIS to pay monthly dues,
   transactions auto-recorded in RT ledger.
3. **Offline-first PWA** — works on 3G, low-end Android, and 3MB total.
4. **UU PDP compliant** — Indonesian data residency, per-role access
   control (Pak RT, Bendahara, Sekretaris, Warga).
5. **PDF reports auto-generated** — monthly financial reports delivered
   to Bendahara's WhatsApp on the 1st of each month.

---

## 3. Market Size

### Bottom-up

| Segment | Count | Realistic conversion | Monthly ARPU | TAM |
|---|---|---|---|---|
| RT in Indonesia | 750,000 | 5% (10-year) | Rp 49,000 | Rp 1.84 B/mo |
| RW in Indonesia | 290,000 | 2% (10-year) | Rp 500,000 | Rp 2.9 B/mo |
| Kelurahan | 83,000 | 1% | Rp 2,500,000 | Rp 2.075 B/mo |

**Combined TAM: Rp 6.8 Billion/month** (≈ US$430M/year)
**Realistic SAM (5-year): Rp 500M MRR** (≈ US$3.8M ARR)

### Top-down

- Indonesia gov't "Smart City" / "Desa Digital" initiatives allocated
  Rp 5+ trillion in Dana Desa IT budget (2020–2024)
- 83,000 villages × avg Rp 60M IT budget = large addressable pool for B2G

### Comparable exits / valuations

- **Glean** (enterprise search, US): $4.6B valuation on ~$50M ARR
- **Qlue** (Indonesian smart city): est. $50–100M valuation
- **Pintu** (local fintech): $600M valuation
- Indonesian vertical SaaS multiples: 8-15x ARR

---

## 4. Business Model

### Subscription tiers

| Tier | Price | Target | Features |
|---|---|---|---|
| **Rukun (Free)** | Rp 0 | RT ≤50 KK | Data warga, pengumuman, ronda |
| **Guyub** | Rp 49,000/mo | RT standard | + unlimited KK, laporan, surat |
| **Sejahtera** | Rp 99,000/mo | RT aktif | + QRIS, tombol darurat, analytics |
| **RW / Kelurahan** | Rp 500,000/mo per 10 RT | Multi-RT | White-label, dashboard |
| **Pemkot / Pemkab** | Custom | B2G | City-wide deployment |

### Secondary revenue

1. **QRIS transaction fee** — 0.5% of each iuran payment via Guyub QRIS.
   At Rp 50K/KK × 50 KK × 1,000 RTs = Rp 12.5M/month (scales automatically)
2. **UMKM directory ads** — local businesses pay Rp 25K/month to be
   listed in RT directory. At 10 UMKM × 1,000 RTs = Rp 250M/month
3. **Pemkot licensing** — city-wide deals (Rp 30–200M per city annually)

### Unit economics (at steady state)

- **CAC** (customer acquisition cost): Rp 75,000 per paid RT (word-of-mouth + paid social)
- **ARPU**: Rp 65,000/month (blended paid tiers)
- **Gross margin**: 85% (cloud hosting is the only COGS)
- **Payback period**: 1.2 months
- **LTV/CAC**: 13x at 24-month retention

---

## 5. Go-to-Market

### Phase 1: Purwokerto pilot (Month 1–6)
- Launch in founder's own RT (RT 003 / RW 007, 189 residents)
- Expand to 10 neighboring RTs via warm intros from Pak RT
- Target: 10 pilot RTs, 500+ active residents, Rp 0 MRR (all free)
- **Goal: product-market fit validation**

### Phase 2: Banyumas regency (Month 7–12)
- Partner with Pak RW + Pak Lurah level
- Launch paid Guyub tier to pilots that want advanced features
- Target: 50 RTs paid (Rp 49K-99K), Rp 3-5 juta MRR
- **Goal: first revenue, proven repeatability**

### Phase 3: Jawa Tengah expansion (Month 13–18)
- Launch in Banjarnegara, Cilacap, Banyumas, Kebumen
- Apply to 1000 Startup Digital, Block71, Indigo
- Hire 1 part-time CSM, 1 community manager
- Target: 200 RTs, Rp 15-20 juta MRR
- **Goal: raise pre-seed $150K-300K**

### Phase 4: National rollout (Year 2)
- Multi-city launch: Jogja, Solo, Malang, Bandung
- B2G deal with 1st pilot Pemkot (e.g. Purwokerto)
- Target: 1,000 RTs, Rp 100 juta MRR
- **Goal: Seed round $500K–1M**

### Growth loops (organic, not paid)

1. **WhatsApp virality** — resident sees "sent via Guyub" footer on RT
   announcement → DMs the brand → adopts in their RT
2. **Neighborhood effect** — Pak RT 003 tells Pak RT 002 over kopi
   (insanely high trust propagation in Indonesian neighborhoods)
3. **Kelurahan adoption** — if 3/10 RTs under a kelurahan adopt, Pak
   Lurah often mandates for remaining 7
4. **Student ambassadors** — university-age warga who're tech-literate
   become internal advocates ("I set up this app for our RT")

### Channels (paid, later)

- Facebook/Instagram Ads (regional targeting by kelurahan name)
- TikTok creator partnerships (RT digitalization content)
- B2G: tenders through LPSE, direct outreach to Diskominfo

---

## 6. Competition

### Direct competitors

| Competitor | Strengths | Weaknesses |
|---|---|---|
| **eRT/RW (Kominfo)** | Government-backed, free | Poor UX, closed ecosystem, not WhatsApp-native |
| **Qlue** | Smart city suite, enterprise | B2G only, expensive, no RT-level product |
| **Kelurahan.id** | Some kelurahan use | Incomplete features, no multi-tenancy |
| **Custom/local dev** | Tailored to 1 RT | Not scalable, no support, bespoke |

### Indirect competitors

- **WhatsApp Groups** — what most RTs use today (hard to beat habit)
- **Google Forms + Sheets** — tech-savvy Pak RTs DIY this

### Our moat

1. **Speed of iteration** — we ship weekly based on Pak RT feedback, gov't solutions ship yearly
2. **WhatsApp-native** — competitors require app install, we ride WA habit
3. **Founder-market fit** — founder lives the problem, ships user-centered features
4. **Local trust** — Purwokerto-first builds hyperlocal credibility that scales

---

## 7. Team

**Founder:** Zulmi Mustaqiem
- Role: CEO + Full-stack Engineer
- Background: CS undergrad, built prior RT app as thesis (PHP/CodeIgniter)
- Strengths: Technical execution, bilingual (ID/EN), Purwokerto-native
- Gaps to fill: Sales, partnerships, operations

**To hire in Phase 2 (Month 7-12):**
- 1 Community Manager / CSM (part-time, Rp 3-5M/month)
- 1 Part-time designer (project basis)

**To hire in Phase 3-4:**
- Co-founder or CTO
- Sales lead for B2G
- 2 engineers

**Advisory (to approach):**
- 1 former Pak RT / RW who understands government cycles
- 1 product leader from Indonesian SaaS (Mekari, Jurnal, Talenta alum)
- 1 fintech operator (for QRIS integration)

---

## 8. Financials (24-month projection)

### Costs (monthly, averaged)

| Line item | Month 1-6 | Month 7-12 | Month 13-24 |
|---|---|---|---|
| Founder living expenses | Rp 3M | Rp 3M | Rp 5M |
| Cloud infrastructure | Rp 0 (free tier) | Rp 500K | Rp 3M |
| Hired CSM | - | Rp 4M | Rp 6M |
| Marketing | Rp 0 | Rp 500K | Rp 5M |
| Legal / entity | Rp 300K | Rp 300K | Rp 1M |
| Misc | Rp 500K | Rp 1M | Rp 2M |
| **Total** | **Rp 3.8M/mo** | **Rp 9.3M/mo** | **Rp 22M/mo** |

### Revenue projection

| Month | Paid RTs | MRR | ARR |
|---|---|---|---|
| 6 | 0 (pilot only) | Rp 0 | Rp 0 |
| 12 | 50 | Rp 3-5M | Rp 36-60M |
| 18 | 200 | Rp 12-18M | Rp 144-216M |
| 24 | 500 | Rp 35-50M | Rp 420M-600M |

### Funding milestones

- **Month 1-6**: Bootstrap + bootstrap's savings (Rp 25-30M total)
- **Month 6-12**: Optional pre-seed from friends/family/angel (Rp 150M)
- **Month 12-18**: Pre-seed round $150K-300K (SEA angels, Indonesian VC)
- **Month 18-24**: Seed round $500K-1M (if PMF clear)

---

## 9. Key Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Pak RT community resistance to tech | High | WhatsApp-first + hands-on onboarding + local champion |
| Data breach / privacy incident | Medium | Strong encryption, UU PDP compliance, Indonesian data residency |
| Gov't launches competing free product | Medium | Out-execute on UX; focus on RT-level while gov focuses on kelurahan |
| Founder burnout (solo) | High | Bring co-founder by Month 12 |
| QRIS / payment integration blocked | Low | Start with manual cash logging; QRIS is upsell, not core |
| Big tech clones product | Low initially, high later | Network effects + local trust moat |

---

## 10. North Star Metrics

- **Active RTs** (weekly active, 80%+ of admin ops done in-app)
- **Resident reach** (% of warga receiving at least 1 WA message via Guyub/month)
- **Time saved per Bendahara** (hours/month saved on reporting — target: 5+ hours)
- **NPS** (target: 50+ with Pak RTs)

---

## 11. What "Winning" Looks Like (5-Year)

- 10,000+ RTs on Guyub (1.3% of Indonesian total)
- Rp 8-12 billion ARR
- Present in 20+ Indonesian cities
- B2G deals with 5+ Pemkot
- QRIS transactions processed: Rp 500M+/month
- 50+ person team
- Series A raised ($5-10M)

---

## 12. Why Now?

1. **WhatsApp penetration**: 90%+ of Indonesian adults use WA daily (vs.
   <30% who install new apps easily)
2. **QRIS mandate**: Bank Indonesia requires all payment systems to
   support QRIS by 2025
3. **UU PDP (2022)**: Law forces digitalization with proper privacy,
   but no vendor serves RT-level
4. **Dana Desa IT budget**: 2024–2028 budgets explicitly mention digital RT/RW
5. **Generational turnover**: Pak RTs aged 60+ retiring, new Pak RTs are
   45-year-olds fluent with smartphones and expect digital tools
6. **Post-COVID behavior shift**: Residents expect announcements on WA,
   not mading

---

## Appendix: Competitive pricing context

| Product | Monthly price | Users |
|---|---|---|
| Google Workspace Business | Rp 120K/user | 7B worldwide |
| Microsoft 365 Business Basic | Rp 90K/user | 1.2B worldwide |
| Jurnal (Indonesian SaaS) | Rp 199K-899K/mo | 50K+ businesses |
| Mekari Talenta | Rp 30K/employee | 35K+ businesses |
| **Guyub Guyub tier** | Rp 49K/mo/**RT** | Target: 100K+ RTs |

Guyub's price is 2-10x cheaper than SaaS per comparable unit because
we target price-sensitive RTs, not businesses. The model only works
at scale (10K+ RTs), which is feasible given 750K TAM.
