# MediFlow Design System - Quick Reference

## 🎯 Quickstart

### Import Components
```tsx
import Button from "@/components/Button";
import Card, { CardTitle, CardBody } from "@/components/Card";
import Input, { SearchPill } from "@/components/Input";
import Badge, { StatusBadge } from "@/components/Badge";
import Sidebar, { SidebarNavItem } from "@/components/Navigation";
import DashboardLayout from "@/layouts/DashboardLayout";
import { colors, typography, spacing } from "@/design/tokens";
```

### Use Design Tokens
```tsx
import { colors, spacing, typography } from "@/design/tokens";

const styles = {
  backgroundColor: colors.primary,
  padding: spacing.xl,
  fontSize: typography.headingMd.fontSize,
};
```

---

## 🎨 Color Quick Reference

### Primary Actions
```tsx
bg-primary       // #4d7d8f - Main CTA background
text-ink         // #0a0a0a - Primary text
bg-canvas        // #ffffff - Default background
```

### Healthcare Accents
```tsx
bg-teal          // #10b981 - Secondary CTA
bg-medical-500   // #22c55e - Success/positive
bg-coral         // #ff5530 - Alert/urgent
```

### Semantic
```tsx
bg-success-bg text-success-text   // Success state
bg-error-bg text-error-text       // Error state
bg-warning-bg text-warning-text   // Warning state
bg-info-bg text-info-text         // Info state
```

---

## 🔘 Button Quick Reference

### Basic Buttons
```tsx
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="tertiary">Learn More</Button>
<Button variant="coral">Alert</Button>
<Button variant="teal">Secondary Action</Button>
```

### With Icons
```tsx
<Button icon={<SaveIcon />}>Save</Button>
<Button icon={<SaveIcon />} iconPosition="right">Save File</Button>
```

### States
```tsx
<Button isLoading>Saving...</Button>
<Button isDisabled>Disabled</Button>
<Button fullWidth>Full Width</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

---

## 📦 Card Quick Reference

### Card Variants
```tsx
<Card variant="base">Standard card</Card>
<Card variant="feature">Featured card</Card>
<Card variant="showcase" showcaseColor="teal">Showcase</Card>
<Card variant="product">Product item</Card>
```

### Card Composition
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Actions</CardFooter>
</Card>
```

### With Description
```tsx
<Card>
  <CardTitle>Healthcare Hub</CardTitle>
  <CardDescription>Manage all your health records</CardDescription>
</Card>
```

---

## 📝 Input Quick Reference

### Text Input
```tsx
<Input
  label="Email"
  type="email"
  placeholder="user@example.com"
  error={error}
/>
```

### Search
```tsx
<SearchPill placeholder="Search patients..." />
```

### With Icon
```tsx
<Input
  icon={<EnvelopeIcon />}
  iconPosition="left"
  placeholder="Email"
/>
```

### Input States
```tsx
<Input error="This field is required" />
<Input success />
<Input disabled />
<Input fullWidth />
```

---

## 🏷️ Badge Quick Reference

### Standard Badges
```tsx
<Badge variant="success">Available</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="info">Information</Badge>
<Badge variant="coral">New</Badge>
<Badge variant="teal">Featured</Badge>
```

### Status Badge
```tsx
<StatusBadge status="active">Active</StatusBadge>
<StatusBadge status="inactive">Inactive</StatusBadge>
<StatusBadge status="pending">Pending</StatusBadge>
<StatusBadge status="error">Error</StatusBadge>
```

### Activity Badge
```tsx
<ActivityBadge count={5} />        // Shows "5"
<ActivityBadge count={150} />      // Shows "99+"
```

---

## 🧭 Navigation Quick Reference

### Sidebar Item
```tsx
<SidebarNavItem
  href="/dashboard"
  label="Dashboard"
  icon={<DashIcon />}
  isActive={currentPath === "/dashboard"}
/>
```

### Sidebar Section
```tsx
<SidebarSection title="Main Menu" collapsible>
  <SidebarNavItem href="/dashboard" label="Dashboard" />
</SidebarSection>
```

### Breadcrumb
```tsx
<Breadcrumb items={[
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Components" }
]} />
```

### Table of Contents
```tsx
<TableOfContents>
  <TocItem href="#intro" label="Introduction" level={1} />
  <TocItem href="#setup" label="Getting Started" level={2} />
</TableOfContents>
```

---

## 📐 Layout Quick Reference

### Dashboard Layout
```tsx
<DashboardLayout
  userRole="patient"
  userName="John Doe"
  onLogout={handleLogout}
>
  <h1>Dashboard Content</h1>
</DashboardLayout>
```

### Auth Layout
```tsx
<AuthLayout
  title="Sign In"
  subtitle="Welcome back"
  showBranding={true}
>
  <LoginForm />
</AuthLayout>
```

### Home Layout
```tsx
<HomeLayout showNavigation showFooter>
  <HeroSection />
  <FeaturesGrid />
</HomeLayout>
```

### Documentation Layout
```tsx
<DocumentationLayout
  title="Getting Started"
  breadcrumbs={[
    { label: "Docs", href: "/docs" },
    { label: "Getting Started" }
  ]}
>
  <h2>Introduction</h2>
  <p>Content here...</p>
</DocumentationLayout>
```

---

## 🎯 Typography Quick Reference

### Using Tailwind Classes
```tsx
<h1 className="text-hero-display">80px Hero</h1>
<h2 className="text-display-lg">56px Display</h2>
<h3 className="text-heading-lg">40px Heading</h3>
<h4 className="text-heading-md">32px Heading</h4>
<h5 className="text-heading-sm">24px Heading</h5>
<p className="text-body-md">16px Body</p>
<p className="text-body-sm">14px Secondary</p>
<small className="text-caption">13px Caption</small>
```

### Using Design Tokens
```tsx
import { typography } from "@/design/tokens";

const styles = {
  ...typography.heroDisplay,  // Get all properties
};
```

---

## 📏 Spacing Quick Reference

### Using Tailwind Classes
```tsx
<div className="p-lg">Padding (20px)</div>
<div className="px-xl py-lg">Padding X/Y</div>
<div className="gap-md">Gap (16px)</div>
<div className="mb-section">Margin bottom (64px)</div>
```

### Spacing Values
- `xxs`: 4px   - Micro spacing
- `xs`: 8px    - Tight spacing
- `sm`: 12px   - Small spacing
- `md`: 16px   - Standard spacing
- `lg`: 20px   - Medium spacing
- `xl`: 24px   - Card padding
- `xxl`: 32px  - Large padding
- `section`: 64px - Section gap

---

## 🔲 Border Radius Quick Reference

### Using Tailwind Classes
```tsx
<div className="rounded-xs">4px</div>
<div className="rounded-sm">6px</div>
<div className="rounded-md">8px</div>
<div className="rounded-lg">12px</div>
<div className="rounded-xl">16px</div>
<div className="rounded-hero">32px</div>
<div className="rounded-full">Pill (9999px)</div>
```

---

## ⛅ Shadow/Elevation Quick Reference

### Using Tailwind Classes
```tsx
<div className="shadow-elevation-1">Subtle shadow</div>
<div className="shadow-elevation-2">Default shadow</div>
<div className="shadow-elevation-3">Elevated shadow</div>
<div className="shadow-elevation-4">Modal shadow</div>
```

---

## 📱 Responsive Patterns

### Mobile-First
```tsx
<div className="block md:hidden">Mobile only</div>
<div className="hidden md:block">Desktop only</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>
```

### Breakpoints
- `sm`: 480px   - Mobile
- `md`: 768px   - Tablet
- `lg`: 1024px  - Desktop
- `xl`: 1280px  - Wide desktop

---

## ♿ Accessibility Quick Tips

### Semantic HTML
```tsx
<button>Clickable</button>
<nav>Navigation</nav>
<article>Content</article>
<section>Section</section>
```

### ARIA Labels
```tsx
<button aria-label="Close menu">×</button>
<input aria-describedby="error-msg" />
<span id="error-msg">Error message</span>
```

### Keyboard Support
- **Tab**: Navigate forward
- **Shift+Tab**: Navigate backward
- **Enter**: Activate button/link
- **Space**: Toggle checkbox
- **Escape**: Close modal

---

## 🎬 Common Patterns

### Form with Validation
```tsx
const [email, setEmail] = useState("");
const [error, setError] = useState("");

const handleSubmit = () => {
  if (!email) setError("Email required");
};

<Input
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={error}
  success={!error && email}
/>
<Button variant="primary" onClick={handleSubmit}>
  Submit
</Button>
```

### Dashboard Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-section">
  <Card variant="feature">
    <CardTitle>Stat 1</CardTitle>
    <p className="text-body-lg font-bold">Value</p>
  </Card>
  <Card variant="feature">
    <CardTitle>Stat 2</CardTitle>
    <p className="text-body-lg font-bold">Value</p>
  </Card>
</div>
```

### Feature List
```tsx
<div className="space-y-lg">
  {features.map((feature) => (
    <Card key={feature.id} variant="base">
      <CardTitle>{feature.title}</CardTitle>
      <Badge variant="success" className="mt-2">
        {feature.status}
      </Badge>
      <p className="text-body-sm text-slate mt-3">
        {feature.description}
      </p>
    </Card>
  ))}
</div>
```

---

## 🚀 Performance Tips

1. **Lazy load layouts** for better code splitting
2. **Use Image optimization** (next/image)
3. **Memoize components** that don't change
4. **Keep components small** for reusability
5. **Use CSS modules** for scoped styles
6. **Minimize re-renders** with proper dependencies
7. **Compress images** before using in cards

---

## 📚 Learn More

- Full documentation: `frontend/DESIGN_SYSTEM.md`
- Summary: `frontend/DESIGN_SYSTEM_SUMMARY.md`
- Tailwind config: `frontend/tailwind.config.js`
- Tokens: `frontend/src/design/tokens.ts`
- Components: `frontend/src/components/`
- Layouts: `frontend/src/layouts/`

---

**Version:** 1.0.0
**Last Updated:** 2024
**Status:** ✅ Ready to Use
