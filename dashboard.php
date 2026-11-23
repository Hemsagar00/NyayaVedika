<?php
session_start();
// Security: Kick user out if not logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
$user_name = isset($_SESSION['user_name']) ? $_SESSION['user_name'] : "Counsel";

// Determine greeting based on time
$hour = (int)date('H');
if ($hour < 12) {
    $greeting = "Good morning";
} elseif ($hour < 17) {
    $greeting = "Good afternoon";
} else {
    $greeting = "Good evening";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Workspace | Nyaya Vedika</title>
    <!-- Marked.js for Markdown rendering -->
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <style>
        :root {
            --sidebar-bg: #f8f9fa;
            --main-bg: #ffffff;
            --text-main: #1a1a1a;
            --accent: #223456;
            --accent-light: #2d4470;
            --border: #e1e4e8;
            --user-bubble: #223456;
            --ai-bubble: #f8f9fa;
        }

        * { box-sizing: border-box; }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            display: flex;
            height: 100vh;
            overflow: hidden;
            background-color: var(--main-bg);
        }

        /* --- SIDEBAR --- */
        .sidebar {
            width: 260px;
            background-color: var(--sidebar-bg);
            border-right: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            padding: 20px;
            transition: transform 0.3s ease;
        }

        .logo-area {
            font-family: 'Georgia', serif;
            font-weight: bold;
            font-size: 1.2rem;
            color: var(--accent);
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .new-chat-btn {
            background: #fff;
            border: 1px solid var(--border);
            padding: 12px;
            border-radius: 8px;
            color: var(--text-main);
            cursor: pointer;
            text-align: left;
            margin-bottom: 25px;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.2s;
            box-shadow: 0 2px 5px rgba(0,0,0,0.02);
        }
        .new-chat-btn:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-1px); }

        /* Upload button */
        .upload-btn {
            width: 52px;
            height: 52px;
            background: #fff;
            border: 1px solid var(--border);
            border-radius: 12px;
            color: #666;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            flex-shrink: 0;
            position: relative;
            overflow: hidden;
        }
        .upload-btn:hover { border-color: var(--accent); color: var(--accent); }
        .upload-btn input[type="file"] {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }
        .upload-btn svg { width: 20px; height: 20px; pointer-events: none; }
        .upload-btn.uploading { background: #f0f0f0; pointer-events: none; }

        .menu-label { font-size: 0.7rem; color: #888; text-transform: uppercase; margin-bottom: 12px; font-weight: 600; letter-spacing: 0.5px; }
        
        .history-list { list-style: none; padding: 0; margin: 0; flex: 1; overflow-y: auto; }
        .history-item {
            padding: 10px;
            margin-bottom: 4px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
            color: #555;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .history-item:hover { background: #eef0f3; color: #000; }
        .history-item.active { 
            background: var(--accent); 
            color: #fff; 
        }
        .history-item.active:hover { 
            background: var(--accent-light); 
        }

        .user-menu {
            border-top: 1px solid var(--border);
            padding-top: 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.9rem;
        }
        .logout-link { color: #d9534f; text-decoration: none; font-size: 0.85rem; }

        /* --- MAIN CONTENT --- */
        .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
        }

        /* --- CHAT CONTAINER --- */
        .chat-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        /* --- MESSAGES AREA --- */
        .messages-area {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
        }

        /* Welcome state (shown when no messages) */
        .welcome-state {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 20px;
        }

        .welcome-state h1 {
            font-family: 'Georgia', serif;
            font-weight: 400;
            color: var(--accent);
            margin: 0 0 10px 0;
            font-size: 2.2rem;
        }

        .welcome-state p {
            color: #666;
            margin-bottom: 30px;
            max-width: 500px;
            line-height: 1.5;
        }

        .suggestions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 10px;
        }

        .suggestion-chip {
            padding: 10px 18px;
            background: #fff;
            border: 1px solid #e1e4e8;
            border-radius: 25px;
            font-size: 0.9rem;
            color: #555;
            cursor: pointer;
            transition: all 0.2s;
        }
        .suggestion-chip:hover { 
            border-color: var(--accent); 
            color: var(--accent); 
            background: #f8fafc;
            transform: translateY(-1px);
        }

        /* Message bubbles */
        .message {
            max-width: 75%;
            margin-bottom: 16px;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .message.user {
            align-self: flex-end;
        }

        .message.assistant {
            align-self: flex-start;
        }

        .message-content {
            padding: 14px 18px;
            border-radius: 16px;
            line-height: 1.6;
            font-size: 0.95rem;
        }

        .message.user .message-content {
            background: var(--user-bubble);
            color: #fff;
            border-bottom-right-radius: 4px;
        }

        .message.assistant .message-content {
            background: var(--ai-bubble);
            color: var(--text-main);
            border: 1px solid var(--border);
            border-bottom-left-radius: 4px;
        }

        /* Markdown styling in AI responses */
        .message.assistant .message-content h1,
        .message.assistant .message-content h2,
        .message.assistant .message-content h3 {
            color: var(--accent);
            margin-top: 16px;
            margin-bottom: 8px;
        }
        .message.assistant .message-content h1:first-child,
        .message.assistant .message-content h2:first-child,
        .message.assistant .message-content h3:first-child {
            margin-top: 0;
        }

        .message.assistant .message-content ul,
        .message.assistant .message-content ol {
            padding-left: 20px;
            margin: 10px 0;
        }

        .message.assistant .message-content code {
            background: #e9ecef;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Consolas', monospace;
            font-size: 0.9em;
        }

        .message.assistant .message-content pre {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 16px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 12px 0;
        }

        .message.assistant .message-content pre code {
            background: none;
            padding: 0;
            color: inherit;
        }

        .message.assistant .message-content blockquote {
            border-left: 3px solid var(--accent);
            padding-left: 16px;
            margin: 12px 0;
            color: #555;
            font-style: italic;
        }

        .message.assistant .message-content strong {
            color: var(--accent);
        }

        .message.assistant .message-content p {
            margin: 8px 0;
        }
        .message.assistant .message-content p:first-child {
            margin-top: 0;
        }
        .message.assistant .message-content p:last-child {
            margin-bottom: 0;
        }

        /* Loading indicator */
        .loading-indicator {
            display: flex;
            gap: 6px;
            padding: 14px 18px;
            background: var(--ai-bubble);
            border: 1px solid var(--border);
            border-radius: 16px;
            border-bottom-left-radius: 4px;
            align-self: flex-start;
            margin-bottom: 16px;
        }

        .loading-dot {
            width: 8px;
            height: 8px;
            background: var(--accent);
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out both;
        }

        .loading-dot:nth-child(1) { animation-delay: -0.32s; }
        .loading-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
            40% { transform: scale(1); opacity: 1; }
        }

        /* --- INPUT AREA --- */
        .input-area {
            padding: 16px 20px 24px;
            background: #fff;
            border-top: 1px solid var(--border);
        }

        .input-wrapper {
            max-width: 800px;
            margin: 0 auto;
            display: flex;
            gap: 12px;
            align-items: flex-end;
        }

        .chat-input {
            flex: 1;
            padding: 16px 20px;
            border: 1px solid var(--border);
            border-radius: 12px;
            font-size: 1rem;
            outline: none;
            background: #fff;
            transition: all 0.2s;
            resize: none;
            min-height: 52px;
            max-height: 150px;
            font-family: inherit;
        }
        .chat-input:focus { 
            border-color: var(--accent); 
            box-shadow: 0 0 0 3px rgba(34, 52, 86, 0.1); 
        }
        .chat-input:disabled {
            background: #f5f5f5;
            cursor: not-allowed;
        }

        .send-btn {
            width: 52px;
            height: 52px;
            background: var(--accent);
            border: none;
            border-radius: 12px;
            color: #fff;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            flex-shrink: 0;
        }
        .send-btn:hover { background: var(--accent-light); transform: scale(1.02); }
        .send-btn:disabled { background: #ccc; cursor: not-allowed; transform: none; }

        .send-btn svg {
            width: 20px;
            height: 20px;
        }

        /* --- MOBILE RESPONSIVE --- */
        .mobile-header { display: none; }

        @media (max-width: 768px) {
            .sidebar { display: none; }
            .mobile-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                border-bottom: 1px solid var(--border);
                background: #fff;
            }
            .welcome-state h1 { font-size: 1.6rem; }
            .message { max-width: 90%; }
            .input-area { padding: 12px 16px 20px; }
            .suggestion-chip { font-size: 0.8rem; padding: 8px 14px; }
        }

        /* Error message */
        .error-message {
            background: #fee2e2;
            border: 1px solid #fca5a5;
            color: #991b1b;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 16px;
            align-self: center;
            max-width: 90%;
            text-align: center;
        }
    </style>
</head>
<body>

    <nav class="sidebar">
        <div class="logo-area">⚖️ Nyaya Vedika</div>
        <button class="new-chat-btn" id="newChatBtn">+ New Case</button>

        <div class="menu-label">Recent Cases</div>
        <ul class="history-list" id="caseList">
            <li class="history-item loading-cases">Loading cases...</li>
        </ul>

        <div class="user-menu">
            <span><?php echo htmlspecialchars($user_name); ?></span>
            <a href="logout.php" class="logout-link">Logout</a>
        </div>
    </nav>

    <div class="main-content">
        <div class="mobile-header">
            <span style="font-weight:bold; color:var(--accent);">⚖️ Nyaya Vedika</span>
            <a href="logout.php" style="color:#d9534f; text-decoration:none; font-size:0.9rem;">Logout</a>
        </div>

        <div class="chat-container">
            <div class="messages-area" id="messagesArea">
                <!-- Welcome state - shown when no messages -->
                <div class="welcome-state" id="welcomeState">
                    <h1><?php echo $greeting; ?>, <?php echo htmlspecialchars($user_name); ?>.</h1>
                    <p>I am ready to assist with case research, drafting, and analysis. How shall we begin?</p>
                    <div class="suggestions">
                        <div class="suggestion-chip" data-query="Draft a bail petition for a client accused under Section 420 IPC">📝 Draft Bail Petition</div>
                        <div class="suggestion-chip" data-query="Find relevant case law on anticipatory bail in cheque bounce cases">🔍 Search Case Law</div>
                        <div class="suggestion-chip" data-query="What is the procedure for filing a consumer complaint?">⚖️ Legal Procedure</div>
                    </div>
                </div>
            </div>

            <div class="input-area">
                <div class="input-wrapper">
                    <textarea 
                        class="chat-input" 
                        id="chatInput" 
                        placeholder="Ask a legal query, draft a notice, or research case law..."
                        rows="1"
                    ></textarea>
                    <button class="upload-btn" id="uploadBtn" title="Upload PDF">
                        <input type="file" id="pdfInput" accept="application/pdf">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button class="send-btn" id="sendBtn" title="Send message">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Chat state
        let chatHistory = [];
        let isLoading = false;
        let currentCaseId = null;
        let cases = [];

        // DOM elements
        const messagesArea = document.getElementById('messagesArea');
        const welcomeState = document.getElementById('welcomeState');
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        const newChatBtn = document.getElementById('newChatBtn');
        const suggestionChips = document.querySelectorAll('.suggestion-chip');

        // Configure marked.js for safe rendering
        marked.setOptions({
            breaks: true,
            gfm: true
        });

        // Auto-resize textarea
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 150) + 'px';
        });

        // Send message on Enter (Shift+Enter for new line)
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // Send button click
        sendBtn.addEventListener('click', sendMessage);

        // Suggestion chips
        suggestionChips.forEach(chip => {
            chip.addEventListener('click', function() {
                const query = this.getAttribute('data-query');
                chatInput.value = query;
                chatInput.focus();
                sendMessage();
            });
        });

        // New chat button - creates a new case
        newChatBtn.addEventListener('click', createNewCase);

        // Create new case function
        async function createNewCase() {
            try {
                const response = await fetch('api/case_create.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: 'New Case' })
                });
                const data = await response.json();
                
                if (data.success) {
                    currentCaseId = data.case_id;
                    chatHistory = [];
                    
                    // Clear UI
                    const messages = messagesArea.querySelectorAll('.message, .loading-indicator, .error-message');
                    messages.forEach(msg => msg.remove());
                    welcomeState.style.display = 'flex';
                    chatInput.value = '';
                    chatInput.focus();
                    
                    // Reload case list
                    loadCases();
                } else {
                    showError('Failed to create new case.');
                }
            } catch (error) {
                console.error('Create case error:', error);
                showError('Network error creating case.');
            }
        }

        // Load cases from database
        async function loadCases() {
            const caseList = document.getElementById('caseList');
            try {
                const response = await fetch('api/case_list.php');
                const data = await response.json();
                
                if (data.success) {
                    cases = data.cases;
                    renderCaseList();
                }
            } catch (error) {
                console.error('Load cases error:', error);
                caseList.innerHTML = '<li class="history-item">Failed to load cases</li>';
            }
        }

        // Render case list in sidebar
        function renderCaseList() {
            const caseList = document.getElementById('caseList');
            
            if (cases.length === 0) {
                caseList.innerHTML = '<li class="history-item" style="color:#999;">No cases yet</li>';
                return;
            }
            
            caseList.innerHTML = cases.map(c => `
                <li class="history-item ${c.id == currentCaseId ? 'active' : ''}" 
                    data-case-id="${c.id}" 
                    onclick="loadCase(${c.id})">
                    ${escapeHtml(c.title)}
                </li>
            `).join('');
        }

        // Load a specific case
        async function loadCase(caseId) {
            try {
                const response = await fetch(`api/case_messages.php?case_id=${caseId}`);
                const data = await response.json();
                
                if (data.success) {
                    currentCaseId = caseId;
                    chatHistory = [];
                    
                    // Clear UI
                    const messages = messagesArea.querySelectorAll('.message, .loading-indicator, .error-message');
                    messages.forEach(msg => msg.remove());
                    
                    if (data.messages.length === 0) {
                        welcomeState.style.display = 'flex';
                    } else {
                        welcomeState.style.display = 'none';
                        
                        // Render messages
                        data.messages.forEach(msg => {
                            const role = msg.role === 'ai' ? 'assistant' : 'user';
                            addMessageToUI(role, msg.content);
                            chatHistory.push({ role, content: msg.content });
                        });
                    }
                    
                    // Update case list active state
                    renderCaseList();
                    chatInput.focus();
                }
            } catch (error) {
                console.error('Load case error:', error);
                showError('Failed to load case.');
            }
        }

        // Escape HTML for safe rendering
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // Load cases on page load
        loadCases();

        // Send message function
        async function sendMessage() {
            const message = chatInput.value.trim();
            if (!message || isLoading) return;

            // Hide welcome state
            welcomeState.style.display = 'none';

            // Add user message to UI
            addMessageToUI('user', message);
            chatInput.value = '';
            chatInput.style.height = 'auto';

            // Add to history
            chatHistory.push({ role: 'user', content: message });

            // Show loading
            isLoading = true;
            updateInputState();
            const loadingEl = showLoading();

            try {
                // Create case if none exists
                if (!currentCaseId) {
                    const caseRes = await fetch('api/case_create.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ title: 'New Case' })
                    });
                    const caseData = await caseRes.json();
                    if (caseData.success) {
                        currentCaseId = caseData.case_id;
                    }
                }

                const response = await fetch('chat_handler.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: message,
                        case_id: currentCaseId,
                        history: chatHistory.slice(0, -1)
                    })
                });

                const data = await response.json();
                
                // Remove loading indicator
                loadingEl.remove();

                if (data.success) {
                    // Add AI response to UI
                    addMessageToUI('assistant', data.message);
                    // Add to history
                    chatHistory.push({ role: 'assistant', content: data.message });
                    // Refresh case list (title may have updated)
                    loadCases();
                } else {
                    showError(data.error || 'Failed to get response. Please try again.');
                }

            } catch (error) {
                loadingEl.remove();
                showError('Network error. Please check your connection and try again.');
                console.error('Chat error:', error);
            }

            isLoading = false;
            updateInputState();
            chatInput.focus();
        }

        // Add message to UI
        function addMessageToUI(role, content) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${role}`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            
            if (role === 'assistant') {
                // Render markdown for AI responses
                contentDiv.innerHTML = marked.parse(content);
            } else {
                // Plain text for user messages
                contentDiv.textContent = content;
            }
            
            messageDiv.appendChild(contentDiv);
            messagesArea.appendChild(messageDiv);
            
            // Scroll to bottom
            scrollToBottom();
        }

        // Show loading indicator
        function showLoading() {
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'loading-indicator';
            loadingDiv.innerHTML = `
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
            `;
            messagesArea.appendChild(loadingDiv);
            scrollToBottom();
            return loadingDiv;
        }

        // Show error message
        function showError(message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            messagesArea.appendChild(errorDiv);
            scrollToBottom();
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                errorDiv.remove();
            }, 5000);
        }

        // Update input state based on loading
        function updateInputState() {
            chatInput.disabled = isLoading;
            sendBtn.disabled = isLoading;
        }

        // Scroll to bottom of messages
        function scrollToBottom() {
            messagesArea.scrollTop = messagesArea.scrollHeight;
        }

        // PDF Upload Handler
        const pdfInput = document.getElementById('pdfInput');
        const uploadBtn = document.getElementById('uploadBtn');

        pdfInput.addEventListener('change', async function(e) {
            const file = e.target.files[0];
            if (!file) return;

            if (file.type !== 'application/pdf') {
                showError('Please select a PDF file.');
                return;
            }

            // Ensure we have a case
            if (!currentCaseId) {
                const caseRes = await fetch('api/case_create.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: 'Document Analysis' })
                });
                const caseData = await caseRes.json();
                if (caseData.success) {
                    currentCaseId = caseData.case_id;
                    loadCases();
                }
            }

            // Hide welcome state
            welcomeState.style.display = 'none';

            // Show upload progress
            uploadBtn.classList.add('uploading');
            addMessageToUI('user', `📄 Uploading: ${file.name}`);
            const loadingEl = showLoading();

            try {
                // Upload the PDF
                const formData = new FormData();
                formData.append('pdf', file);
                formData.append('case_id', currentCaseId);

                const uploadRes = await fetch('api/upload_pdf.php', {
                    method: 'POST',
                    body: formData
                });

                const uploadData = await uploadRes.json();

                if (!uploadData.success) {
                    loadingEl.remove();
                    showError(uploadData.error || 'Upload failed');
                    uploadBtn.classList.remove('uploading');
                    return;
                }

                // Update loading message
                loadingEl.querySelector('.loading-dot:first-child').style.background = '#4caf50';

                // Request summarization
                const summaryRes = await fetch('api/summarize.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        filename: uploadData.filename,
                        case_id: currentCaseId
                    })
                });

                const summaryData = await summaryRes.json();
                loadingEl.remove();

                if (summaryData.success) {
                    addMessageToUI('assistant', '📄 **Document Summary:**\n\n' + summaryData.summary);
                    chatHistory.push({ role: 'assistant', content: summaryData.summary });
                    loadCases(); // Refresh case list
                } else {
                    addMessageToUI('assistant', `✅ Document uploaded successfully: **${file.name}**\n\n_Text extraction ${uploadData.text_extracted ? 'completed' : 'not available'}. You can ask questions about this document._`);
                }

            } catch (error) {
                loadingEl.remove();
                showError('Upload failed. Please try again.');
                console.error('Upload error:', error);
            }

            uploadBtn.classList.remove('uploading');
            pdfInput.value = ''; // Reset file input
        });
    </script>

</body>
</html>