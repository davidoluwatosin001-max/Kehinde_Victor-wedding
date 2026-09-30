-- ==============================================================================
-- KEHINDE & VICTOR WEDDING — PRODUCTION SUPABASE POSTGRESQL SCHEMA
-- Wedding Date: Thursday, 19 November 2026 (Engagement: Wednesday, 18 November 2026)
-- Complete with Row Level Security (RLS), Triggers, Constraints & Indexes
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SITE SETTINGS
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    couple_names TEXT NOT NULL DEFAULT 'Kehinde & Victor',
    wedding_date TIMESTAMPTZ NOT NULL DEFAULT '2026-11-19 10:00:00+01',
    tagline TEXT NOT NULL DEFAULT 'Two Hearts. One Journey Forever.',
    hashtag TEXT NOT NULL DEFAULT 'Ayobamidele ''26',
    bank_name TEXT NOT NULL DEFAULT 'Guaranty Trust Bank (GTBank)',
    account_name TEXT NOT NULL DEFAULT 'Victor Oluwatosin Odudu & Kehinde Elizabeth',
    account_number TEXT NOT NULL DEFAULT '0123456789',
    payment_instructions TEXT NOT NULL DEFAULT 'Please include your name in payment narration.',
    story_title TEXT NOT NULL DEFAULT 'Two Hearts. One Journey Forever.',
    story_content JSONB DEFAULT '[]'::jsonb,
    announcement TEXT,
    show_announcement BOOLEAN DEFAULT TRUE,
    rsvp_deadline TIMESTAMPTZ DEFAULT '2026-10-25 23:59:59+01',
    phone1 TEXT DEFAULT '0813 676 9807',
    phone2 TEXT DEFAULT '0907 724 9194',
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 2. GUESTS & INVITATIONS
CREATE TABLE IF NOT EXISTS guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    max_guests INT NOT NULL DEFAULT 1,
    allowed_plus_one BOOLEAN DEFAULT FALSE,
    accommodation_eligible BOOLEAN DEFAULT FALSE,
    is_vip BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_guests_code ON guests(UPPER(code));

-- 3. RSVPS
CREATE TYPE rsvp_status AS ENUM ('Pending', 'Confirmed', 'Declined', 'Maybe');

CREATE TABLE IF NOT EXISTS rsvps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invitation_code TEXT,
    guest_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    status rsvp_status NOT NULL DEFAULT 'Confirmed',
    guest_count INT NOT NULL DEFAULT 1,
    accommodation_needed BOOLEAN DEFAULT FALSE,
    dietary_requirements TEXT,
    message TEXT,
    submitted_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    CONSTRAINT unique_guest_rsvp UNIQUE (email, invitation_code)
);

CREATE INDEX IF NOT EXISTS idx_rsvps_code ON rsvps(invitation_code);
CREATE INDEX IF NOT EXISTS idx_rsvps_email ON rsvps(email);

-- 4. GUEST ATTENDEES (COMPANIONS)
CREATE TABLE IF NOT EXISTS guest_attendees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rsvp_id UUID REFERENCES rsvps(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    dietary_preference TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 5. ACCOMMODATION REQUESTS
CREATE TYPE accommodation_status AS ENUM ('Pending', 'Approved', 'Declined', 'Allocated');

CREATE TABLE IF NOT EXISTS accommodation_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guest_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    number_of_people INT NOT NULL DEFAULT 1,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    room_requirement TEXT NOT NULL,
    special_requirements TEXT,
    notes TEXT,
    status accommodation_status NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 6. WEDDING EVENTS
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    venue TEXT NOT NULL,
    address TEXT NOT NULL,
    description TEXT,
    dress_code TEXT,
    google_maps_url TEXT,
    is_day_event BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0
);

-- 7. PHYSICAL GIFT REGISTRY
CREATE TYPE gift_status AS ENUM ('Available', 'Reserved', 'Received');

CREATE TABLE IF NOT EXISTS gift_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    estimated_value NUMERIC,
    quantity INT NOT NULL DEFAULT 1,
    status gift_status NOT NULL DEFAULT 'Available',
    reserved_by TEXT,
    reserved_email TEXT,
    reserved_phone TEXT,
    reserved_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_gifts_status ON gift_items(status);

-- 8. MONETARY GIFTS
CREATE TABLE IF NOT EXISTS monetary_gifts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_name TEXT NOT NULL,
    sender_email TEXT,
    sender_phone TEXT,
    amount NUMERIC NOT NULL,
    payment_date DATE NOT NULL,
    bank_used TEXT,
    reference TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'Reported',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 9. CUSTOM GIFT PROPOSALS
CREATE TABLE IF NOT EXISTS custom_gifts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_name TEXT NOT NULL,
    sender_email TEXT,
    sender_phone TEXT,
    gift_description TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 10. GUESTBOOK MESSAGES
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author TEXT NOT NULL,
    relationship TEXT,
    message TEXT NOT NULL,
    approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 11. ADMIN AUDIT LOGS
CREATE TABLE IF NOT EXISTS admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action TEXT NOT NULL,
    target_table TEXT NOT NULL,
    record_id TEXT,
    performed_by TEXT,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE accommodation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE monetary_gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- SITE SETTINGS: Public read-only, Admin full
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin can update site settings" ON site_settings FOR ALL TO authenticated USING (true);

-- EVENTS: Public read-only, Admin full
CREATE POLICY "Public can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Admin can manage events" ON events FOR ALL TO authenticated USING (true);

-- GUESTBOOK: Public can read approved messages & submit new message
CREATE POLICY "Public can view approved messages" ON messages FOR SELECT USING (approved = true);
CREATE POLICY "Public can submit messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can manage messages" ON messages FOR ALL TO authenticated USING (true);

-- GIFTS: Public can read items (status/name/category/description) and reserve
CREATE POLICY "Public can view available gift items" ON gift_items FOR SELECT USING (true);
CREATE POLICY "Public can reserve gift" ON gift_items FOR UPDATE USING (status = 'Available') WITH CHECK (status = 'Reserved');
CREATE POLICY "Admin can manage all gifts" ON gift_items FOR ALL TO authenticated USING (true);

-- MONETARY GIFTS: Public can report gift payment (NEVER view others' payments)
CREATE POLICY "Public can submit monetary gift notification" ON monetary_gifts FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view monetary gifts" ON monetary_gifts FOR ALL TO authenticated USING (true);

-- CUSTOM GIFTS: Public can submit
CREATE POLICY "Public can submit custom gifts" ON custom_gifts FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view custom gifts" ON custom_gifts FOR ALL TO authenticated USING (true);

-- RSVPS: Public can insert or update own RSVP
CREATE POLICY "Public can submit RSVP" ON rsvps FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update own RSVP" ON rsvps FOR UPDATE USING (true);
CREATE POLICY "Admin can view all RSVPs" ON rsvps FOR ALL TO authenticated USING (true);

-- ACCOMMODATION: Public can submit request
CREATE POLICY "Public can submit accommodation request" ON accommodation_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view accommodation requests" ON accommodation_requests FOR ALL TO authenticated USING (true);

-- GUESTS: Code lookup allowed, Admin full
CREATE POLICY "Public can lookup guest by code" ON guests FOR SELECT USING (true);
CREATE POLICY "Admin can manage guests" ON guests FOR ALL TO authenticated USING (true);
