# MediFlow Design System

## Overview

MediFlow Design System is a comprehensive, healthcare-focused design language inspired by MiniMax's premium brand approach. It combines a professional medical color palette with a clean, accessible typography system and a robust component library. The system is built with Tailwind CSS and React, designed for enterprise healthcare applications.

## Table of Contents

1. [Design Principles](#design-principles)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Components](#components)
6. [Layouts](#layouts)
7. [Usage Guidelines](#usage-guidelines)
8. [Accessibility](#accessibility)

---

## Design Principles

### 1. **Healthcare First**
Every design decision considers the medical context. UI elements are intuitive for both digital-native and older patient populations.

### 2. **Trust & Clarity**
Professional color palette (deep navy, medical green, teal accents) conveys expertise and reliability. Clear typography hierarchy ensures critical information is immediately visible.

### 3. **Accessibility**
WCAG 2.1 AA compliance standards. High contrast ratios, semantic HTML, keyboard navigation support.

### 4. **Efficiency**
Responsive components work seamlessly across desktop, tablet, and mobile. Complex information presented in digestible pieces.

### 5. **Consistency**
Single typeface (DM Sans), unified spacing scale (4px base unit), consistent elevation system.

---

## Color Palette

### Primary Colors

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | #4d7d8f | Primary actions, headers, critical UI |
| `primary-light` | #6b95a8 | Hover states, secondary emphasis |
| `primary-dark` | #2d4d5f | Active states, dark mode support |

### Healthcare Accents

| Token | Value | Usage |
|-------|-------|-------|
| `teal` | #10b981 | Secondary CTA, accents, active states |
| `medical-green` | #22c55e | Success states, positive indicators |
| `coral` | #ff5530 | Alerts, urgent items, new features |
| `magenta` | #ea5ec1 | Secondary brand, optional accents |
| `blue` | #1456f0 | Information, links, secondary UI |

### Semantic Colors

| Token | Value | Usage |
|-------|-------|-------|
| `success-bg` | #e8ffea | Success message background |
| `success-text` | #1ba673 | Success message text |
| `error-bg` | #ffe8e8 | Error message background |
| `error-text` | #d45656 | Error message text |
| `warning-bg` | #fffaeb | Warning message background |
| `warning-text` | #f59e0b | Warning message text |
| `info-bg` | #eef2ff | Info message background |
| `info-text` | #3b82f6 | Info message text |

### Neutral Palette

| Token | Value | Usage |
|-------|-------|-------|
| `canvas` | #ffffff | Primary background |
| `surface` | #f7f8fa | Secondary background, hover states |
| `hairline` | #e5e7eb | Borders, dividers |
| `ink` | #0a0a0a | Primary text |
| `charcoal` | #222222 | Secondary text |
| `slate` | #45515e | Tertiary text |
| `steel` | #5f5f5f | Disabled text, metadata |
| `muted` | #a8aab2 | Footer text, quiet elements |

---

## Typography

### Font Family

**Primary:** DM Sans (400, 500, 600, 700 weights)
**Fallbacks:** Inter, Helvetica Neue, Helvetica, Arial

DM Sans is a geometric variable sans-serif chosen for its dual fluency in both display (80px hero) and body (14px) sizes. No italic variants used — emphasis comes from weight alone.

### Type Scale

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `hero-display` | 80px | 600 | 1.10 | -2px | Homepage hero headlines |
| `display-lg` | 56px | 600 | 1.10 | -1.5px | Major page heroes |
| `display-md` | 48px | 600 | 1.15 | -1px | Section openers |
| `heading-lg` | 40px | 600 | 1.20 | -1px | Page titles |
| `heading-md` | 32px | 600 | 1.25 | -0.5px | Section headers |
| `heading-sm` | 24px | 600 | 1.30 | 0 | Card titles |
| `card-title` | 20px | 600 | 1.40 | 0 | Component titles |
| `subtitle` | 18px | 500 | 1.50 | 0 | Subtitles |
| `body-md` | 16px | 400 | 1.50 | 0 | Primary body text |
| `body-md-bold` | 16px | 700 | 1.50 | 0 | Emphasis text |
| `body-sm` | 14px | 400 | 1.50 | 0 | Secondary text, buttons |
| `body-sm-medium` | 14px | 500 | 1.50 | 0 | Medium emphasis |
| `caption` | 13px | 400 | 1.70 | 0 | Captions, fine print |
| `caption-bold` | 13px | 600 | 1.50 | 0 | Badge labels |
| `micro` | 12px | 400 | 1.50 | 0 | Micro labels |
| `button-md` | 14px | 600 | 1.40 | 0 | Button text |

### Typography Usage

- **Hero Display (80px):** Main homepage hero, attention-grabbing moments with tight letter-spacing
- **Display Large (56px):** Section openers, major feature announcements
- **Heading Large (40px):** Page titles, critical content sections
- **Heading Medium (32px):** Subsection headers, card group titles
- **Body Medium (16px):** Primary reading text, long-form content
- **Body Small (14px):** Secondary information, UI labels, button text
- **Caption (13px):** Footnotes, metadata, timestamps

---

## Spacing System

Base unit: **4px** (doubling scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96)

| Token | Value | Usage |
|-------|-------|-------|
| `spacing-xxs` | 4px | Micro spacing, icon gap |
| `spacing-xs` | 8px | Tight spacing, button groups |
| `spacing-sm` | 12px | Input padding, list gaps |
| `spacing-md` | 16px | Standard padding, element gaps |
| `spacing-lg` | 20px | Medium spacing, card gaps |
| `spacing-xl` | 24px | Card padding, section gaps |
| `spacing-xxl` | 32px | Large padding, major gaps |
| `spacing-xxxl` | 40px | Extra-large spacing |
| `spacing-section-sm` | 48px | Section separation (compact) |
| `spacing-section` | 64px | Standard section separation |
| `spacing-section-lg` | 80px | Large section separation |
| `spacing-hero` | 96px | Hero section spacing |

### Spacing Patterns

- **Cards:** `spacing-xl` padding (24px)
- **Sections:** `spacing-section` gap (64px) on desktop, `spacing-section-lg` (80px) above-the-fold
- **Elements:** `spacing-md` gap (16px) between inline elements
- **Compact:** `spacing-sm` to `spacing-md` (12-16px) for dense information

---

## Components

### Button Variants

#### Primary Button
- **Background:** #0a0a0a (ink)
- **Text:** white
- **Padding:** 11px 24px
- **Border Radius:** 9999px (full pill)
- **Typography:** button-md (14px, 600)
- **Usage:** Primary CTA, main actions

```tsx
<Button variant="primary">Save Changes</Button>
```

#### Secondary Button
- **Background:** transparent
- **Border:** 1px solid #0a0a0a (ink)
- **Text:** #0a0a0a (ink)
- **Padding:** 11px 24px
- **Border Radius:** 9999px
- **Usage:** Secondary action, paired with primary

```tsx
<Button variant="secondary">Cancel</Button>
```

#### Tertiary Button
- **Background:** #ffffff (canvas)
- **Border:** 1px solid #e5e7eb (hairline)
- **Text:** #0a0a0a (ink)
- **Padding:** 11px 24px
- **Border Radius:** 9999px
- **Usage:** Tertiary action, less prominent

```tsx
<Button variant="tertiary">Learn More</Button>
```

#### Ghost Button
- **Background:** transparent
- **Text:** #0a0a0a (ink)
- **Padding:** 8px 0
- **Usage:** Inline links, lightweight actions

```tsx
<Button variant="ghost">More options</Button>
```

#### Action Variants
- **Coral:** Urgent actions, alerts (bg: #ff5530)
- **Teal:** Alternative primary (bg: #10b981)
- **Danger:** Destructive actions (bg: #d45656)

### Card Variants

#### Base Card
- **Background:** #ffffff (canvas)
- **Border:** 1px solid #e5e7eb
- **Radius:** 16px
- **Padding:** 24px
- **Shadow:** None (flat)
- **Usage:** Standard container, content cards

```tsx
<Card variant="base">Content</Card>
```

#### Feature Card
- **Background:** #f7f8fa (surface)
- **Radius:** 16px
- **Padding:** 32px
- **Shadow:** None (flat)
- **Usage:** Highlighted features, callouts

```tsx
<Card variant="feature">Special feature</Card>
```

#### Showcase Card
- **Background:** Brand color (coral, teal, magenta, blue, purple)
- **Text Color:** white
- **Radius:** 32px
- **Padding:** 32px
- **Shadow:** elevation-3 (atmospheric)
- **Usage:** Product highlights, prominent content

```tsx
<Card variant="showcase" showcaseColor="teal">
  Featured Content
</Card>
```

#### Product Card
- **Background:** #ffffff
- **Border:** 1px solid #e5e7eb
- **Radius:** 24px
- **Padding:** 24px
- **Shadow:** elevation-1
- **Usage:** Product grid, portfolio items

```tsx
<Card variant="product">Item</Card>
```

### Input Components

#### Text Input
- **Background:** #ffffff (canvas)
- **Border:** 1px solid #e5e7eb
- **Focused Border:** 2px solid #1d4ed8 (brand-blue-deep)
- **Radius:** 8px
- **Height:** 40px
- **Typography:** body-sm
- **Usage:** Form fields, text entry

```tsx
<Input
  label="Email Address"
  type="email"
  placeholder="user@example.com"
  error={emailError}
/>
```

#### Search Pill
- **Background:** #f7f8fa (surface)
- **Border:** 1px solid #e5e7eb
- **Radius:** 8px
- **Height:** 36px
- **Icon:** Optional search icon
- **Usage:** Documentation search, filtering

```tsx
<SearchPill placeholder="Search..." />
```

#### States
- **Focused:** 2px blue border, shadow-elevation-1
- **Error:** Red border (#d45656), error icon
- **Success:** Green border (#1ba673), checkmark icon
- **Disabled:** Gray background, muted text

### Badge & Status Components

#### Success Badge
- **Background:** #e8ffea
- **Text:** #1ba673
- **Padding:** 4px 10px
- **Radius:** 9999px

```tsx
<Badge variant="success">Available</Badge>
```

#### Error Badge
- **Background:** #ffe8e8
- **Text:** #d45656
- **Padding:** 4px 10px
- **Radius:** 9999px

```tsx
<Badge variant="error">Failed</Badge>
```

#### Status Badge
- **Dot indicator** showing active/inactive/pending/error
- **Animated pulse** for active states

```tsx
<StatusBadge status="active">Active</StatusBadge>
```

#### Activity Badge
- **Circular badge** with number (0-99+)
- **Background:** Coral
- **Usage:** Notification counts

```tsx
<ActivityBadge count={5} />
```

### Navigation Components

#### Sidebar Navigation
- **Width:** 220px (narrow), 256px (normal), 288px (wide)
- **Sticky:** Can be fixed or scroll with content
- **Item Styling:** 
  - Inactive: charcoal text, transparent background
  - Active: surface background, bold text
- **Padding:** 8px horizontal, 12px vertical per item

```tsx
<Sidebar width="normal">
  <SidebarNavItem
    href="/dashboard"
    label="Dashboard"
    icon={<Icon />}
    isActive={currentPath === "/dashboard"}
  />
</Sidebar>
```

#### Table of Contents (TOC)
- **Width:** 180px
- **Sticky:** Follows scroll
- **Hierarchy:** 3 levels with indent
- **Active State:** Bold ink color

```tsx
<TableOfContents>
  <TocItem href="#intro" label="Introduction" level={1} />
  <TocItem href="#setup" label="Setup" level={2} />
</TableOfContents>
```

#### Breadcrumb
- **Separator:** Forward slash (/)
- **Styling:** Links in brand blue, current page in charcoal

```tsx
<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "Components" }
  ]}
/>
```

---

## Layouts

### DashboardLayout
Authenticated user dashboard with sidebar, top navigation, and main content.

**Features:**
- Left sidebar: persistent or collapsible navigation
- Top navbar: hamburger toggle, title, notifications, user menu
- Main content: full-width scrollable area
- Role-based navigation (patient/provider/admin)

**Usage:**
```tsx
<DashboardLayout userRole="patient" userName="John Doe">
  <main>Dashboard content</main>
</DashboardLayout>
```

### AuthLayout
Clean, centered login/signup layout with optional branding sidebar.

**Features:**
- Left side: Branding and benefits (hidden on mobile)
- Right side: Centered form (100% on mobile)
- Responsive: Stacks vertically below lg breakpoint

**Usage:**
```tsx
<AuthLayout title="Sign In" subtitle="Welcome back">
  <LoginForm />
</AuthLayout>
```

### HomeLayout
Marketing homepage with top navigation and footer.

**Features:**
- Sticky top navigation with CTA buttons
- Optional footer with multi-column link grid
- Hero section support
- Call-to-action buttons

**Usage:**
```tsx
<HomeLayout>
  <HeroSection />
  <FeaturesSection />
</HomeLayout>
```

### DocumentationLayout
3-column documentation with sidebar, body, and TOC.

**Features:**
- Left sidebar: Expandable navigation tree (hidden below lg)
- Center: Main content area with max-width prose
- Right: Table of contents (hidden below xl)
- Search: Documentation search in sidebar
- Breadcrumbs: Navigation context

**Usage:**
```tsx
<DocumentationLayout
  title="Getting Started"
  breadcrumbs={[
    { label: "Docs", href: "/docs" },
    { label: "Getting Started" }
  ]}
>
  <article>Content</article>
</DocumentationLayout>
```

---

## Usage Guidelines

### Color Usage

✅ **Do:**
- Use `primary` for main CTAs and critical UI
- Use `teal` for secondary actions and accents
- Use semantic colors (success/error/warning/info) for feedback
- Maintain high contrast (WCAG AA minimum 4.5:1 for text)

❌ **Don't:**
- Use brand colors (coral, magenta, blue) on body text
- Mix multiple brand colors in a single section
- Use low-contrast color combinations
- Apply color alone for status indication (use icons/text too)

### Typography Usage

✅ **Do:**
- Use hierarchy to guide reading: hero > heading > body
- Maintain 1.5+ line-height for body text (readability)
- Limit to 80 characters per line in prose
- Use 600+ weight only for headings/buttons

❌ **Don't:**
- Mix fonts (DM Sans only)
- Use hero display for general headings
- Reduce line-height below 1.2 (breaks readability)
- Use lowercase for all-caps content

### Spacing Usage

✅ **Do:**
- Use spacing multiples (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96)
- Apply consistent gaps between elements (16px standard)
- Use larger spacing for section separation (64px+)
- Increase padding inside containers (xl = 24px)

❌ **Don't:**
- Use arbitrary spacing (e.g., 15px, 25px, 35px)
- Mix spacing scales in the same component
- Use inconsistent gutters between columns
- Reduce spacing below 8px (becomes cramped)

### Component Usage

#### Buttons
- Primary for main actions (1 per section)
- Secondary for alternative actions
- Tertiary for weak actions or cancellations
- Avoid button states:  disabled > loading > default > hover > active

#### Cards
- Base for neutral content
- Feature for highlighted information
- Showcase for promotional/important content
- Use consistent card padding and spacing

#### Forms
- Use labels for all inputs
- Show validation feedback clearly
- Error messages below input
- Success/confirmation after submit

---

## Accessibility

### WCAG 2.1 AA Compliance

- **Color Contrast:** All text meets 4.5:1 (AAA where possible)
- **Touch Targets:** Minimum 44px × 44px for interactive elements
- **Keyboard Navigation:** Full support, visible focus indicators
- **Screen Readers:** Semantic HTML, ARIA labels where needed

### Best Practices

1. **Semantic HTML:** Use `<button>`, `<nav>`, `<article>`, etc.
2. **ARIA Labels:** Add to icons, buttons without text
3. **Focus Management:** Tab order logical, focus trap in modals
4. **Text Alternatives:** Images have meaningful alt text
5. **Motion:** Reduce animations for `prefers-reduced-motion`
6. **Color:** Never rely on color alone for meaning

### Keyboard Support

- **Tab:** Navigate forward through interactive elements
- **Shift+Tab:** Navigate backward
- **Enter:** Activate buttons/links, submit forms
- **Space:** Toggle checkboxes, activate buttons
- **Escape:** Close modals, exit menus
- **Arrow Keys:** Navigate within components (select lists, tabs)

---

## Component Import Structure

```typescript
// Buttons
import Button from "@/components/Button";

// Cards
import Card, {
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/Card";

// Inputs
import Input, { SearchPill } from "@/components/Input";

// Badges
import Badge, { StatusBadge, ActivityBadge } from "@/components/Badge";

// Navigation
import Sidebar, {
  SidebarNavItem,
  SidebarSection,
  TocItem,
  TableOfContents,
  Breadcrumb,
} from "@/components/Navigation";

// Design Tokens
import {
  colors,
  typography,
  spacing,
  borderRadius,
  elevation,
  components,
} from "@/design/tokens";

// Layouts
import DashboardLayout from "@/layouts/DashboardLayout";
import AuthLayout from "@/layouts/AuthLayout";
import HomeLayout from "@/layouts/HomeLayout";
import DocumentationLayout from "@/layouts/DocumentationLayout";
```

---

## Tailwind Configuration

The `tailwind.config.js` includes all design tokens as Tailwind utilities:

```javascript
// Colors
<div className="bg-primary text-ink border-hairline" />

// Typography
<h1 className="text-hero-display" />

// Spacing
<div className="px-lg py-xl" />

// Border Radius
<div className="rounded-hero" />

// Shadows
<div className="shadow-elevation-2" />
```

---

## Color Accessibility Matrix

| Text Color | Background Colors (Pass WCAG AA) |
|---|---|
| `ink` (#0a0a0a) | canvas, surface, teal-light, success-bg, warning-bg |
| `charcoal` (#222222) | canvas, surface, teal-light |
| `on-dark` (#ffffff) | primary, coral, magenta, blue, purple, teal, primary-dark |
| `steel` (#5f5f5f) | canvas, surface, surface-soft |

---

## Responsive Breakpoints

| Breakpoint | Width | Mobile/Tablet/Desktop |
|---|---|---|
| `sm` | 480px | Mobile |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Wide Desktop |

### Layout Adjustments

- **Mobile (< 480px):** Single column, collapsed sidebar, stack navigation
- **Tablet (480-767px):** 2-column grid, drawer sidebar navigation
- **Desktop (768-1023px):** 3-column grid, visible sidebar
- **Wide (1024px+):** Full 3-column layout, fixed sidebar

---

## Version & Updates

**Version:** 1.0.0
**Last Updated:** 2024
**Maintainer:** MediFlow Design Team

For updates, component additions, or design improvements, please follow the MediFlow Design System contribution guidelines.
