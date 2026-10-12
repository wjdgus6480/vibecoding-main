<!-- Stitch에서 받은 디자인 시스템 원본 (2026-10-07). 수정하지 않는다. 해석·결정은 README.md 목차와 decisions.md 참고 -->

---
name: Cheerful Delivery & Commerce
colors:
  surface: '#fbf8ff'
  surface-dim: '#dad9e3'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f2fd'
  surface-container: '#eeedf7'
  surface-container-high: '#e8e7f1'
  surface-container-highest: '#e3e1ec'
  on-surface: '#1a1b22'
  on-surface-variant: '#4f4632'
  inverse-surface: '#2f3038'
  inverse-on-surface: '#f1effa'
  outline: '#81765f'
  outline-variant: '#d2c5ab'
  surface-tint: '#765b00'
  primary: '#765b00'
  on-primary: '#ffffff'
  primary-container: '#ffc700'
  on-primary-container: '#6e5400'
  inverse-primary: '#f5bf00'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#855300'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffc47c'
  on-tertiary-container: '#7c4e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdf94'
  primary-fixed-dim: '#f5bf00'
  on-primary-fixed: '#251a00'
  on-primary-fixed-variant: '#594400'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1b1b1c'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#fbf8ff'
  on-background: '#1a1b22'
  surface-variant: '#e3e1ec'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The brand voice is witty, friendly, and unpretentious—drawing immediate inspiration from contemporary Korean quick-commerce culture. It speaks with warmth, everyday street wit, and high-energy culinary delight. The visual design language pairs functional clarity with playful punchiness: high-contrast surfaces, generous rounded corners, tactile pill-shaped badges, and energetic micro-moments. The interface balances ultra-fast decision-making with appetizing, lifestyle-centric exploration, turning mundane daily takeout ordering into a delightful, bouncy digital routine.

## Colors
The system relies on a signature sunny yellow primary (`#FFC700`), evoking joyful urgency and appetite without visual fatigue. Rich warm charcoal (`#1E1E1E`) serves as the secondary tone, anchoring buttons, crisp typography, and navigation frames with high readability. A roasted honey amber (`#F59E0B`) serves as the tertiary accent for rating stars, flash deals, and countdown badges. Surfaces default to crisp white (`#FFFFFF`) layered over an ultra-soft warm-tinted paper gray canvas (`#F8F8F6`), ensuring maximum pop for vibrant dish photography.

## Typography
Plus Jakarta Sans provides a friendly, geometric, and modern grotesque structure with naturally soft terminals, evoking the approachable and rhythmic vibe of modern Korean sans-serifs (like Pretendard and rounded display fonts). Display and headline tiers emphasize bold, punchy tracking (`-0.02em`) to inject humor and commercial urgency, while body text balances spacious line heights with balanced legibility for menus, order summaries, and vendor reviews.

## Layout & Spacing
The layout follows a 12-column responsive fluid grid centered within a maximum desktop content boundary of 1280px. For mobile and compact viewports, the grid condenses to a 4-column flow with tight 12px gutters and horizontal-scroll snap channels for merchant category carousels. Desktop views leverage the grid to present 3 to 4 store cards per row, alongside persistent order basket rails. Vertical rhythm relies strictly on the 4px/8px modular base increment, using `space-md` for standard card interiors and `space-xl` between promotional category modules.

## Elevation & Depth
Elevation favors a crisp, daylight aesthetic relying on low-diffusion warm shadows paired with delicate border containment rather than heavy dark drop shadows:
- **Level 0 (Flat):** Pure surface base (`#F8F8F6`).
- **Level 1 (Card Rest):** Background `#FFFFFF`, border `1px solid rgba(0, 0, 0, 0.04)`, shadow `0 2px 8px -2px rgba(30, 30, 30, 0.05)`.
- **Level 2 (Interactive Hover / Cart Drawer):** Background `#FFFFFF`, border `1px solid rgba(0, 0, 0, 0.06)`, shadow `0 12px 24px -6px rgba(30, 30, 30, 0.08), 0 4px 8px -2px rgba(255, 199, 0, 0.12)`.
- **Level 3 (Modals & Order Float Pill):** Shadow `0 20px 32px -8px rgba(30, 30, 30, 0.14)`.

## Shapes
A roundedness level of 2 establishes a friendly, modern geometry. Standard cards and menu items use `0.5rem` (8px) corners, interactive interactive modals and food thumbnail heroes step up to `1rem` (16px), and badges, search bars, category icon chips, and primary action buttons utilize full capsule/pill curvature (`9999px`).

## Components

### Buttons
- **Primary:** Filled `#FFC700` background, `#1E1E1E` bold label, full capsule border radius, padding `12px 24px`. Micro-hover: subtle scale (`1.02`) and soft brightness shift.
- **Secondary / Action:** Solid charcoal `#1E1E1E` background with `#FFFFFF` label for direct checkout or primary conversion triggers.
- **Ghost / Tertiary:** White background, `1px solid #E4E4E7`, charcoal text.

### Search Bar
- Massive capsule input with an integrated charcoal magnifying search icon, floating soft yellow highlight on focus (`0 0 0 3px rgba(255, 199, 0, 0.35)`), and quick-clear badge.

### Category Icon Chips
- Circular or squircle containers with light buttery-yellow or cream tinted backgrounds (`#FFFBEB`), paired with high-detail emoji or custom 3D food illustration assets and bold label text beneath.

### Cards (Store & Menu Items)
- **Store Cards:** 16:9 or 4:3 appetizing food thumbnail with a floating delivery time badge (e.g., `25-35 min`), delivery fee pill, store title, star rating with tertiary amber `#F59E0B`, and snippet review highlights.
- **Menu Item Cards:** Horizontal split card layout with menu name, price, description on the left, and a rounded square food photo with an overlaid `+` quick-add capsule button on the right.

### Badges & Tags
- Bubbly, colorful rounded pills. E.g., "Baemin Only", "Free Delivery", "Coupons Available" using pastel fills (`#FEF3C7`, `#DCFCE7`, `#FEE2E2`) with high-contrast text.

### Checkboxes & Radios
- Rounded squircle check boxes (checkbox) and concentric dots (radio) with `#FFC700` active state, `#1E1E1E` checkmark glyph, and spring-eased scale micro-interactions on click.
