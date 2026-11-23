-- =============================================
-- Nyaya Vedika - Bootstrap Data
-- Run AFTER schema.sql
-- =============================================

-- ===========================================
-- STEP 9: Create first tenant + user (bootstrap)
-- ===========================================

INSERT INTO tenants (id, name)
VALUES ('00000000-0000-0000-0000-000000000001', 'Bootstrap Tenant');

INSERT INTO users (id, email, name, tenant_id, role)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'admin@example.com',
  'Admin',
  '00000000-0000-0000-0000-000000000001',
  'owner'
);

-- ===========================================
-- STEP 10: Create session
-- ===========================================

INSERT INTO sessions (id, user_id, expires_at)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  DATE_ADD(NOW(), INTERVAL 1 DAY)
);

-- Cookie to set: session_id=00000000-0000-0000-0000-000000000002

-- ===========================================
-- STEP 11: Test isolation - second tenant
-- ===========================================

INSERT INTO tenants (id, name)
VALUES ('00000000-0000-0000-0000-000000000010', 'Second Tenant');

-- Verify isolation:
-- SELECT * FROM cases WHERE tenant_id='00000000-0000-0000-0000-000000000010';
-- Should return empty.
