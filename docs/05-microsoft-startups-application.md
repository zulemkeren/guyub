# Microsoft for Startups Founders Hub — Application Draft

> **Submit this after Month 3** (when you have pilot data to reference)
> **Portal:** https://foundershub.startups.microsoft.com

---

## Eligibility check

✅ Privately held company (need to incorporate as CV/PT first)
✅ Early-stage (pre-seed or bootstrapped)
✅ Has an idea + working product
✅ Building B2B software ✓ (SaaS for RT/RW/Kelurahan)
⚠️ Need Azure-related workload (use Azure for auth + hosting + some compute)

---

## Section 1: Company information

**Company name:** Guyub (PT/CV name when incorporated)
**Website:** https://guyub-rho.vercel.app (replace with guyub.app when domain purchased)
**Country:** Indonesia
**Industry:** Software as a Service — Local Government / Civic Tech
**Company stage:** Idea / MVP
**Year founded:** 2026

---

## Section 2: Founder information

**Founder name:** Zulmi Mustaqiem
**Role:** CEO & CTO (founding engineer)
**LinkedIn:** [your linkedin]
**Tech background:**
- Computer Science graduate (Universitas XXXX, Purwokerto)
- Built a previous RT management system as undergraduate thesis
  (PHP/CodeIgniter, deployed for academic defense)
- Full-stack web developer: Next.js, TypeScript, PostgreSQL, WhatsApp API
- Previously shipped OmniSearch, a production RAG application
  (omnisearch-eight.vercel.app, open-source: github.com/zulemkeren/omnisearch)

---

## Section 3: What are you building?

**One-sentence description:**
Guyub is an SaaS platform that replaces Indonesia's paper-based
neighborhood administration (Rukun Tetangga — RT) with WhatsApp-first
digital workflows for citizen records, finances, announcements, and
administrative letters.

**What problem are you solving?**

Indonesia has ~750,000 RTs (smallest administrative units, 30–60
households each). Every one of them still manages residents, finances,
and communication using paper ledgers and bulletin boards. This leads to:

- Data errors and losses (handwritten ledgers)
- 4–8 hours/month wasted by RT treasurers on manual reporting
- Residents missing critical announcements (bulletin boards miss the
  busy 70%)
- Day-long delays for simple administrative letters

This problem affects roughly 150 million Indonesians daily, yet no
modern SaaS vendor has built for it. Government-built solutions exist
(eRT/RW by Kominfo) but have poor UX and near-zero adoption.

**Why Guyub?**

1. **WhatsApp-first** — residents interact via WhatsApp (98% adoption),
   not a new app install. This is the killer differentiator for
   Indonesian mass-market deployment.
2. **QRIS iuran integration** — residents pay monthly dues via QRIS
   (Bank Indonesia standard); transactions auto-record in RT ledger.
3. **Offline-first PWA** — works on 3G networks and 3MB PWA size,
   critical for rural RTs.
4. **UU PDP compliant** — data residency in Indonesia, per-role access
   control matching RT/RW hierarchy.
5. **Founder-market fit** — founder lives the problem (active resident
   in RT 003 Purwokerto); ships features informed by daily reality.

**Current status (as of application date):**

- MVP live: guyub-rho.vercel.app
- Pilot deployed to RT 003 / RW 007 Purwokerto (189 residents, 52 KK)
- Pak RT endorsement + active weekly usage since [Month]
- [X] active warga, [Y] transactions processed, [Z] surat pengantar issued

---

## Section 4: Market opportunity

**Target market:**
- Primary: 750,000 RTs in Indonesia (30-60 households each, 150M total residents)
- Secondary: 290,000 RWs (umbrella admin for 3-5 RTs each)
- Tertiary: 83,000 kelurahan / desa + 514 kabupaten/kota (B2G path)

**TAM / SAM / SOM:**

- **TAM:** Rp 6.8 B/month (US$5.2M MRR / US$62M ARR) — if 5% adoption at Rp 49K/mo
- **SAM (5-year):** Rp 500M MRR (US$3.8M ARR) — realistic 0.5% adoption + some RW/kelurahan tier
- **SOM (Year 1):** Rp 15-20M MRR — 200 RTs in Banyumas regency

**Competitive landscape:**

| Competitor | Position | Guyub's edge |
|---|---|---|
| eRT/RW (Kominfo) | Government-built, free but unused | Better UX, WhatsApp-first, fast iteration |
| Qlue | Smart city enterprise suite | B2G only; we serve RT-level |
| Custom local dev | Bespoke for 1 RT | Not scalable; we're multi-tenant platform |
| WhatsApp Groups | What most RTs use today | We layer structured data on top of WA |

**Defensibility:**
1. Network effects at kelurahan level (when 3/10 RTs adopt, others follow)
2. High trust moat (local Purwokerto origin story)
3. Data lock-in after 6+ months of usage
4. Growing switching cost as RTs accumulate records

---

## Section 5: Traction

**Current metrics (update before submission):**

- **Deployments:** 1 active RT (pilot)
- **Active users:** [X] Pak RTs, [Y] Bendaharas, [Z] warga
- **Transactions processed:** Rp [X] in iuran
- **WhatsApp messages delivered:** [X]
- **Surat pengantar digitized:** [X]
- **Waitlist:** [X] neighboring RTs (gathered from Pak RT intros)

**Paying customers:** 0 (pilot is free; begins charging at Month 7)

**Pipeline:**
- 10 RTs in Purwokerto committed to pilot in next 3 months
- Conversation with Pak RW level for multi-RT deployment
- Partnership exploration with [name] Pemkot / Diskominfo

**Testimonial (from Pak Budi, RT 003 Ketua):**
> "Dulu saya coret-coret buku tiap kali salah tulis. Sekarang input
> data warga dari HP. Bendahara juga bilang laporan bulanan lebih
> cepat 10x." (translation: "Before, I'd scratch out my book whenever
> I misspelled something. Now I enter resident data from my phone.
> My treasurer also says the monthly reports are 10x faster.")

---

## Section 6: Why Microsoft / Azure?

**Planned Azure usage:**

1. **Azure App Service** — host Next.js app (or use Static Web Apps)
2. **Azure Database for PostgreSQL** — primary database with
   built-in encryption, backup, replication
3. **Azure OpenAI Service** — for the WhatsApp bot's natural language
   understanding (parse warga queries: "saldo iuran saya?" → query DB)
4. **Azure Blob Storage** — for foto warga, PDF laporan, lampiran surat
5. **Azure Communication Services** — WhatsApp API integration via MSFT
6. **Azure Logic Apps** — cron jobs for monthly PDF generation
7. **Azure Monitor + Application Insights** — ops monitoring

**Why Azure specifically:**
- Data residency in Southeast Asia (Jakarta region available)
- Compliance with UU PDP easier with Microsoft's established audit
  certifications (ISO 27001, SOC 2)
- Microsoft's partnership with Indonesian government (Kemendagri,
  Kominfo) aligns with our B2G expansion thesis
- Azure OpenAI gives us AI capabilities without needing OpenAI API
  separately

**How credits help:**
- Current runway is bootstrapped (Rp 25M). Every Rp of infrastructure
  cost delays hitting revenue milestones.
- Credits would fund 12-18 months of infrastructure at our expected
  scale (200-500 RTs), letting us focus 100% of cash on pilot expansion
  and customer success.

---

## Section 7: Ask

**Requested tier:** Ideate (can upgrade to Develop once we have
50+ active RTs showing weekly engagement)

**Specifically requesting:**
- $1,000 Azure credits (3-6 months infrastructure runway)
- $2,500 Azure OpenAI credits (for WhatsApp bot features)
- GitHub Enterprise access (for CI/CD and code review)
- 1:1 access to Microsoft mentor (particularly someone with civic tech
  / Asian market experience)

**Milestones we commit to hit with this support:**
- Month 3: 10 RTs live on Guyub (Banyumas regency)
- Month 6: First paying customer + Rp 1M MRR
- Month 9: 50 RTs live + Rp 5M MRR

---

## Section 8: Anything else?

**Why this matters (personal):**

My own neighborhood (RT 003 / RW 007 Purwokerto) has used paper ledgers
for at least 20 years. My grandfather was a Pak RT before me; I watched
him lose months of records when a ledger got damaged by rain in 2018.

I don't want the next generation of Pak RTs in Indonesia to lose data,
waste weekends on manual reports, or fail to reach residents who don't
check the bulletin board. 150 million people deserve better.

I'm committing the next 3 years minimum to this.

---

## Post-submission checklist

- [ ] Incorporate as CV (minimum) or PT (ideal) before submitting —
      ~Rp 2-5 juta, 2-3 weeks
- [ ] Buy guyub.app or guyub.id domain
- [ ] Migrate deployment to Azure (replace Vercel for application layer)
- [ ] Prepare 2-minute pitch video (can film on phone)
- [ ] Update metrics section with real pilot data
- [ ] Have 2-3 Pak RT testimonials recorded
- [ ] Be ready to do a 15-30 min interview with Microsoft Startups team
