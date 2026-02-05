# 📝 Notion-Inspired Note Taking App

A modern, minimalistic note-taking application inspired by Notion, built with React. Features nested pages, emoji icons, automatic encryption, and persistent storage.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.x-61dafb.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## ✨ Features

- **📄 Nested Pages** - Create unlimited parent and child pages with hierarchical organization
- **🎨 Custom Emoji Icons** - Personalize each page with hundreds of emoji options across 6 categories
- **🔍 Smart Search** - Search across all page titles and content instantly
- **💾 Persistent Storage** - All notes automatically saved using browser's persistent storage API
- **🔐 Encrypted Export/Import** - Securely backup and restore your notes with automatic AES-256-GCM encryption
- **🌳 Collapsible Tree Navigation** - Expandable/collapsible sidebar for easy navigation
- **📱 Responsive Design** - Clean, minimal interface that works on desktop and mobile
- **⚡ Real-time Auto-save** - Changes saved automatically as you type
- **🎯 Distraction-free Editor** - Simple, focused writing experience with auto-expanding textarea

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- Modern web browser with Web Crypto API support

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/bozhigkostov-notepad/notnotion_app.git
cd notion-note-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Required Dependencies**
```bash
npm install react react-dom lucide-react
```

4. **Start the development server**
```bash
npm start
# or
yarn start
```

5. **Open your browser**
Navigate to `http://localhost:3000`

## 📖 Usage Guide

### Creating Pages

1. Click the **"New Page"** button in the sidebar
2. A new untitled page will be created and selected
3. Click the page title to edit it
4. Start writing in the editor area

### Organizing with Nested Pages

1. Hover over any page in the sidebar
2. Click the **➕** (plus) icon to create a child page
3. Child pages appear indented under their parent
4. Click the **▶/▼** chevron to expand/collapse child pages

### Customizing Page Icons

1. Click on any page's emoji icon (📄 by default)
2. Browse through emoji categories:
   - 😀 Smileys
   - 🐶 Animals
   - 🍎 Food
   - ⚽ Activities
   - 🚗 Travel
   - ⌚ Objects
   - ❤️ Symbols
3. Click an emoji to set it as the page icon

### Searching Notes

1. Use the search bar at the top of the sidebar
2. Type any text to filter pages by title or content
3. Search is case-insensitive and updates in real-time

### Exporting Your Notes

1. Click **"Export Notes"** (blue button in sidebar)
2. Review the export confirmation modal
3. Click **"Export"**
4. Your notes will be downloaded as `notes-export-encrypted.txt`
5. All data is automatically encrypted with AES-256-GCM

### Importing Notes

1. Click **"Import Notes"** (green button in sidebar)
2. Read the warning about replacing current notes
3. Click **"Choose File"**
4. Select your previously exported `.txt` file
5. Notes will be automatically decrypted and loaded

### Deleting Pages

1. Hover over any page in the sidebar
2. Click the **🗑️** (trash) icon
3. The page and all its child pages will be deleted permanently

## 🔒 Security & Encryption

### Encryption Details

- **Algorithm**: AES-256-GCM (Advanced Encryption Standard)
- **Key Derivation**: PBKDF2 with 100,000 iterations and SHA-256
- **Automatic**: All exports are encrypted by default with app-level key
- **No Password Required**: Built-in encryption key ensures security without user management

### Data Storage

- **Local Storage**: All notes stored in browser's persistent storage
- **Privacy**: Data never leaves your device unless you export it
- **Persistence**: Notes survive browser restarts and tab closures
- **Isolation**: Each browser/device has independent storage

### Export File Format

Encrypted files contain:
```
[16 bytes salt][12 bytes IV][encrypted data]
```

Decrypted JSON structure:
```json
{
  "version": "1.0",
  "exportDate": "2024-02-05T12:00:00.000Z",
  "pages": [
    {
      "id": "1234567890",
      "title": "My Page",
      "content": "Page content here...",
      "icon": "📄",
      "parentId": null,
      "children": [],
      "createdAt": "2024-02-05T12:00:00.000Z",
      "updatedAt": "2024-02-05T12:00:00.000Z"
    }
  ]
}
```

## 🛠️ Technical Stack

### Core Technologies

- **React 18.x** - UI framework
- **Lucide React** - Icon library
- **Web Crypto API** - Encryption/decryption
- **Browser Storage API** - Persistent data storage

### Key Components

```
notion-app.jsx
├── NotionApp (Main Component)
│   ├── Sidebar
│   │   ├── Search Bar
│   │   ├── PageTree (Recursive)
│   │   ├── Import Button
│   │   ├── Export Button
│   │   └── New Page Button
│   ├── Editor Area
│   │   ├── Top Bar (Icon + Title)
│   │   └── Content Textarea
│   └── Modals
│       ├── Emoji Picker
│       ├── Export Modal
│       └── Import Modal
└── PageTree (Recursive Component)
```

### State Management

- **React Hooks**: `useState`, `useEffect`, `useRef`
- **Local State**: All data managed in component state
- **Persistent Storage**: Automatic sync to browser storage
- **No External Libraries**: Pure React state management

## 🎨 Customization

### Changing the Encryption Key

Edit the constant at the top of `notion-app.jsx`:

```javascript
const APP_ENCRYPTION_KEY = 'your-custom-secure-key-here';
```

⚠️ **Warning**: Changing the key will make previously exported files unreadable.

### Styling

The app uses Tailwind utility classes. To customize:

1. Modify className strings in components
2. Core colors:
   - Sidebar: Gray scale
   - Import: Green (`green-600`, `green-50`)
   - Export: Blue (`blue-600`, `blue-50`)
   - New Page: Gray (`gray-700`, `gray-100`)

### Adding More Emoji Categories

Edit the `EMOJI_CATEGORIES` object:

```javascript
const EMOJI_CATEGORIES = {
  'Category Name': ['🎉', '🎊', '🎈', ...],
  // Add more categories here
};
```

## 📋 Browser Compatibility

| Browser | Version | Supported |
|---------|---------|-----------|
| Chrome | 60+ | ✅ |
| Firefox | 57+ | ✅ |
| Safari | 11+ | ✅ |
| Edge | 79+ | ✅ |
| Opera | 47+ | ✅ |

**Requirements**:
- Web Crypto API support
- Local Storage API support
- ES6+ JavaScript support

## 🐛 Known Issues

1. **Storage Limits**: Browser storage is limited (typically 5-10MB)
2. **Mobile Sidebar**: Sidebar auto-collapses on small screens for better UX
3. **File Size**: Very large exports (1000+ pages) may take longer to encrypt/decrypt

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and formatting
- Add comments for complex logic
- Test all features before submitting PR
- Update README if adding new features

## 📝 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- Inspired by [Notion](https://notion.so)
- Icons by [Lucide](https://lucide.dev)
- Built with [React](https://react.dev)

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/bozhigkostov-notepad/notnotion_app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/bozhigkostov-notepad/notnotion_app/discussions)

---

**Made with ❤️ and React**

*Star ⭐ this repo if you find it useful!*
