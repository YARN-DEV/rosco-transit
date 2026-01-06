# ROSCO Network - Design System

## Visual Theme

### Color Palette

#### Primary Colors (Dark Theme)
- **Background**: `#0f172a` (Navy/Slate) - Main page background
- **Foreground**: `#f8fafc` (Light Slate) - Primary text color
- **Section Dark**: `#1e293b` - Dark sections/cards
- **Section Light**: `#f1f5f9` - Light sections
- **Section White**: `#ffffff` - White sections/cards

#### Accent Colors
- **Primary Accent (Green)**: `#10b981` - Trust/Logistics theme
  - Hover: `#059669`
  - Usage: CTAs, highlights, success states
- **Secondary Accent (Blue)**: `#3b82f6` - Interactive elements
  - Usage: Links, secondary buttons, info states

#### Semantic Colors
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Error**: Red (#ef4444)
- **Info**: Blue (#3b82f6)

### Typography

#### Font Family
- **Primary Font**: Inter (Modern sans-serif)
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif

#### Font Sizes
- **Hero Heading**: 3.75rem (60px) - `text-6xl`
- **Section Heading**: 2.25rem (36px) - `text-4xl`
- **Subsection Heading**: 1.5rem (24px) - `text-2xl`
- **Body Large**: 1.25rem (20px) - `text-xl`
- **Body**: 1rem (16px) - `text-base`
- **Small**: 0.875rem (14px) - `text-sm`

#### Line Height
- Default: 1.6
- Headings: 1.2

### Layout Structure

#### Container System
```
Max Width: 1280px (desktop)
Padding: 
  - Mobile: 1rem (16px)
  - Tablet: 1.5rem (24px)
  - Desktop: 2rem (32px)
Centered: margin-left: auto, margin-right: auto
```

#### Section Spacing
```
Vertical Padding:
  - Mobile: 4rem (64px)
  - Desktop: 5rem (80px)
```

#### Grid System
- **Routes Section**: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
- **How It Works**: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- **Contact**: 2 columns (desktop), 1 column (mobile)

### Component Patterns

#### Navigation Bar
- **Background**: Slate-900 with transparency on scroll
- **Height**: 80px (5rem)
- **Position**: Fixed, sticky at top (z-index: 50)
- **Border**: Bottom border (gray-700)

#### Buttons

**Primary CTA (Green)**
```css
Background: #10b981
Hover: #059669
Padding: 1rem 2rem
Border-radius: 0.5rem (8px)
Font-weight: 600
```

**Secondary CTA (Outlined)**
```css
Border: 2px solid white
Background: transparent
Hover: white background with dark text
Padding: 1rem 2rem
```

#### Cards
```css
Background: White or Slate-800
Border-radius: 0.5rem (8px)
Shadow: lg
Padding: 1.5rem (24px)
Hover: Elevated shadow (xl)
Border-top: 4px colored accent
```

#### Form Inputs
```css
Border: 1px solid gray-300
Border-radius: 0.5rem (8px)
Padding: 0.75rem 1rem
Focus: 2px ring (blue-500)
```

### Responsive Breakpoints

```
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: > 1024px

Tailwind breakpoints:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
```

### Spacing Scale

```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
3xl: 4rem (64px)
```

### Animation & Transitions

#### Standard Transitions
```css
Duration: 300ms
Timing: ease-in-out
Properties: colors, background-color, border-color, transform, shadow
```

#### Hover Effects
- Buttons: Background color change + slight elevation
- Cards: Shadow elevation (lg → xl)
- Links: Color change + underline

#### Scroll Behavior
```css
scroll-behavior: smooth
```

### Icons
- **Library**: Heroicons (via inline SVG)
- **Size**: 24px (w-6 h-6) standard, 16px (w-4 h-4) small
- **Stroke Width**: 2px

### Shadows

```
Default Card: shadow-lg
Hover Card: shadow-xl
Navbar: shadow-md (when scrolled)
```

## Layout Architecture

### Global Structure
```
<html>
  <body> (Full-width, dark background)
    <div> (Wrapper for all content)
      <Navbar /> (Sticky, always visible)
      <main>
        {Page Content - Various sections}
      </main>
      <Footer />
    </div>
  </body>
</html>
```

### Section Pattern
```jsx
<section id="section-name" className="py-16 bg-[color]">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2>Section Title</h2>
      <p>Section Description</p>
    </div>
    <div className="grid ...">
      {/* Section Content */}
    </div>
  </div>
</section>
```

## Accessibility

### Color Contrast
- All text meets WCAG AA standards (4.5:1 minimum)
- Interactive elements have clear focus states

### Keyboard Navigation
- All interactive elements accessible via Tab
- Skip links for main content
- Focus visible indicators

### Semantic HTML
- Proper heading hierarchy (h1 → h6)
- Semantic section elements
- ARIA labels where needed

## Brand Guidelines

### Logo
- Text: "ROSCO Network"
- Subtitle: "Europe • Americas • Africa"
- Typography: Bold, sans-serif

### Tone
- Professional yet approachable
- Clear and direct communication
- Trust and reliability

### Voice
- Confident but not arrogant
- Helpful and supportive
- International and inclusive

---

**Version**: 1.0  
**Last Updated**: December 6, 2025
