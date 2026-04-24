/**
 * NyayaVedika — Friday Intelligence Layer
 * Routes all requests through the Friday Bridge for Case-Specific Memory
 */

async function askFriday(userMessage, options = {}) {
  const { caseId = 'general', docType = 'query', maxTokens = 4096 } = options;

  try {
    const response = await fetch('/api/friday', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        caseId: caseId,
        docType: docType,
        maxTokens: maxTokens
      }),
    });

    if (!response.ok) throw new Error(`Friday Bridge Error: ${response.status}`);
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Friday Bridge Error:", error);
    throw error;
  }
}

// --- Task-specific helpers updated for Case Memory ---

export async function draftDocument(params) {
  const { caseId, docType, court, petitioner, respondent, facts, reliefSought } = params;
  
  const prompt = `
    Draft a complete ${docType} for filing before the ${court}.
    CASE ID: ${caseId}
    PARTIES: ${petitioner} vs ${respondent}
    FACTS: ${facts}
    RELIEF: ${reliefSought}
    
    REQUIREMENT: Ensure consistency with all previous drafts stored under ${caseId}.
  `;
  return askFriday(prompt, { caseId, docType: 'draft' });
}

export async function explainClause(clauseText, caseId = 'general') {
  return askFriday(`Explain this clause for Case ${caseId} in plain English:\n\n"${clauseText}"`, { caseId });
}

export async function suggestGrounds(docType, facts, caseId = 'general') {
  return askFriday(`Suggest strongest legal grounds for a ${docType} in Case ${caseId} based on these facts:\n\n${facts}`, { caseId });
}

export async function summarizeDocument(documentText, caseId = 'general') {
  return askFriday(`Summarize this document for Case ${caseId} - identify parties, key orders, and deadlines:\n\n${documentText}`, { caseId });
}

export { askFriday as askAI }; // Alias for backward compatibility
