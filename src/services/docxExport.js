/**
 * NyayaVedika — Document Export Service
 * Handles export to .txt, .doc (Word-compatible HTML), and .docx
 */

// Export as plain text
export function exportAsTxt(content, filename) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  triggerDownload(blob, `${filename}.txt`);
}

// Export as Word-compatible .doc (HTML format that Word opens natively)
export function exportAsDoc(content, filename) {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <style>
    body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 2.0;
           max-width: 7.5in; margin: 1in auto; padding: 20px; color: #000; }
    p { margin: 6pt 0; }
    h1 { font-size: 16pt; font-weight: bold; text-align: center; margin-bottom: 24pt; }
    h2 { font-size: 14pt; font-weight: bold; margin-top: 18pt; }
    h3 { font-size: 12pt; font-weight: bold; margin-top: 12pt; }
    pre { font-family: 'Times New Roman', serif; white-space: pre-wrap; line-height: 2.0; }
    .numbered { margin-left: 36pt; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
<pre>${escapeHTML(content)}</pre>
</body>
</html>`;

  const blob = new Blob([html], {
    type: 'application/msword;charset=utf-8'
  });
  triggerDownload(blob, `${filename}.doc`);
}

// Export as simple text (same as TXT but keeps the API consistent)
export function exportDocument(content, format, filename) {
  const baseName = filename || `nyayavedika-draft-${Date.now()}`;
  switch (format) {
    case 'doc':
      return exportAsDoc(content, baseName);
    case 'txt':
    default:
      return exportAsTxt(content, baseName);
  }
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
