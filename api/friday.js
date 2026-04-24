// api/friday.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, caseId, docType, context } = req.body;
  const GATEWAY_URL = process.env.FRIDAY_GATEWAY_URL; 

  if (!GATEWAY_URL) {
    return res.status(500).json({ 
      error: 'Friday Gateway URL not configured in environment variables.' 
    });
  }

  const orchestratedPrompt = `
    [SYSTEM: FRIDAY_ORCHESTRATION]
    CASE_ID: ${caseId || 'GENERAL'}
    DOC_TYPE: ${docType || 'QUERY'}
    
    INSTRUCTION: 
    1. Retrieve all previous drafts and evidence from the Case Vault for ${caseId}.
    2. Maintain 100% consistency with previous facts, dates, and arguments.
    3. Use the a-grade legal research from the RAG Statutes and Precedents folders.
    4. Generate the response for: "${message}"
  `;

  try {
    const response = await fetch(`${GATEWAY_URL}/agent/turn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: orchestratedPrompt,
        model: 'gemma4:31b-cloud',
        sessionKey: `case:${caseId || 'general'}`
      }),
    });

    const data = await response.json();
    return res.status(200).json({ result: data.output });
  } catch (error) {
    return res.status(500).json({ error: 'Friday Bridge Connection Failed' });
  }
}
