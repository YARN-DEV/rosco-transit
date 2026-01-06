# ROSCO Network - Backend & Dashboard Roadmap

## Current Status

### ✅ Completed Phases (Frontend)

**PHASE 9 - How It Works Section** ✓
- Section ID: `#how-it-works`
- Title: "How It Works"
- Description: "A simple 4-step flow to move your cargo across continents"
- Four step boxes with color-coded circles:
  1. **Request Quote** (Blue) - Tell us where and what you are shipping
  2. **Confirm Booking** (Green) - We match you with a carrier and confirm final rate & schedule
  3. **Handover Cargo** (Orange) - Drop off or arrange pickup
  4. **Track & Receive** (Purple) - Follow your shipment online till it's delivered
- Responsive layout: 4 columns (desktop) → stacked (mobile)
- Visual gradient connector line between steps

**PHASE 10 - Contact & Support Section** ✓
- Section ID: `#contact`
- Title: "Contact & Support"
- Invitation text about routes, pricing, customs assistance
- Contact form with:
  - Name field
  - Email field
  - Message textarea
  - Send button
- Current behavior: Shows thank-you message (Option A - no backend)
- Static contact information displayed:
  - Email: support@rosconetwork.com
  - Phone/WhatsApp: +1 (234) 567-8900
  - Office hours
- Quick links to other sections

**PHASE 11 - Footer** ✓
- Copyright with current year (dynamic)
- Service description: "Europe ⇄ Americas ⇄ Africa"
- Placeholder links:
  - Terms & Conditions
  - Privacy Policy
- Responsive layout
- Dark theme matching navbar

---

## PHASE 12 - Future Backend & Dashboard (Planning)

### 12.1 Quote API Route

**Endpoint**: `/api/quote`

**Purpose**: Handle quote form submissions and store/process quote requests

#### Implementation Plan

**Route File**: `app/api/quote/route.ts`

```typescript
// POST /api/quote
export async function POST(request: Request) {
  // 1. Parse request body
  const data = await request.json();
  
  // 2. Validate input
  // - origin, destination, shipmentType, weight, speed
  // - Check required fields
  // - Sanitize inputs
  
  // 3. Calculate estimate (server-side)
  // - Use same pricing algorithm as frontend
  // - More secure calculation
  
  // 4. Generate unique quote ID
  // - Format: QT-YYYYMMDD-XXXX
  
  // 5. Store in database
  // - Save quote details
  // - Store customer contact info
  // - Timestamp
  // - Status: 'pending', 'accepted', 'declined'
  
  // 6. Send email notifications
  // - Email to customer with quote details
  // - Email to admin/sales team
  
  // 7. Return response
  return Response.json({
    success: true,
    quoteId: 'QT-20251206-0001',
    estimate: { price, transitTime }
  });
}
```

#### Database Schema

```sql
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  origin VARCHAR(100) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  shipment_type VARCHAR(50) NOT NULL,
  weight_kg DECIMAL(10,2) NOT NULL,
  speed VARCHAR(50) NOT NULL,
  estimated_price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  transit_time VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  accepted_at TIMESTAMP,
  INDEX idx_customer_email (customer_email),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
```

#### Email Integration

**Service**: SendGrid, Postmark, or AWS SES

**Templates Needed**:
1. Customer quote confirmation
2. Admin quote notification
3. Quote acceptance confirmation
4. Quote expiration reminder

---

### 12.2 Tracking API Route

**Endpoint**: `/api/tracking/:trackingNumber`

**Purpose**: Provide real-time shipment tracking data

#### Implementation Plan

**Route File**: `app/api/tracking/[trackingNumber]/route.ts`

```typescript
// GET /api/tracking/:trackingNumber
export async function GET(
  request: Request,
  { params }: { params: { trackingNumber: string } }
) {
  const { trackingNumber } = params;
  
  // 1. Validate tracking number format
  // - Check format: GS-XXXXXX
  
  // 2. Look up in database
  const shipment = await db.shipments.findByTrackingNumber(trackingNumber);
  
  // 3. If not found, check carrier APIs
  // - Integrate with carrier tracking APIs
  // - Maersk, CMA CGM, MSC for sea freight
  // - FedEx, DHL, UPS for air/express
  
  // 4. Get latest status updates
  // - Query tracking_events table
  // - Order by timestamp DESC
  
  // 5. Calculate estimated delivery
  // - Based on current location and route
  
  // 6. Return formatted response
  return Response.json({
    trackingNumber,
    status: 'in_transit',
    lastLocation: {
      city: 'Hamburg',
      country: 'Germany',
      timestamp: '2025-12-06T10:30:00Z'
    },
    eta: '2025-12-15',
    route: 'Hamburg → Lagos',
    events: [
      { 
        status: 'departed',
        location: 'Hamburg Port',
        timestamp: '2025-12-05T08:00:00Z'
      }
    ]
  });
}
```

#### Database Schema

```sql
CREATE TABLE shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number VARCHAR(50) UNIQUE NOT NULL,
  quote_id UUID REFERENCES quotes(id),
  customer_id UUID REFERENCES customers(id),
  origin VARCHAR(100) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  shipment_type VARCHAR(50) NOT NULL,
  weight_kg DECIMAL(10,2),
  status VARCHAR(50) DEFAULT 'pending',
  current_location VARCHAR(255),
  estimated_delivery DATE,
  actual_delivery TIMESTAMP,
  carrier VARCHAR(255),
  carrier_tracking_number VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_tracking_number (tracking_number),
  INDEX idx_customer_id (customer_id),
  INDEX idx_status (status)
);

CREATE TABLE tracking_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID REFERENCES shipments(id),
  event_type VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  location VARCHAR(255),
  description TEXT,
  timestamp TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_shipment_id (shipment_id),
  INDEX idx_timestamp (timestamp)
);
```

#### Carrier API Integration

**Planned Integrations**:
- **Sea Freight**: Maersk API, CMA CGM, MSC
- **Air Freight**: FedEx API, DHL API, UPS API
- **Parcel**: Multiple courier APIs
- **Real-time updates**: Webhook handlers for status changes

---

### 12.3 Customer Dashboard

**Purpose**: Self-service portal for customers to manage their shipments

#### Features

##### 12.3.1 Authentication System

**Implementation**: Next-Auth.js or Clerk

**Routes**:
- `/auth/signin` - Login page
- `/auth/signup` - Registration page
- `/auth/forgot-password` - Password reset

**Providers**:
- Email/Password
- Google OAuth
- LinkedIn (for business users)

**Database Schema**:
```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company_name VARCHAR(255),
  phone VARCHAR(50),
  email_verified BOOLEAN DEFAULT FALSE,
  account_type VARCHAR(50) DEFAULT 'individual',
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  INDEX idx_email (email)
);
```

##### 12.3.2 Dashboard Overview

**Route**: `/dashboard`

**Features**:
- Active shipments count
- Pending quotes count
- Recent activity timeline
- Quick actions (new quote, track shipment)
- Notifications center

##### 12.3.3 Quotes Management

**Route**: `/dashboard/quotes`

**Features**:
- List all quotes (pending, accepted, expired)
- Filter by status and date
- View quote details
- Accept/decline quotes
- Request modifications
- Download PDF quotes
- Convert quote to booking

**UI Components**:
```typescript
// Quote list table
- Quote number
- Origin → Destination
- Price
- Valid until
- Status badge
- Actions (view, accept, download)

// Quote detail page
- Full quote information
- Pricing breakdown
- Terms and conditions
- Accept/Decline buttons
- Contact sales button
```

##### 12.3.4 Shipments Management

**Route**: `/dashboard/shipments`

**Features**:
- List all shipments
- Real-time tracking status
- Filter by status (in transit, delivered, etc.)
- Search by tracking number
- View detailed tracking timeline
- Download shipping documents
- Report issues

**UI Components**:
```typescript
// Shipment list
- Tracking number
- Origin → Destination
- Current status
- ETA
- View details button

// Shipment detail page
- Full tracking timeline
- Map view (optional)
- Document downloads
- Contact support
- Proof of delivery
```

##### 12.3.5 Invoices & Payments

**Route**: `/dashboard/invoices`

**Features**:
- List all invoices
- Payment status
- Download PDF invoices
- Online payment (Stripe integration)
- Payment history
- Receipt downloads

**Database Schema**:
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id),
  shipment_id UUID REFERENCES shipments(id),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  status VARCHAR(50) DEFAULT 'pending',
  due_date DATE,
  paid_at TIMESTAMP,
  payment_method VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_customer_id (customer_id),
  INDEX idx_status (status)
);
```

##### 12.3.6 Profile Settings

**Route**: `/dashboard/settings`

**Features**:
- Personal information
- Company details
- Billing addresses
- Notification preferences
- API access (for business users)
- Password change
- Two-factor authentication

##### 12.3.7 Saved Addresses

**Route**: `/dashboard/addresses`

**Features**:
- Save frequently used addresses
- Quick selection in quote forms
- Address book management
- Default address settings

---

### 12.4 Contact Form Backend

**Endpoint**: `/api/contact`

**Implementation**:

```typescript
// POST /api/contact
export async function POST(request: Request) {
  const { name, email, message } = await request.json();
  
  // 1. Validate inputs
  
  // 2. Store in database
  await db.contactMessages.create({
    name,
    email,
    message,
    status: 'new',
    created_at: new Date()
  });
  
  // 3. Send email to support team
  await sendEmail({
    to: 'support@rosconetwork.com',
    subject: `New Contact Form: ${name}`,
    body: message
  });
  
  // 4. Send confirmation to customer
  await sendEmail({
    to: email,
    subject: 'We received your message',
    template: 'contact-confirmation'
  });
  
  return Response.json({ success: true });
}
```

**Database Schema**:
```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  assigned_to UUID REFERENCES users(id),
  responded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
```

---

## 12.5 Admin Panel

**Purpose**: Internal tool for managing quotes, shipments, and customers

### Features

**Route**: `/admin`

#### Dashboard
- Key metrics (quotes, shipments, revenue)
- Pending actions
- Recent activity

#### Quote Management
- Review new quote requests
- Adjust pricing
- Send formal quotes
- Convert to bookings

#### Shipment Management
- Create shipments
- Update tracking info
- Upload documents
- Manage carrier relationships

#### Customer Management
- View customer list
- Customer details
- Activity history
- Support tickets

#### Reports
- Revenue reports
- Shipment statistics
- Popular routes
- Performance metrics

---

## Technology Stack Recommendations

### Backend
- **Framework**: Next.js App Router (API Routes)
- **Database**: PostgreSQL (via Supabase or Vercel Postgres)
- **ORM**: Prisma or Drizzle ORM
- **Authentication**: NextAuth.js or Clerk
- **Email**: SendGrid or Resend
- **File Storage**: AWS S3 or Vercel Blob

### Payment Processing
- **Provider**: Stripe
- **Features**: Invoicing, subscriptions, payment links

### External APIs
- **Shipping Carriers**: Maersk API, FedEx API, DHL API
- **Maps**: Google Maps API or Mapbox
- **SMS**: Twilio (for notifications)

### DevOps
- **Hosting**: Vercel
- **Database**: Supabase or Vercel Postgres
- **Monitoring**: Sentry
- **Analytics**: PostHog or Mixpanel

---

## Implementation Phases

### Phase 1 (MVP) - 4-6 weeks
- Contact form backend
- Quote API with database storage
- Email notifications
- Basic admin panel for quotes

### Phase 2 - 6-8 weeks
- Customer authentication
- Basic dashboard (view quotes)
- Tracking API with database
- Invoice generation

### Phase 3 - 8-10 weeks
- Full dashboard features
- Payment integration
- Advanced tracking
- Carrier API integrations

### Phase 4 - Ongoing
- Mobile app
- Advanced analytics
- AI-powered route optimization
- Multi-language support
- API for third-party integrations

---

**Document Version**: 1.0  
**Last Updated**: December 6, 2025  
**Status**: Planning Phase
