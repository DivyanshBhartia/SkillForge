# SkillForge Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from modern EdTech platforms (Coursera, Udemy) combined with productivity tool aesthetics (Linear, Notion) for clean, professional learning experiences.

## Core Design Principles
- **Trust & Credibility**: Professional aesthetic that establishes SkillForge as a serious learning platform
- **AI-Forward**: Visually emphasize the AI-powered recommendation capabilities
- **Role Clarity**: Distinct visual cues for Student, Instructor, and Admin experiences
- **Learning-Focused**: Remove friction from authentication and discovery flows

## Typography System

**Font Stack**: Inter (primary), Space Grotesk (headings for AI/tech emphasis)
- Hero Headlines: text-5xl to text-6xl, font-bold (Space Grotesk)
- Section Headers: text-3xl to text-4xl, font-semibold
- Body Text: text-base to text-lg, leading-relaxed
- UI Elements: text-sm to text-base, font-medium
- Micro-copy: text-xs to text-sm

## Layout & Spacing System

**Tailwind Units**: Consistently use 4, 6, 8, 12, 16, 20, 24 for spacing
- Section Padding: py-20 (desktop), py-12 (mobile)
- Component Spacing: gap-8 for grids, space-y-6 for stacked content
- Container: max-w-7xl for full sections, max-w-4xl for auth forms

## Home Page Structure

### Navigation Bar
- Sticky header with backdrop blur effect
- Logo left, navigation center, Login/Signup CTAs right
- When authenticated: Replace CTAs with user avatar dropdown showing role badge

### Hero Section
**Layout**: Asymmetric two-column (60/40 split)
- Left: Headline "Master Skills with AI-Powered Learning" + subheadline + dual CTA (Get Started + Explore Courses)
- Right: Hero illustration/image showing AI interface or diverse learners
- Include trust indicators: "10,000+ Active Learners" + "500+ Courses" stats below CTAs

### AI Features Showcase (3-column grid)
- Card-based layout highlighting: "Personalized Recommendations", "Progress Tracking", "Smart Course Discovery"
- Each card: Icon (top), title, 2-line description
- Subtle hover lift effect

### Course Categories (horizontal scroll on mobile, 4-column grid on desktop)
- Visual cards with category images/icons
- Categories: Development, Business, Design, Data Science

### How It Works (stepped layout)
- Three-step visual flow: "Sign Up → Get Recommendations → Start Learning"
- Connected with subtle line/arrow indicators

### Social Proof Section
- 2-column testimonial cards with learner photos, quotes, role badges
- Include completion metrics: "Completed 15 courses"

### Final CTA Section
- Centered, bold: "Start Your Learning Journey Today"
- Single prominent signup button
- Supporting text: "Join thousands of learners advancing their careers"

## Authentication Pages

### Login Page
**Layout**: Centered card (max-w-md) on subtle gradient background
- SkillForge logo centered at top
- "Welcome Back" headline
- Form fields: Email, Password with show/hide toggle
- Remember me checkbox + Forgot password link (right-aligned)
- Primary "Sign In" button (full width)
- Divider with "or continue with"
- OAuth buttons: Google, GitHub (icon + text, side by side)
- Bottom: "Don't have an account? Sign up" link

### Signup Page
**Layout**: Similar card structure, slightly wider (max-w-lg)
- "Create Your Account" headline
- Form fields: Full Name, Email, Password, Confirm Password
- **Role Selection**: Radio button group with visual cards for Student/Instructor/Admin
  - Each role card shows icon, role name, brief description
  - Student (default): "Learn and grow your skills"
  - Instructor: "Share knowledge and teach"
  - Admin: "Manage the platform" (show only if admin invite link)
- Checkbox: "I agree to Terms of Service and Privacy Policy"
- Primary "Create Account" button
- OAuth options
- Bottom: "Already have an account? Sign in"

## Component Library

### Buttons
- Primary: Solid with medium corner radius (rounded-lg)
- Secondary: Outlined
- Ghost: Text-only for tertiary actions
- Icon Buttons: Circular for user avatars/actions
- On images: Backdrop blur background (backdrop-blur-md bg-white/10)

### Form Inputs
- Border style with focus ring
- Floating labels or top-aligned labels
- Validation states: success (green accent), error (red accent)
- Password field with visibility toggle icon

### Cards
- Elevated: shadow-lg with rounded-xl corners
- Flat: border with subtle shadow-sm
- Hover state: Slight translate-y lift (transform -translate-y-1)

### Navigation
- Desktop: Horizontal with dropdowns for course categories
- Mobile: Hamburger menu with slide-in drawer
- User menu: Dropdown showing profile, role badge, dashboard, settings, logout

### Role Indicators
- Badge component showing "Student", "Instructor", or "Admin"
- Positioned near user avatar in navigation and profile areas
- Distinct visual treatment (subtle background, medium weight text)

## Images

### Hero Section
Large illustration or high-quality image (right side, 40% width) showing:
- AI-powered interface mockup, or
- Diverse group of learners engaging with digital content, or
- Abstract tech/learning visualization with gradient overlays

### Course Category Cards
- Icon-based or minimal illustrations for each category
- Consistent aspect ratio (16:9 or 1:1)

### Testimonial Section
- Professional headshot photos for 2-3 featured learners
- Circular cropped images (w-16 h-16)

## Responsive Behavior

- Navigation: Collapse to hamburger menu below 768px
- Hero: Stack columns on mobile (image above text)
- Feature grids: 3 columns → 2 columns → 1 column
- Auth forms: Maintain centered card, reduce padding on mobile
- OAuth buttons: Stack vertically on small screens

## Accessibility
- WCAG AA contrast ratios minimum
- Focus indicators on all interactive elements
- Form labels always visible (no placeholder-only inputs)
- Semantic HTML for authentication flows
- Skip navigation link for keyboard users