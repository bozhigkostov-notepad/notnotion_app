import React, { useState, useEffect, useRef } from 'react';
import { Plus, ChevronRight, ChevronDown, FileText, Trash2, Search, Menu, X, Download, Upload, Lock } from 'lucide-react';

// Fixed encryption key for the app (in production, this should be more secure)
const APP_ENCRYPTION_KEY = 'notion-app-secure-key-2024-v1-do-not-share';

const EMOJI_CATEGORIES = {
  'Smileys': ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓'],
  'Animals': ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄'],
  'Food': ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🫓', '🥪', '🥙', '🧆', '🌮', '🌯', '🫔', '🥗', '🥘', '🫕', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜'],
  'Activities': ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛼', '🛷', '⛸', '🥌', '🎿', '⛷', '🏂', '🪂', '🏋', '🤼', '🤸', '🤺', '⛹', '🤾', '🏌', '🏇', '🧘', '🏊', '🤽', '🚣', '🧗', '🚴', '🚵', '🎪', '🎭', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🪘', '🎷', '🎺', '🪗', '🎸', '🪕', '🎻', '🎲', '♟', '🎯', '🎳', '🎮', '🎰', '🧩'],
  'Travel': ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🦯', '🦽', '🦼', '🛴', '🚲', '🛵', '🏍', '🛺', '🚨', '🚔', '🚍', '🚘', '🚖', '🚡', '🚠', '🚟', '🚃', '🚋', '🚞', '🚝', '🚄', '🚅', '🚈', '🚂', '🚆', '🚇', '🚊', '🚉', '✈', '🛫', '🛬', '🛩', '💺', '🛰', '🚀', '🛸', '🚁', '🛶', '⛵', '🚤', '🛥', '🛳', '⛴', '🚢', '⚓'],
  'Objects': ['⌚', '📱', '📲', '💻', '⌨', '🖥', '🖨', '🖱', '🖲', '🕹', '🗜', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽', '🎞', '📞', '☎', '📟', '📠', '📺', '📻', '🎙', '🎚', '🎛', '🧭', '⏱', '⏲', '⏰', '🕰', '⌛', '⏳', '📡', '🔋', '🔌', '💡', '🔦', '🕯', '🪔', '🧯', '🛢', '💸', '💵', '💴', '💶', '💷', '🪙', '💰', '💳', '🧾', '💎', '⚖', '🪜', '🧰', '🪛', '🔧', '🔨', '⚒', '🛠', '⛏', '🪚', '🔩', '⚙', '🪤', '🧱', '⛓', '🧲', '🔫', '💣', '🧨', '🪓', '🔪', '🗡', '⚔', '🛡', '🚬', '⚰', '🪦', '⚱', '🏺', '🔮', '📿', '🧿', '💈', '⚗', '🔭', '🔬', '🕳', '🩹', '🩺', '💊', '💉', '🩸', '🧬', '🦠', '🧫', '🧪', '🌡', '🧹', '🪠', '🧺', '🧻', '🚽', '🚰', '🚿', '🛁', '🛀', '🧼', '🪥', '🪒', '🧽', '🪣', '🧴', '🛎', '🔑', '🗝', '🚪', '🪑', '🛋', '🛏', '🛌', '🧸', '🪆', '🖼', '🪞', '🪟', '🛍', '🎁', '🎈', '🎏', '🎀', '🪄', '🪅', '🎊', '🎉', '🎎', '🏮', '🎐', '🧧', '✉', '📩', '📨', '📧', '💌', '📥', '📤', '📦', '🏷', '🪧', '📪', '📫', '📬', '📭', '📮', '📯', '📜', '📃', '📄', '📑', '🧾', '📊', '📈', '📉', '🗒', '🗓', '📆', '📅', '🗑', '📇', '🗃', '🗳', '🗄', '📋', '📁', '📂', '🗂', '🗞', '📰', '📓', '📔', '📒', '📕', '📗', '📘', '📙', '📚', '📖', '🔖', '🧷', '🔗', '📎', '🖇', '📐', '📏', '🧮', '📌', '📍', '✂', '🖊', '🖋', '✒', '🖌', '🖍', '📝', '✏', '🔍', '🔎', '🔏', '🔐', '🔒', '🔓'],
  'Symbols': ['❤', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮', '✝', '☪', '🕉', '☸', '✡', '🔯', '🕎', '☯', '☦', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛', '🉑', '☢', '☣', '📴', '📳', '🈶', '🈚', '🈸', '🈺', '🈷', '✴', '🆚', '💮', '🉐', '㊙', '㊗', '🈴', '🈵', '🈹', '🈲', '🅰', '🅱', '🆎', '🆑', '🅾', '🆘', '❌', '⭕', '🛑', '⛔', '📛', '🚫', '💯', '💢', '♨', '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '🚭', '❗', '❕', '❓', '❔', '‼', '⁉', '🔅', '🔆', '〽', '⚠', '🚸', '🔱', '⚜', '🔰', '♻', '✅', '🈯', '💹', '❇', '✳', '❎', '🌐', '💠', 'Ⓜ', '🌀', '💤', '🏧', '🚾', '♿', '🅿', '🛗', '🈳', '🈂', '🛂', '🛃', '🛄', '🛅', '🚹', '🚺', '🚼', '⚧', '🚻', '🚮', '🎦', '📶', '🈁', '🔣', 'ℹ', '🔤', '🔡', '🔠', '🆖', '🆗', '🆙', '🆒', '🆕', '🆓', '0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟', '🔢', '#⃣', '*⃣', '⏏', '▶', '⏸', '⏯', '⏹', '⏺', '⏭', '⏮', '⏩', '⏪', '⏫', '⏬', '◀', '🔼', '🔽', '➡', '⬅', '⬆', '⬇', '↗', '↘', '↙', '↖', '↕', '↔', '↪', '↩', '⤴', '⤵', '🔀', '🔁', '🔂', '🔄', '🔃', '🎵', '🎶', '➕', '➖', '➗', '✖', '♾', '💲', '💱', '™', '©', '®', '〰', '➰', '➿', '🔚', '🔙', '🔛', '🔝', '🔜', '✔', '☑', '🔘', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚫', '⚪', '🟤', '🔺', '🔻', '🔸', '🔹', '🔶', '🔷', '🔳', '🔲', '▪', '▫', '◾', '◽', '◼', '◻', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '⬛', '⬜', '🟫', '🔈', '🔇', '🔉', '🔊', '🔔', '🔕', '📣', '📢', '👁‍🗨', '💬', '💭', '🗯', '♠', '♣', '♥', '♦', '🃏', '🎴', '🀄', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛', '🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧'],
};

export default function NotionApp() {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiPickerFor, setEmojiPickerFor] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [exportStatus, setExportStatus] = useState('');
  const [importStatus, setImportStatus] = useState('');
  const editorRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const exportModalRef = useRef(null);
  const importModalRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load pages from memory storage on mount
  useEffect(() => {
    const loadPages = async () => {
      try {
        const result = await window.storage.get('notion-pages');
        if (result && result.value) {
          const loadedPages = JSON.parse(result.value);
          setPages(loadedPages);
          if (loadedPages.length > 0) {
            setCurrentPage(loadedPages[0].id);
          }
        }
      } catch (error) {
        console.log('No existing pages found, starting fresh');
      }
    };
    loadPages();
  }, []);

  // Save pages to memory storage whenever they change
  useEffect(() => {
    if (pages.length > 0) {
      const savePages = async () => {
        try {
          await window.storage.set('notion-pages', JSON.stringify(pages));
        } catch (error) {
          console.error('Failed to save pages:', error);
        }
      };
      savePages();
    }
  }, [pages]);

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
      if (exportModalRef.current && !exportModalRef.current.contains(e.target)) {
        setShowExportModal(false);
        setExportStatus('');
      }
      if (importModalRef.current && !importModalRef.current.contains(e.target)) {
        setShowImportModal(false);
        setImportStatus('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Encryption function with fixed app key
  const encryptData = async (data) => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const passwordBuffer = encoder.encode(APP_ENCRYPTION_KEY);
    
    // Create a key from fixed password
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );
    
    const salt = crypto.getRandomValues(new Uint8Array(16));
    
    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    );
    
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const encryptedBuffer = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      dataBuffer
    );
    
    // Combine salt, iv, and encrypted data
    const resultBuffer = new Uint8Array(salt.length + iv.length + encryptedBuffer.byteLength);
    resultBuffer.set(salt, 0);
    resultBuffer.set(iv, salt.length);
    resultBuffer.set(new Uint8Array(encryptedBuffer), salt.length + iv.length);
    
    // Convert to base64
    return btoa(String.fromCharCode(...resultBuffer));
  };

  // Decryption function with fixed app key
  const decryptData = async (encryptedData) => {
    try {
      const encoder = new TextEncoder();
      const passwordBuffer = encoder.encode(APP_ENCRYPTION_KEY);
      
      // Convert from base64
      const encryptedBuffer = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
      
      // Extract salt, iv, and encrypted data
      const salt = encryptedBuffer.slice(0, 16);
      const iv = encryptedBuffer.slice(16, 28);
      const data = encryptedBuffer.slice(28);
      
      // Create a key from fixed password
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      );
      
      const key = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: salt,
          iterations: 100000,
          hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
      );
      
      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        data
      );
      
      const decoder = new TextDecoder();
      return decoder.decode(decryptedBuffer);
    } catch (error) {
      throw new Error('Decryption failed. File may be corrupted or invalid.');
    }
  };

  const handleExport = async () => {
    setExportStatus('Preparing export...');
    
    try {
      const exportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        pages: pages
      };
      
      const jsonString = JSON.stringify(exportData, null, 2);
      
      setExportStatus('Encrypting...');
      const encryptedData = await encryptData(jsonString);
      
      setExportStatus('Downloading...');
      
      // Create and download file
      const blob = new Blob([encryptedData], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'notes-export-encrypted.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setExportStatus('Export complete! 🔒');
      setTimeout(() => {
        setShowExportModal(false);
        setExportStatus('');
      }, 2000);
      
    } catch (error) {
      console.error('Export failed:', error);
      setExportStatus('Export failed. Please try again.');
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImportStatus('Reading file...');

    try {
      const fileContent = await file.text();
      
      setImportStatus('Decrypting...');
      const decryptedData = await decryptData(fileContent);
      
      setImportStatus('Importing notes...');
      const importedData = JSON.parse(decryptedData);
      
      if (!importedData.pages || !Array.isArray(importedData.pages)) {
        throw new Error('Invalid file format');
      }
      
      setPages(importedData.pages);
      if (importedData.pages.length > 0) {
        setCurrentPage(importedData.pages[0].id);
      }
      
      setImportStatus(`Import complete! 🎉 Imported ${importedData.pages.length} pages.`);
      setTimeout(() => {
        setShowImportModal(false);
        setImportStatus('');
      }, 2000);
      
    } catch (error) {
      console.error('Import failed:', error);
      setImportStatus('Import failed. Please check the file and try again.');
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const createNewPage = (parentId = null) => {
    const newPage = {
      id: Date.now().toString(),
      title: 'Untitled',
      content: '',
      icon: '📄',
      parentId,
      children: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setPages(prev => {
      if (parentId) {
        return prev.map(page => 
          page.id === parentId 
            ? { ...page, children: [...page.children, newPage.id] }
            : page
        ).concat(newPage);
      }
      return [...prev, newPage];
    });

    setCurrentPage(newPage.id);
  };

  const handleEmojiSelect = (emoji) => {
    if (emojiPickerFor) {
      updatePage(emojiPickerFor, { icon: emoji });
    }
    setShowEmojiPicker(false);
    setEmojiPickerFor(null);
  };

  const deletePage = (pageId) => {
    const pageToDelete = pages.find(p => p.id === pageId);
    if (!pageToDelete) return;

    const childrenToDelete = new Set();
    const findChildren = (id) => {
      const page = pages.find(p => p.id === id);
      if (page && page.children) {
        page.children.forEach(childId => {
          childrenToDelete.add(childId);
          findChildren(childId);
        });
      }
    };
    findChildren(pageId);

    setPages(prev => {
      const filtered = prev.filter(p => p.id !== pageId && !childrenToDelete.has(p.id));
      
      if (pageToDelete.parentId) {
        return filtered.map(p => 
          p.id === pageToDelete.parentId
            ? { ...p, children: p.children.filter(id => id !== pageId) }
            : p
        );
      }
      
      return filtered;
    });

    if (currentPage === pageId) {
      const remaining = pages.filter(p => p.id !== pageId && !childrenToDelete.has(p.id));
      setCurrentPage(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const updatePage = (pageId, updates) => {
    setPages(prev => prev.map(page => 
      page.id === pageId 
        ? { ...page, ...updates, updatedAt: new Date().toISOString() }
        : page
    ));
  };

  const filteredPages = pages.filter(page => 
    !searchQuery || page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentPageData = pages.find(p => p.id === currentPage);

  return (
    <div className="flex h-screen bg-white text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 border-r border-gray-200 flex flex-col overflow-hidden`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Notes</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 border-b border-gray-200">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <PageTree
            pages={filteredPages.filter(p => !p.parentId)}
            allPages={pages}
            currentPage={currentPage}
            onSelectPage={setCurrentPage}
            onDeletePage={deletePage}
            onCreateChild={createNewPage}
            onEmojiClick={(pageId) => {
              setEmojiPickerFor(pageId);
              setShowEmojiPicker(true);
            }}
          />
        </div>

        <div className="p-3 border-t border-gray-200 space-y-2">
          <button
            onClick={() => setShowImportModal(true)}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors border border-green-200"
          >
            <Upload className="w-4 h-4" />
            Import Notes
          </button>
          
          <button
            onClick={() => setShowExportModal(true)}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-blue-200"
          >
            <Download className="w-4 h-4" />
            Export Notes
          </button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-400">or</span>
            </div>
          </div>
          
          <button
            onClick={() => createNewPage()}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Page
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Bar */}
        <div className="h-14 border-b border-gray-200 flex items-center px-6 gap-4">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          
          {currentPageData && (
            <div className="flex-1 flex items-center gap-3">
              <button
                onClick={() => {
                  setEmojiPickerFor(currentPage);
                  setShowEmojiPicker(true);
                }}
                className="text-2xl hover:bg-gray-100 rounded px-2 py-1 transition-colors"
              >
                {currentPageData.icon || '📄'}
              </button>
              <input
                type="text"
                value={currentPageData.title}
                onChange={(e) => updatePage(currentPage, { title: e.target.value })}
                className="flex-1 text-xl font-semibold bg-transparent border-none outline-none focus:ring-0"
                placeholder="Untitled"
              />
            </div>
          )}
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-y-auto">
          {currentPageData ? (
            <div className="max-w-4xl mx-auto px-6 py-12">
              <textarea
                ref={editorRef}
                value={currentPageData.content}
                onChange={(e) => updatePage(currentPage, { content: e.target.value })}
                placeholder="Start writing..."
                className="w-full text-base leading-relaxed resize-none border-none outline-none focus:ring-0 placeholder-gray-400"
                style={{ 
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  minHeight: 'calc(100vh - 300px)',
                  height: 'auto'
                }}
                rows={1}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h2 className="text-xl font-semibold text-gray-400 mb-2">No page selected</h2>
                <p className="text-gray-400 mb-6">Create a new page to get started</p>
                <button
                  onClick={() => createNewPage()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Page
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div
            ref={emojiPickerRef}
            className="fixed bg-white rounded-lg shadow-xl border border-gray-200 z-50 w-96 max-h-96 overflow-hidden flex flex-col"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="p-3 border-b border-gray-200">
              <h3 className="font-semibold text-sm">Choose an emoji</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              {Object.entries(EMOJI_CATEGORIES).map(([category, emojis]) => (
                <div key={category} className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-500 mb-2">{category}</h4>
                  <div className="grid grid-cols-8 gap-2">
                    {emojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleEmojiSelect(emoji)}
                        className="text-2xl hover:bg-gray-100 rounded p-1 transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export Modal */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              ref={exportModalRef}
              className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Export All Notes
                </h2>
              </div>
              
              <div className="p-6 space-y-4">
                <p className="text-sm text-gray-600">
                  Export all your notes to an encrypted file. Your data will be automatically encrypted with the app's security key.
                </p>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md flex items-center gap-2 text-sm text-blue-700">
                  <Lock className="w-4 h-4 flex-shrink-0" />
                  <span>All exports are automatically encrypted 🔒</span>
                </div>

                {exportStatus && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-700">
                    {exportStatus}
                  </div>
                )}
              </div>
              
              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => {
                    setShowExportModal(false);
                    setExportStatus('');
                  }}
                  className="flex-1 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  disabled={exportStatus && !exportStatus.includes('complete')}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Import Modal */}
        {showImportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              ref={importModalRef}
              className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Import Notes
                </h2>
              </div>
              
              <div className="p-6 space-y-4">
                <p className="text-sm text-gray-600">
                  Import notes from a previously exported file. The file will be automatically decrypted.
                </p>
                
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-700">
                  ⚠️ Warning: This will replace all current notes!
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt"
                  onChange={handleImport}
                  className="hidden"
                />

                {importStatus && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-700">
                    {importStatus}
                  </div>
                )}
              </div>
              
              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => {
                    setShowImportModal(false);
                    setImportStatus('');
                  }}
                  className="flex-1 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={importStatus && !importStatus.includes('complete')}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Choose File
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PageTree({ pages, allPages, currentPage, onSelectPage, onDeletePage, onCreateChild, onEmojiClick, level = 0 }) {
  const [expandedPages, setExpandedPages] = useState(new Set());

  const toggleExpand = (pageId) => {
    setExpandedPages(prev => {
      const next = new Set(prev);
      if (next.has(pageId)) {
        next.delete(pageId);
      } else {
        next.add(pageId);
      }
      return next;
    });
  };

  return (
    <div className="space-y-0.5">
      {pages.map(page => {
        const hasChildren = page.children && page.children.length > 0;
        const isExpanded = expandedPages.has(page.id);
        const isActive = currentPage === page.id;

        return (
          <div key={page.id}>
            <div
              className={`group flex items-center gap-1 px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
                isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
              style={{ paddingLeft: `${level * 12 + 8}px` }}
            >
              {hasChildren ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(page.id);
                  }}
                  className="p-0.5 hover:bg-gray-200 rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                  )}
                </button>
              ) : (
                <div className="w-4" />
              )}

              <div
                onClick={() => onSelectPage(page.id)}
                className="flex-1 flex items-center gap-2 min-w-0"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEmojiClick(page.id);
                  }}
                  className="text-base hover:bg-gray-200 rounded flex-shrink-0 transition-colors"
                >
                  {page.icon || '📄'}
                </button>
                <span className="text-sm truncate">{page.title}</span>
              </div>

              <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCreateChild(page.id);
                  }}
                  className="p-1 hover:bg-gray-200 rounded"
                  title="Add subpage"
                >
                  <Plus className="w-3.5 h-3.5 text-gray-600" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePage(page.id);
                  }}
                  className="p-1 hover:bg-red-100 rounded"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-600" />
                </button>
              </div>
            </div>

            {hasChildren && isExpanded && (
              <PageTree
                pages={allPages.filter(p => page.children.includes(p.id))}
                allPages={allPages}
                currentPage={currentPage}
                onSelectPage={onSelectPage}
                onDeletePage={onDeletePage}
                onCreateChild={onCreateChild}
                onEmojiClick={onEmojiClick}
                level={level + 1}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
