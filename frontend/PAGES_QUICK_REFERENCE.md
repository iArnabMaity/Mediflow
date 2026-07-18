/**
 * PAGES_QUICK_REFERENCE.md
 * Quick developer reference for all implemented pages
 */

# MediFlow Pages - Quick Reference Guide

## Page Routes & Files

```
/                    → frontend/src/pages/index.tsx           (HomePage)
/features            → frontend/src/pages/features.tsx        (FeaturesPage)
/pricing             → frontend/src/pages/pricing.tsx         (PricingPage)
/dashboard           → frontend/src/pages/dashboard.tsx       (DashboardPage)
/profile             → frontend/src/pages/profile.tsx         (PatientProfilePage)
/appointments        → frontend/src/pages/appointments.tsx    (AppointmentsPage)
/records             → frontend/src/pages/records.tsx         (MedicalRecordsPage)
/docs                → frontend/src/pages/docs.tsx            (DocumentationPage)
/login               → frontend/src/pages/login.tsx           (LoginPage)
/signup              → frontend/src/pages/signup.tsx          (SignupPage)
```

## Page Components & Layouts

### Marketing Pages (Use HomeLayout)
```tsx
import HomeLayout from "@/layouts/HomeLayout";

<HomeLayout>
  {/* Content */}
</HomeLayout>
```
- **Pages**: index (home), features, pricing
- **Features**: Sticky nav, footer, flexible sections

### Dashboard Pages (Use DashboardLayout)
```tsx
import DashboardLayout from "@/layouts/DashboardLayout";

<DashboardLayout userName="John" userRole="patient">
  {/* Content */}
</DashboardLayout>
```
- **Pages**: dashboard, profile, appointments, records
- **Roles**: "patient" | "provider" | "admin"
- **Features**: Sidebar, top nav, user menu

### Auth Pages (Use AuthLayout)
```tsx
import AuthLayout from "@/layouts/AuthLayout";

<AuthLayout title="Sign In" subtitle="Welcome back">
  {/* Form */}
</AuthLayout>
```
- **Pages**: login, signup
- **Features**: Split layout, branding sidebar

### Doc Pages (Use DocumentationLayout)
```tsx
import DocumentationLayout from "@/layouts/DocumentationLayout";

<DocumentationLayout title="Docs" sidebarItems={[...]} tableOfContents={[...]}>
  {/* Content */}
</DocumentationLayout>
```
- **Pages**: docs
- **Features**: 3-column layout, search, TOC

## Component Import Examples

### Button Component
```tsx
import Button from "@/components/Button";

// Variants
<Button variant="primary" size="lg">Save</Button>
<Button variant="secondary" size="md">Cancel</Button>
<Button variant="tertiary" size="sm">Learn</Button>
<Button variant="ghost">Link</Button>
<Button variant="coral">Alert</Button>
<Button variant="teal">Action</Button>
<Button variant="danger">Delete</Button>

// Properties
<Button
  size="lg"                      // sm | md | lg
  isLoading={true}               // Shows spinner
  isDisabled={true}              // Disabled state
  fullWidth                      // 100% width
  icon={<Icon />}                // Icon support
  iconPosition="right"           // left | right
  className="custom-class"       // Additional classes
/>
```

### Card Component
```tsx
import Card, { CardHeader, CardBody, CardFooter, CardTitle, CardDescription } from "@/components/Card";

// Basic card
<Card variant="base" padding="lg">
  Content here
</Card>

// Feature card
<Card variant="feature" padding="xl">
  Highlighted content
</Card>

// Showcase cards (colored)
<Card variant="showcase" showcaseColor="teal">
  Premium content
</Card>

// Card sub-components
<Card>
  <CardHeader>Header content</CardHeader>
  <CardBody>Body content</CardBody>
  <CardTitle>Title</CardTitle>
  <CardDescription>Description</CardDescription>
  <CardFooter>Footer content</CardFooter>
</Card>

// Properties
padding="sm|md|lg|xl|xxl"  // Card padding
shadow={true}              // Add shadow
clickable={true}           // Hover effect
```

### Badge Component
```tsx
import Badge, { StatusBadge, ActivityBadge } from "@/components/Badge";

// Regular badge
<Badge variant="success">Available</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="coral">Urgent</Badge>
<Badge variant="teal">Secondary</Badge>

// Status badge
<StatusBadge status="active">Active</StatusBadge>
<StatusBadge status="pending">Pending</StatusBadge>
<StatusBadge status="inactive">Inactive</StatusBadge>
<StatusBadge status="error">Error</StatusBadge>

// Activity badge (notification count)
<ActivityBadge count={5} max={99} />

// Properties
size="sm|md|lg"            // Badge size
icon={<Icon />}            // Icon support
dismissible                // Show close button
onDismiss={() => {}}       // Dismiss handler
```

### Input Component
```tsx
import Input, { SearchPill } from "@/components/Input";

// Text input
<Input
  placeholder="Enter text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  disabled={false}
  error={false}
/>

// Email input
<Input type="email" placeholder="your@email.com" />

// Password input
<Input type="password" placeholder="Password" />

// Date input
<Input type="date" value={dateValue} onChange={...} />

// Search pill
<SearchPill
  placeholder="Search..."
  value={searchQuery}
  onChange={(e) => setQuery(e.target.value)}
/>
```

## Design Tokens Usage

### Colors
```tsx
// Primary colors
className="text-primary"         // #4d7d8f
className="bg-primary"
className="border-primary"

// Healthcare colors
className="text-teal"            // #10b981
className="bg-coral"             // #ff5530
className="text-magenta"         // #ea5ec1
className="bg-purple"            // #a855f7
className="text-blue"            // #1456f0

// Semantic colors
className="text-success-text"    // #1ba673
className="bg-error-bg"          // #ffe8e8
className="text-warning-text"    // #f59e0b
className="bg-info-bg"           // #eef2ff

// Neutral palette
className="text-ink"             // #0a0a0a (primary text)
className="text-slate"           // #45515e (secondary)
className="bg-surface"           // #f7f8fa (backgrounds)
className="border-hairline"      // #e5e7eb (borders)
```

### Typography
```tsx
// Hero and display
className="text-hero-display"    // 80px
className="text-display-lg"      // 56px
className="text-display-md"      // 48px

// Headings
className="text-heading-lg"      // 40px
className="text-heading-md"      // 32px
className="text-heading-sm"      // 24px

// Body text
className="text-body-md"         // 16px
className="text-body-sm"         // 14px
className="text-caption"         // 13px

// Font weights
className="font-bold"            // 600
className="font-semibold"        // 600
className="font-medium"          // 500
className="font-normal"          // 400
```

### Spacing
```tsx
// Padding and margin (4px base unit)
className="p-sm"  // 12px padding
className="px-lg" // 20px horizontal
className="py-xl" // 24px vertical
className="gap-4" // 16px gap

// Section spacing
className="mb-16" // section-sm (48px)
className="mb-24" // section (64px)
className="my-32" // section-lg (80px)
```

### Shadows
```tsx
className="shadow-elevation-1"  // Subtle
className="shadow-elevation-2"  // Default
className="shadow-elevation-3"  // Elevated
className="shadow-elevation-4"  // Modal
```

### Border Radius
```tsx
className="rounded-md"          // 8px
className="rounded-lg"          // 12px
className="rounded-xl"          // 16px
className="rounded-hero"        // 32px
className="rounded-full"        // 9999px
```

## Common Patterns

### Feature Grid (3 columns)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item, idx) => (
    <Card key={idx} variant="feature">
      {/* Content */}
    </Card>
  ))}
</div>
```

### Stats Display (4 columns)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {stats.map((stat) => (
    <Card key={stat.id} variant="base" className="text-center">
      <div className="text-4xl mb-2">{stat.icon}</div>
      <p className="text-body-sm text-slate">{stat.label}</p>
      <p className="text-heading-sm font-bold">{stat.value}</p>
    </Card>
  ))}
</div>
```

### Filterable List
```tsx
const [filter, setFilter] = useState("all");

const filtered = items.filter(item => 
  filter === "all" || item.type === filter
);

// Filter buttons
<div className="flex gap-2">
  {["all", "type1", "type2"].map(type => (
    <button
      key={type}
      onClick={() => setFilter(type)}
      className={`px-4 py-2 rounded-full ${
        filter === type 
          ? "bg-primary text-white"
          : "bg-surface text-charcoal"
      }`}
    >
      {type}
    </button>
  ))}
</div>
```

### Form with Validation
```tsx
const [errors, setErrors] = useState({});

const validateForm = () => {
  const newErrors = {};
  if (!email) newErrors.email = "Email required";
  if (password.length < 8) newErrors.password = "Min 8 chars";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (validateForm()) {
    // Submit
  }
};

// Field render
<div>
  <label>Email</label>
  <Input value={email} onChange={(e) => setEmail(e.target.value)} />
  {errors.email && <p className="text-error-text text-caption">{errors.email}</p>}
</div>
```

### Modal-like Card
```tsx
<Card variant="base" padding="lg" className="max-w-md mx-auto">
  <CardHeader>
    <h2 className="text-heading-sm font-bold">Title</h2>
  </CardHeader>
  <CardBody>
    Content
  </CardBody>
  <CardFooter>
    <Button variant="primary">Confirm</Button>
    <Button variant="secondary">Cancel</Button>
  </CardFooter>
</Card>
```

## State Management Patterns

### Simple Form State
```tsx
const [formData, setFormData] = useState({
  email: "",
  password: "",
  rememberMe: false,
});

const handleChange = (e) => {
  const { name, value, type } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: type === "checkbox" ? e.target.checked : value
  }));
};
```

### Filter State
```tsx
const [filterStatus, setFilterStatus] = useState("all");
const [searchQuery, setSearchQuery] = useState("");

const filtered = items.filter(item => {
  const matchesStatus = filterStatus === "all" || item.status === filterStatus;
  const matchesSearch = !searchQuery || 
    item.title.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesStatus && matchesSearch;
});
```

### Toggle State
```tsx
const [isEditing, setIsEditing] = useState(false);

<Button onClick={() => setIsEditing(!isEditing)}>
  {isEditing ? "Save" : "Edit"}
</Button>
```

## Responsive Patterns

### Responsive Columns
```tsx
// 1 col on mobile, 2 on tablet, 3 on desktop
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Hide on mobile, show on tablet+
className="hidden md:block"

// Full width on mobile, 50% on tablet+
className="w-full md:w-1/2"

// Flexible spacing
className="px-4 md:px-6 lg:px-8"
```

### Responsive Text Sizes
```tsx
// Smaller on mobile, larger on desktop
<h1 className="text-heading-sm md:text-heading-md lg:text-heading-lg">
  Title
</h1>

// Button sizes
<Button size="sm" className="md:hidden">
  Mobile
</Button>
<Button size="lg" className="hidden md:block">
  Desktop
</Button>
```

## Testing & Debugging

### Dev Inspection
```tsx
// Add data-testid for testing
<Button data-testid="submit-btn">Submit</Button>

// Console logging
console.log("Debug:", { formData, filtered, errors });

// Type checking with TypeScript
interface Props {
  title: string;
  onSubmit: (data: FormData) => void;
}
```

## Performance Tips

1. **Use React.memo** for cards in large lists
2. **Lazy load** images in grids
3. **Debounce** search inputs
4. **Virtualize** long lists
5. **Code split** pages with Next.js dynamic imports

## Accessibility Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Color is not the only indicator (use text/icons)
- [ ] Images have alt text
- [ ] Form labels are associated with inputs
- [ ] Sufficient color contrast (WCAG AA)
- [ ] Focus indicators are visible

---

See `PAGES_IMPLEMENTATION_SUMMARY.md` for detailed page documentation.
