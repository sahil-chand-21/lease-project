<![CDATA[# DESIGN.md

## Almora Zila Panchayat Rental Management System — Visual Design System

**Bilingual (English + Hindi) Government Revenue Collection Portal**

| Field | Detail |
|---|---|
| **Document Version** | 1.0 |
| **Status** | Draft Baseline |
| **Companion Documents** | PRD.md, SECURITY.md |
| **Component Inspiration** | reui.io (component structure & interaction patterns), ui.aceternity.com (motion & visual flourishes) — adapted, not copied, to stay government-appropriate |
| **Motion Library** | Framer Motion |

> **Note:** Explicitly avoided: purple as a primary/accent color, heavy glassmorphism (frosted blur panels), and generic templated "SaaS dashboard" looks. This system should read as modern, official, and distinctly Indian — not like a startup landing page.

---

## 1. Design Direction

The portal should feel modern, trustworthy, official, and distinctly Indian without looking like a generic government template — and without looking like a generic dark-glass SaaS template either.

**Core visual idea:** Deep Navy + White as the structural foundation, with Blue, Orange, Green, Maroon and Cream used deliberately, by meaning, not decoration.

**Design personality:**
- Confident and official, like a modern digital-India government portal (UMANG, DigiLocker, NPS) — not a corporate fintech app
- Clean surfaces with intentional depth (soft shadows and 1px borders), not blur/frost effects
- Motion that feels precise and purposeful (Framer Motion easing, staggered reveals), not bouncy or playful
- Generous white space; color is used to direct attention, not to fill it
- **Rule:** use color by meaning. Do not use every color in every section.

---

## 2. Color Palette

| Role | Color | HEX | Primary Use |
|---|---|---|---|
| **Primary Navy** | Deep Navy | `#0B1B36` | Navbar, footer, main headings, primary UI foundation |
| **Accent Blue** | Blue | `#2563EB` | Links, active states, secondary actions, icons |
| **Surface White** | White | `#FFFFFF` | Cards, forms, main surfaces, clean space |
| **Primary CTA** | Saffron Orange | `#F97316` | Main CTA — "Pay Now", important highlights |
| **Success** | Government Green | `#15803D` | Paid, success, verified, completed |
| **Alert / Heritage**| Maroon | `#7F1D1D` | Government notices, heritage accents, critical alerts |
| **Warm Highlight** | Warm Cream | `#FFF7ED` | Hero/background highlights, information sections |
| **Body Text** | Charcoal | `#1F2937` | Body text, labels, secondary content |
| **Page Canvas** | Soft Gray | `#F8FAFC` | Page background, dashboard canvas |
| **Dividers** | Soft Border | `#E2E8F0` | Card borders, dividers, input borders |

### 2.1 Secondary / Supporting Colors (extended, by Claude)

The base palette above covers primary meaning-colors well but is thin for data-dense admin screens (charts, tags, hover states, disabled states). These extend it — same family, no purple introduced:

| Role | Color | HEX | Use |
|---|---|---|---|
| **Deep Blue (hover)**| Indigo-Navy | `#152A52` | Hover/active state for Navy elements (buttons, nav items) |
| **Sky Tint** | Pale Blue | `#DBEAFE` | Info badges, selected-row highlight, chart fill |
| **Amber (secondary status)** | Amber | `#B45309` | "Due soon" / partial-payment status, distinct from full Orange CTA |
| **Sage Tint** | Pale Green | `#DCFCE7` | Success badge background (paired with `#15803D` text) |
| **Rose Tint** | Pale Maroon | `#FEE2E2` | Error/alert badge background (paired with `#7F1D1D` text) |
| **Muted Text** | Slate | `#64748B` | Placeholder text, timestamps, secondary metadata |
| **Chart Neutral** | Stone | `#94A3B8` | Non-highlighted chart series, gridlines |

---

## 3. Color Distribution

| Category | Share | Purpose |
|---|---|---|
| **White / light neutrals** | ~50–60% | Keep the interface clean and legible |
| **Navy + Blue** | ~15–20% | Establish government/brand identity |
| **Cream** | ~10–15% | Warmth in hero and information areas |
| **Orange** | Small, reserved | Primary calls to action only |
| **Green** | Status only | Success / paid / verified states |
| **Maroon** | Small accent | Notices, heritage elements, special messaging |

---

## 4. Typography System

Two English fonts and two Hindi fonts, each with a clear, non-overlapping role.

| Language | Font | Role | Where to Use |
|---|---|---|---|
| **English** | Manrope | Display / Headings | Hero H1, H2, section titles, major KPI numbers |
| **English** | Inter | UI / Body | Body text, navbar, buttons, forms, tables, labels, numbers |
| **Hindi** | Noto Serif Devanagari | Display / Headings | Hindi hero headings, section titles, important government messaging |
| **Hindi** | Noto Sans Devanagari | UI / Body | Hindi body text, navigation, forms, buttons, tables, labels |

```css
--font-display-en: 'Manrope', sans-serif;
--font-body-en: 'Inter', sans-serif;
--font-display-hi: 'Noto Serif Devanagari', serif;
--font-body-hi: 'Noto Sans Devanagari', sans-serif;
```

---

## 5. Typography Scale

| Element | Size | Weight | Font |
|---|---|---|---|
| **H1 / Hero** | 40–48 px | 700 Bold | Manrope / Noto Serif Devanagari |
| **H2** | 28–32 px | 600–700 | Manrope / Noto Serif Devanagari |
| **H3** | 20–24 px | 600 | Manrope / Noto Serif Devanagari |
| **Body** | 16 px | 400 | Inter / Noto Sans Devanagari |
| **Label** | 14 px | 500–600 | Inter / Noto Sans Devanagari |
| **Button** | 15–16 px | 600 | Inter / Noto Sans Devanagari |
| **Small / Caption** | 12–13 px | 400–500 | Inter / Noto Sans Devanagari |

---

## 6. Component Color Rules

| Component | Background | Text | Use |
|---|---|---|---|
| **Primary Button** | `#0B1B36` (hover `#152A52`) | White | Login, Submit, Continue |
| **Pay Revenue CTA** | `#F97316` | White | High-priority payment action |
| **Secondary Button** | `#FFFFFF`, 1px Navy border | `#0B1B36` | Secondary actions |
| **Active Navigation**| `#2563EB` | White (on Navy) / Navy (on White) | Current page/menu state |
| **Success / Paid Badge**| `#DCFCE7` | `#15803D` | Payment successful, verified, completed |
| **Pending / Due Soon Badge**| `#FFF7ED` | `#B45309` | Payment pending / attention needed |
| **Error / Failed Badge**| `#FEE2E2` | `#7F1D1D` | Payment failed / critical notice |
| **Notice Banner** | `#FFF7ED` | `#0B1B36` | Government announcements and information |
| **Disabled** | `#F8FAFC`, 1px `#E2E8F0` border | `#94A3B8` | Inactive controls |

---

## 7. Bilingual Typography Rules

- Keep English and Hindi visually equivalent in hierarchy — H1 must read as H1 in both languages, at matched visual weight, not just matched pixel size
- English display → Manrope; Hindi display → Noto Serif Devanagari
- English UI/body → Inter; Hindi UI/body → Noto Sans Devanagari
- Hindi body text may run 16–18 px for comfortable readability (Devanagari needs slightly more height than Latin at the same pixel size)
- Never mix all four fonts inside one short sentence or button
- For bilingual labels where both languages matter equally, stack them on separate lines rather than side-by-side inline
- Numbers, currency values, and dates use Inter in both language modes for consistent tabular alignment
- Line-height for Hindi text should be ~1.6× (vs ~1.5× for English) to accommodate Devanagari matras
- The language toggle persists across the entire session and switches display + body fonts together, never independently

---

## 8. Motion System (Framer Motion)

Motion should feel precise and official — confident easing, short durations, purposeful reveals. Not bouncy, not decorative, never distracting from a payment flow.

| Pattern | Where | Framer Motion Approach |
|---|---|---|
| **Scroll-reveal** | Public site sections (About, Rental listings, Notices) | `whileInView` with `staggerChildren`, `y: 24 → 0`, `opacity: 0 → 1`, `duration: 0.5`, `ease: [0.22, 1, 0.36, 1]` |
| **Smooth scrolling** | Entire public site | CSS `scroll-behavior: smooth` + Lenis/Framer scroll wrapper for eased inertial scroll on long pages |
| **Hover lift** | Property cards, dashboard KPI cards | `whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(11,27,54,0.10)' }}`, spring stiffness: 300, damping: 24 |
| **Tab/route transition**| Admin dashboard panels | `AnimatePresence` with cross-fade + 8px slide, duration: 0.2 |
| **Number count-up** | KPI figures (Total Collection, Outstanding Amount) | Animated counter from 0 to final value on mount/in-view, duration: 0.8, eased |
| **Status change** | Payment status badge (Pending → Paid) | Scale-pulse `1 → 1.05 → 1` plus color cross-fade, duration: 0.3 |
| **Sticky nav shrink** | Public site navbar on scroll | Height/padding interpolated via `useScroll` + `useTransform`, not abrupt |
| **Skeleton → content** | Table/report loading | Shimmer skeleton fades out as real data fades in, never a layout jump |
| **Toast/notification** | Payment confirmation, form errors | Slide-in from top-right, duration: 0.25, auto-dismiss with progress bar |

> **Motion rules:** durations stay under 500ms for UI feedback (600–800ms only for hero/marketing reveals); no motion on payment-critical buttons that could be mistaken for a double-submit; respect `prefers-reduced-motion` by disabling non-essential animation.

---

## 9. Component Library Direction

Structure and interaction patterns are inspired by reui.io; selective visual flourishes (spotlight borders, animated gradients, bento layouts) are inspired by Aceternity UI — both re-implemented in the palette above, not used as dark-mode/purple defaults.

| Component | Direction |
|---|---|
| **Hero (public site)** | Aceternity-style layered background — a subtle animated grid or soft radial gradient in Navy/Cream, not a purple aurora or glass blur. Bold Manrope/Noto Serif Devanagari headline, Orange primary CTA, Blue secondary link |
| **Bento grid** | Used on the public "About / Services" section to group Rental, Notices, Payments, Contact into an asymmetric grid with hover-lift (Section 8), matching reui.io's card sizing conventions |
| **Cards (property, KPI, notice)** | White surface, 1px `#E2E8F0` border, 8–12px radius, soft elevation on hover — no blur/frosted background |
| **Spotlight hover border** | Reserved for the 2–3 featured elements per page (e.g., "Pay Now" CTA area, featured notice) — a thin animated Blue/Orange gradient border on hover, per Aceternity's border-beam pattern, used sparingly |
| **Navbar** | Solid Navy (`#0B1B36`), sticky, shrinks smoothly on scroll (Section 8); mobile menu slides in from the right with staggered link reveal |
| **Tables (ledger, reports)** | reui.io-style dense data table — sticky header, row hover in Sky Tint (`#DBEAFE`), zebra optional, status column uses badges (Section 6) not raw text |
| **Forms** | Floating or top-aligned labels, 1px `#E2E8F0` border → `#2563EB` border + subtle glow ring on focus (no blur), inline validation in Maroon |
| **Modals/Dialogs** | White surface, solid (not glass) backdrop at `rgba(11,27,54,0.45)`, scale+fade entrance `0.96 → 1` |
| **Marquee/ticker** | Optional on public homepage for "Latest Notices" — continuous horizontal scroll, pausable on hover, per reui.io ticker pattern |

---

## 10. Layout & Spacing

| Token | Value |
|---|---|
| **Base spacing unit** | 4px (scale: 4, 8, 12, 16, 24, 32, 48, 64) |
| **Container max-width** | 1280px (public site), 1440px (admin dashboard) |
| **Card radius** | 10px |
| **Button radius** | 8px |
| **Input radius** | 8px |
| **Section vertical rhythm** | 80–120px between major public-site sections |
| **Grid** | 12-column, 24px gutter (desktop); 4-column, 16px gutter (mobile) |

---

## 11. Iconography & Imagery

- Line-style icon set (e.g., Lucide) at consistent 1.5–2px stroke weight — no filled/glyph icons mixed with line icons
- Icons inherit semantic color (Green for success, Maroon for alerts, Navy/Blue for neutral/nav) rather than being decorative
- Photography (if used on the public site) is warm-toned and documentary in style, never generic stock-corporate; illustrations, if used, stay flat/geometric in the Navy-Orange-Green palette — no gradients that drift into purple/pink

---

## 12. Accessibility

- Minimum contrast ratio 4.5:1 for body text against its background (Navy-on-White and Charcoal-on-White both pass comfortably; verify Orange-on-White for small text and use White-on-Orange for buttons instead)
- Focus states are always visible (2px `#2563EB` ring), never removed for aesthetics
- Color is never the only status signal — badges pair color with a short text label ("Paid", "Pending", "Failed")
- `prefers-reduced-motion` disables scroll-reveal and hover-lift animation, keeping instant state changes
- Devanagari text is tested at actual point sizes for legibility, not assumed equivalent to Latin at the same pixel value

---

## 13. Do's and Don'ts

| Do | Don't |
|---|---|
| Use Navy + White as the dominant structure | Default to purple/violet anywhere in the system |
| Use soft shadows and 1px borders for depth | Use frosted-glass/blur panels as a primary surface treatment |
| Reserve Orange strictly for primary CTAs | Use Orange decoratively across multiple elements per screen |
| Animate with short, precise easing | Use bouncy/elastic springs or long decorative animations |
| Keep Hindi and English typographically equal | Treat Hindi as a smaller/secondary afterthought |
| Use color + label together for status | Rely on color alone to convey payment status |

---

**Document Status:** Version 1.0 · Draft Baseline · Companion to PRD.md and SECURITY.md for the Almora Zila Panchayat Rental Management System
]]>