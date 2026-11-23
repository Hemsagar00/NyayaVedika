-- NyayaVedika Production Database Schema (PostgreSQL + pgvector on Supabase)
-- Extension for AI Legal Semantic Search
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 1. Courts
CREATE TABLE IF NOT EXISTS courts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL, -- e.g. 'SC', 'DELHI_HC', 'BOMBAY_HC'
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('supreme_court', 'high_court', 'tribunal', 'district_court')),
    jurisdiction VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Judgments & Precedents
CREATE TABLE IF NOT EXISTS judgments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    court_id UUID NOT NULL REFERENCES courts(id) ON DELETE CASCADE,
    case_number VARCHAR(100) NOT NULL,
    title VARCHAR(500) NOT NULL, -- e.g. 'Poornima Gupta v. Saurav Gupta'
    petitioner TEXT,
    respondent TEXT,
    citation VARCHAR(255), -- e.g. '(2026) 2 SCC 104'
    neutral_citation VARCHAR(255), -- e.g. '2026 INSC 142'
    date_of_judgment DATE NOT NULL,
    bench TEXT[], -- Array of judges e.g. ['Dr. D.Y. Chandrachud', 'B.V. Nagarathna']
    bench_strength INT DEFAULT 1,
    judgment_text TEXT NOT NULL,
    ratio_decidendi TEXT,
    headnotes TEXT,
    disposition VARCHAR(100), -- 'Allowed', 'Dismissed', 'Partly Allowed'
    embedding VECTOR(1536), -- Vector representation of ratio + facts for semantic search
    views_count INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_judgments_court ON judgments(court_id);
CREATE INDEX IF NOT EXISTS idx_judgments_date ON judgments(date_of_judgment DESC);
CREATE INDEX IF NOT EXISTS idx_judgments_citation ON judgments(citation);
CREATE INDEX IF NOT EXISTS idx_judgments_title ON judgments USING GIN (to_tsvector('english', title || ' ' || coalesce(ratio_decidendi, '')));

-- 3. Bare Acts & Statutory Library
CREATE TABLE IF NOT EXISTS bare_acts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    act_code VARCHAR(50) UNIQUE NOT NULL, -- 'BNS', 'BNSS', 'BSA', 'IPC', 'CRPC'
    title VARCHAR(300) NOT NULL,
    act_number VARCHAR(50),
    enactment_year INT NOT NULL,
    status VARCHAR(50) DEFAULT 'in_force' CHECK (status IN ('in_force', 'repealed', 'amended')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bare_act_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    act_id UUID NOT NULL REFERENCES bare_acts(id) ON DELETE CASCADE,
    section_number VARCHAR(50) NOT NULL,
    section_title VARCHAR(300) NOT NULL,
    content TEXT NOT NULL,
    illustrations TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(act_id, section_number)
);

CREATE INDEX IF NOT EXISTS idx_act_section ON bare_act_sections(act_id, section_number);

-- 4. Legal News & Articles
CREATE TABLE IF NOT EXISTS legal_news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'supreme_court', 'high_court', 'tax', 'corporate', 'tribunal'
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    court_id UUID REFERENCES courts(id) ON DELETE SET NULL,
    source_url TEXT,
    image_url TEXT,
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_news_category ON legal_news(category, published_at DESC);

-- 5. Advocate Digital Diary & Cause Lists (Integrated from CourtDiary)
CREATE TABLE IF NOT EXISTS advocate_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_user_id VARCHAR(255) NOT NULL, -- Clerk user id
    case_number VARCHAR(100) NOT NULL,
    court_id UUID REFERENCES courts(id),
    court_hall VARCHAR(50),
    item_number INT,
    client_name VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50),
    opposite_party VARCHAR(255),
    opposite_counsel VARCHAR(255),
    stage_of_case VARCHAR(100), -- 'Admission', 'Pleadings', 'Evidence', 'Final Hearing', 'Orders'
    next_hearing_date DATE,
    notes TEXT,
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_advocate_cases_user ON advocate_cases(clerk_user_id, next_hearing_date);

-- 6. Saved Research & Case Binders
CREATE TABLE IF NOT EXISTS research_binders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS binder_judgments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    binder_id UUID NOT NULL REFERENCES research_binders(id) ON DELETE CASCADE,
    judgment_id UUID NOT NULL REFERENCES judgments(id) ON DELETE CASCADE,
    notes TEXT,
    added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(binder_id, judgment_id)
);
