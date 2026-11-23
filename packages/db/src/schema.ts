import {
  pgTable,
  uuid,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
  pgEnum,
  index,
  uniqueIndex,
  primaryKey,
  check
} from 'drizzle-orm/pg-core'

// Enums
export const subscriptionTierEnum = pgEnum('subscription_tier', ['free', 'pro', 'enterprise'])
export const subscriptionStatusEnum = pgEnum('subscription_status', ['active', 'cancelled', 'past_due', 'trialing'])
export const actStatusEnum = pgEnum('act_status', ['active', 'repealed', 'amended', 'bill', 'ordinance'])
export const jurisdictionLevelEnum = pgEnum('jurisdiction_level', ['central', 'state', 'subordinate'])
export const courtLevelEnum = pgEnum('court_level', ['supreme', 'high', 'district', 'tribunal', 'commission'])
export const judgmentStatusEnum = pgEnum('judgment_status', ['reserved', 'delivered', 'recalled'])
export const mappingTypeEnum = pgEnum('mapping_type', ['direct', 'partial', 'split', 'merged', 'new', 'repealed'])
export const billStatusEnum = pgEnum('bill_status', ['introduced', 'committee', 'passed_ls', 'passed_rs', 'assented', 'enacted', 'lapsed', 'withdrawn'])
export const contentTypeEnum = pgEnum('content_type', ['act', 'judgment', 'draft'])

// ======================
// CORE: Users & Auth
// ======================
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  avatarUrl: varchar('avatar_url', { length: 500 }),
  language: varchar('language', { length: 10 }).default('en'),
  theme: varchar('theme', { length: 20 }).default('system'),
  subscriptionTier: subscriptionTierEnum('subscription_tier').default('free'),
  subscriptionStatus: subscriptionStatusEnum('subscription_status').default('active'),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }).unique(),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }).unique(),
  aiUsageCount: integer('ai_usage_count').default(0),
  aiUsageResetAt: timestamp('ai_usage_reset_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  lastActiveAt: timestamp('last_active_at', { withTimezone: true })
}, (table) => ({
  stripeCustomerIdx: index('users_stripe_customer_idx').on(table.stripeCustomerId),
  subscriptionTierIdx: index('users_subscription_tier_idx').on(table.subscriptionTier)
}))

export const userBookmarks = pgTable('user_bookmarks', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  contentType: contentTypeEnum('content_type').notNull(),
  contentId: uuid('content_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
}, (table) => ({
  userContentIdx: index('user_bookmarks_user_content_idx').on(table.userId, table.contentType),
  uniqueBookmark: uniqueIndex('user_bookmarks_unique').on(table.userId, table.contentType, table.contentId)
}))

export const userDownloads = pgTable('user_downloads', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  contentType: contentTypeEnum('content_type').notNull(),
  contentId: uuid('content_id').notNull(),
  downloadedAt: timestamp('downloaded_at', { withTimezone: true }).defaultNow(),
  expiresAt: timestamp('expires_at', { withTimezone: true })
}, (table) => ({
  userContentIdx: index('user_downloads_user_content_idx').on(table.userId, table.contentType)
}))

export const searchHistory = pgTable('search_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  query: text('query').notNull(),
  filters: jsonb('filters').default({}),
  resultsCount: integer('results_count').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
}, (table) => ({
  userCreatedIdx: index('search_history_user_created_idx').on(table.userId, table.createdAt.desc())
}))

// ======================
// LEGAL CONTENT: Acts
// ======================
export const acts = pgTable('acts', {
  id: uuid('id').primaryKey().defaultRandom(),
  sourceId: varchar('source_id', { length: 255 }).notNull().unique(),
  title: text('title').notNull(),
  shortTitle: varchar('short_title', { length: 255 }),
  year: integer('year'),
  number: varchar('number', { length: 50 }),
  jurisdiction: jurisdictionLevelEnum('jurisdiction').notNull(),
  state: varchar('state', { length: 100 }),
  ministry: varchar('ministry', { length: 255 }),
  department: varchar('department', { length: 255 }),
  status: actStatusEnum('status').default('active'),
  language: varchar('language', { length: 10 }).default('en'),
  availableLanguages: text('available_languages').array().default(['en']),
  fullText: text('full_text'),
  sections: jsonb('sections').default([]),
  metadata: jsonb('metadata').default({}),
  pdfUrl: varchar('pdf_url', { length: 500 }),
  sourceUrl: varchar('source_url', { length: 500 }),
  lastUpdated: timestamp('last_updated', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
}, (table) => ({
  jurisdictionIdx: index('acts_jurisdiction_idx').on(table.jurisdiction),
  stateIdx: index('acts_state_idx').on(table.state),
  statusIdx: index('acts_status_idx').on(table.status),
  languagesIdx: index('acts_languages_idx').using('gin', table.availableLanguages),
  sectionsIdx: index('acts_sections_idx').using('gin', table.sections),
  searchIdx: index('acts_search_idx').using('gin', table.fullText)
}))

export const sectionMappings = pgTable('section_mappings', {
  id: uuid('id').primaryKey().defaultRandom(),
  fromActId: uuid('from_act_id').notNull().references(() => acts.id, { onDelete: 'cascade' }),
  fromSection: varchar('from_section', { length: 100 }).notNull(),
  toActId: uuid('to_act_id').notNull().references(() => acts.id, { onDelete: 'cascade' }),
  toSection: varchar('to_section', { length: 100 }).notNull(),
  mappingType: mappingTypeEnum('mapping_type').default('direct'),
  notes: text('notes'),
  confidence: varchar('confidence', { length: 20 }).default('medium'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
}, (table) => ({
  fromActIdx: index('section_mappings_from_act_idx').on(table.fromActId),
  toActIdx: index('section_mappings_to_act_idx').on(table.toActId),
  uniqueMapping: uniqueIndex('section_mappings_unique').on(table.fromActId, table.fromSection, table.toActId, table.toSection)
}))

export const constitutionArticles = pgTable('constitution_articles', {
  id: uuid('id').primaryKey().defaultRandom(),
  part: varchar('part', { length: 100 }).notNull(),
  chapter: varchar('chapter', { length: 100 }),
  article: varchar('article', { length: 50 }).notNull(),
  title: varchar('title', { length: 255 }),
  content: text('content').notNull(),
  amendments: jsonb('amendments').default([]),
  language: varchar('language', { length: 10 }).default('en'),
  availableLanguages: text('available_languages').array().default(['en']),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
}, (table) => ({
  partIdx: index('constitution_articles_part_idx').on(table.part),
  languagesIdx: index('constitution_articles_languages_idx').using('gin', table.availableLanguages),
  searchIdx: index('constitution_articles_search_idx').using('gin', table.content),
  uniqueArticleLang: uniqueIndex('constitution_articles_unique_lang').on(table.article, table.language)
}))

// ======================
// LEGAL CONTENT: Courts & Judgments
// ======================
export const courts = pgTable('courts', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  level: courtLevelEnum('level').notNull(),
  state: varchar('state', { length: 100 }),
  district: varchar('district', { length: 100 }),
  website: varchar('website', { length: 500 }),
  eCourtsEnabled: boolean('e_courts_enabled').default(false),
  cnrPattern: varchar('cnr_pattern', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
}, (table) => ({
  levelIdx: index('courts_level_idx').on(table.level),
  stateIdx: index('courts_state_idx').on(table.state)
}))

export const judgments = pgTable('judgments', {
  id: uuid('id').primaryKey().defaultRandom(),
  courtId: uuid('court_id').notNull().references(() => courts.id, { onDelete: 'cascade' }),
  caseNumber: varchar('case_number', { length: 255 }),
  cnrNumber: varchar('cnr_number', { length: 100 }),
  title: text('title').notNull(),
  petitioner: varchar('petitioner', { length: 500 }),
  respondent: varchar('respondent', { length: 500 }),
  judges: text('judges').array().default([]),
  bench: varchar('bench', { length: 255 }),
  judgmentDate: timestamp('judgment_date', { withTimezone: true }).notNull(),
  citation: varchar('citation', { length: 255 }),
  neutralCitation: varchar('neutral_citation', { length: 255 }),
  status: judgmentStatusEnum('status').default('delivered'),
  subjectCategory: text('subject_category').array().default([]),
  keywords: text('keywords').array().default([]),
  fullText: text('full_text'),
  pdfUrl: varchar('pdf_url', { length: 500 }),
  pdfHash: varchar('pdf_hash', { length: 64 }),
  aiSummary: text('ai_summary'),
  aiKeyHoldings: text('ai_key_holdings').array().default([]),
  aiIssues: text('ai_issues').array().default([]),
  aiReasoning: text('ai_reasoning'),
  citedCases: uuid('cited_cases').array().default([]),
  citingCases: uuid('citing_cases').array().default([]),
  language: varchar('language', { length: 10 }).default('en'),
  embedding: text('embedding'), // Will be vector(1536) in Postgres
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  indexedAt: timestamp('indexed_at', { withTimezone: true })
}, (table) => ({
  courtDateIdx: index('judgments_court_date_idx').on(table.courtId, table.judgmentDate.desc()),
  cnrIdx: index('judgments_cnr_idx').on(table.cnrNumber),
  citationIdx: index('judgments_citation_idx').on(table.citation),
  subjectCategoryIdx: index('judgments_subject_category_idx').using('gin', table.subjectCategory),
  keywordsIdx: index('judgments_keywords_idx').using('gin', table.keywords),
  searchIdx: index('judgments_search_idx').using('gin', table.fullText)
}))

export const legalDrafts = pgTable('legal_drafts', {
  id: uuid('id').primaryKey().defaultRandom(),
  category: varchar('category', { length: 100 }).notNull(),
  subCategory: varchar('sub_category', { length: 100 }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  language: varchar('language', { length: 10 }).default('en'),
  availableLanguages: text('available_languages').array().default(['en']),
  templateText: text('template_text').notNull(),
  variables: jsonb('variables').default([]),
  tags: text('tags').array().default([]),
  aiGenerated: boolean('ai_generated').default(false),
  source: varchar('source', { length: 50 }).default('user'),
  downloads: integer('downloads').default(0),
  rating: varchar('rating', { length: 10 }).default('0'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
}, (table) => ({
  categoryIdx: index('legal_drafts_category_idx').on(table.category),
  languageIdx: index('legal_drafts_language_idx').on(table.language),
  languagesIdx: index('legal_drafts_languages_idx').using('gin', table.availableLanguages),
  tagsIdx: index('legal_drafts_tags_idx').using('gin', table.tags),
  searchIdx: index('legal_drafts_search_idx').using('gin', table.title)
}))

export const userDrafts = pgTable('user_drafts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  draftId: uuid('draft_id').references(() => legalDrafts.id, { onDelete: 'set null' }),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  variablesFilled: jsonb('variables_filled').default({}),
  isTemplate: boolean('is_template').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
}, (table) => ({
  userUpdatedIdx: index('user_drafts_user_updated_idx').on(table.userId, table.updatedAt.desc())
}))

export const legalNews = pgTable('legal_news', {
  id: uuid('id').primaryKey().defaultRandom(),
  source: varchar('source', { length: 100 }).notNull(),
  sourceUrl: varchar('source_url', { length: 500 }).notNull().unique(),
  title: varchar('title', { length: 500 }).notNull(),
  summary: text('summary'),
  content: text('content'),
  category: varchar('category', { length: 100 }),
  courtId: uuid('court_id').references(() => courts.id, { onDelete: 'set null' }),
  judgmentId: uuid('judgment_id').references(() => judgments.id, { onDelete: 'set null' }),
  publishedAt: timestamp('published_at', { withTimezone: true }).notNull(),
  language: varchar('language', { length: 10 }).default('en'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
}, (table) => ({
  publishedIdx: index('legal_news_published_idx').on(table.publishedAt.desc()),
  categoryIdx: index('legal_news_category_idx').on(table.category),
  courtIdx: index('legal_news_court_idx').on(table.courtId),
  searchIdx: index('legal_news_search_idx').using('gin', table.title)
}))

export const billsOrdinances = pgTable('bills_ordinances', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: varchar('type', { length: 50 }).notNull(), // 'parliament_bill', 'state_bill', 'ordinance'
  house: varchar('house', { length: 100 }),
  state: varchar('state', { length: 100 }),
  title: varchar('title', { length: 500 }).notNull(),
  billNumber: varchar('bill_number', { length: 100 }),
  status: billStatusEnum('status').default('introduced'),
  introducedDate: timestamp('introduced_date', { withTimezone: true }),
  passedDate: timestamp('passed_date', { withTimezone: true }),
  assentedDate: timestamp('assented_date', { withTimezone: true }),
  pdfUrl: varchar('pdf_url', { length: 500 }),
  summary: text('summary'),
  progressStages: jsonb('progress_stages').default([]),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
}, (table) => ({
  typeIdx: index('bills_ordinances_type_idx').on(table.type),
  stateIdx: index('bills_ordinances_state_idx').on(table.state),
  statusIdx: index('bills_ordinances_status_idx').on(table.status)
}))

export const governmentSchemes = pgTable('government_schemes', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: varchar('code', { length: 100 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  ministry: varchar('ministry', { length: 255 }),
  state: varchar('state', { length: 100 }),
  category: varchar('category', { length: 100 }),
  description: text('description'),
  eligibility: text('eligibility'),
  benefits: text('benefits'),
  applicationProcess: text('application_process'),
  applyUrl: varchar('apply_url', { length: 500 }),
  launchDate: timestamp('launch_date', { withTimezone: true }),
  lastUpdated: timestamp('last_updated', { withTimezone: true }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
}, (table) => ({
  stateIdx: index('government_schemes_state_idx').on(table.state),
  categoryIdx: index('government_schemes_category_idx').on(table.category),
  activeIdx: index('government_schemes_active_idx').on(table.isActive)
}))

export const legalTerms = pgTable('legal_terms', {
  id: uuid('id').primaryKey().defaultRandom(),
  term: varchar('term', { length: 255 }).notNull().unique(),
  definition: text('definition').notNull(),
  language: varchar('language', { length: 10 }).default('en'),
  category: varchar('category', { length: 100 }),
  relatedTerms: text('related_terms').array().default([]),
  examples: text('examples').array().default([]),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
}, (table) => ({
  languageIdx: index('legal_terms_language_idx').on(table.language),
  searchIdx: index('legal_terms_search_idx').using('gin', table.term)
}))

export const courtFeeRules = pgTable('court_fee_rules', {
  id: uuid('id').primaryKey().defaultRandom(),
  state: varchar('state', { length: 100 }).notNull(),
  caseType: varchar('case_type', { length: 100 }).notNull(),
  feeStructure: jsonb('fee_structure').notNull(),
  effectiveFrom: timestamp('effective_from', { withTimezone: true }).notNull(),
  effectiveTo: timestamp('effective_to', { withTimezone: true }),
  sourceUrl: varchar('source_url', { length: 500 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
}, (table) => ({
  stateIdx: index('court_fee_rules_state_idx').on(table.state),
  uniqueRule: uniqueIndex('court_fee_rules_unique').on(table.state, table.caseType, table.effectiveFrom)
}))

// ======================
// AI & ANALYTICS
// ======================
export const aiUsageLogs = pgTable('ai_usage_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  feature: varchar('feature', { length: 50 }).notNull(), // 'ai-search', 'ai-analysis', 'ai-drafting', 'ai-summary'
  inputTokens: integer('input_tokens').default(0),
  outputTokens: integer('output_tokens').default(0),
  model: varchar('model', { length: 100 }),
  latencyMs: integer('latency_ms'),
  success: boolean('success').default(true),
  error: text('error'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
}, (table) => ({
  userCreatedIdx: index('ai_usage_logs_user_created_idx').on(table.userId, table.createdAt.desc()),
  featureIdx: index('ai_usage_logs_feature_idx').on(table.feature)
}))

export const subscriptionPlans = pgTable('subscription_plans', {
  id: uuid('id').primaryKey().defaultRandom(),
  stripePriceId: varchar('stripe_price_id', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 100 }).notNull(),
  tier: subscriptionTierEnum('tier').notNull(),
  priceCents: integer('price_cents').notNull(),
  currency: varchar('currency', { length: 3 }).default('inr'),
  interval: varchar('interval', { length: 20 }).notNull(), // 'month', 'year'
  features: jsonb('features').default({}),
  limits: jsonb('limits').default({}),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
})

// Type exports
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Act = typeof acts.$inferSelect
export type NewAct = typeof acts.$inferInsert
export type Judgment = typeof judgments.$inferSelect
export type NewJudgment = typeof judgments.$inferInsert
export type LegalDraft = typeof legalDrafts.$inferSelect
export type NewLegalDraft = typeof legalDrafts.$inferInsert
export type Court = typeof courts.$inferSelect
export type NewCourt = typeof courts.$inferInsert