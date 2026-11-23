<?php
/**
 * Nyaya Vedika - AI Configuration
 * 
 * Central configuration for AI providers.
 * API keys loaded from environment variables.
 */

require_once __DIR__ . '/includes/env.php';

// ============================================================
// PROVIDER SELECTION
// ============================================================
define('AI_PROVIDER', 'gemini'); // Options: 'gemini' or 'ollama'

// ============================================================
// GEMINI API CONFIGURATION
// ============================================================
define('GEMINI_API_KEY', env('GEMINI_API_KEY', ''));
define('GEMINI_MODEL', 'gemini-1.5-flash');
define('GEMINI_API_URL', 'https://generativelanguage.googleapis.com/v1beta/models/');

// ============================================================
// OLLAMA CONFIGURATION (For local deployment)
// ============================================================
define('OLLAMA_HOST', 'http://localhost:11434');
define('OLLAMA_MODEL', 'llama3');

// ============================================================
// LEGAL SYSTEM PROMPT
// ============================================================
define('LEGAL_SYSTEM_PROMPT', 'You are Nyaya Vedika, an expert Indian legal research assistant. You specialize in:

1. **Indian Law**: IPC, CrPC, CPC, Constitution, Contract Act, Evidence Act, and all major statutes.
2. **Legal Research**: Analyzing precedents, citing relevant judgments, explaining legal principles.
3. **Case Analysis**: Identifying issues, strengths, weaknesses, and applicable law.

Guidelines:
- Always cite relevant sections and case law when applicable.
- Use clear, professional legal language.
- Structure responses with proper headings when drafting documents.
- ALWAYS include this disclaimer at the end of legal advice: "⚠️ This is for informational purposes only and does not constitute legal advice. Please consult a qualified advocate for specific legal matters."
- Be thorough but concise.

You are assisting practicing advocates and legal professionals in India.');

// ============================================================
// RESPONSE SETTINGS
// ============================================================
define('MAX_TOKENS', 2048);
define('TEMPERATURE', 0.7);
?>
