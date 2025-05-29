# 🧩 Form Builder

A powerful drag-and-drop Form Builder that lets users visually design forms, configure field properties, preview forms in real-time, and generate shareable links for public use.

----
## ✨ Features

- 🖱️ Drag-and-drop interface to add and arrange form fields
- 🧾 Supported Fields: Text, Textarea, Dropdown, Checkbox, Date, Email, Phone
- ⚙️ Field Configuration: Label, Placeholder, Required, Help Text, Validation Rules
- 🔁 Field Reordering via drag
- 👀 Real-time form preview with validation
- 📱 Responsive Preview Modes: Desktop, Tablet, Mobile
- 🧩 Multi-step Forms with navigation and progress bar
- 💾 Save & Load templates (locally or via API)
- 🔗 Shareable Form Links (with localStorage or custom backend)
- 🛟 Auto-save
- 🌐 Accessibility (keyboard nav, ARIA)
- ⬇️ Export form as JSON

----
## 🚀 Getting Started

### 📦 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

### 🔧 Installation

1. **Clone the repository:**
   git clone https://github.com/venkatanaresh4285/project.git
   cd project

2. **Install dependencies:**
     npm install

3. **Run the app in development mode**
    npm run dev

    Visit http://localhost:5173 to open the app in your browser.
    Hot-reloads on file save.


# Folder Structure
src/
├── components/
│ ├── FormBuilder/ # Main form builder UI components (canvas, sidebar, preview)
│ ├── FormFields/ # Individual form fields (TextField, CheckboxField, DropdownField, etc.)
│ └── ui/ # Reusable UI components (buttons, cards, etc.)
├── contexts/ # React Context API providers (FormBuilderContext)
├── pages/ # Main pages (FormBuilderPage, FormFillPage, HomePage)
├── utils/ # Utility functions (helpers, storage, validation)
├── types/ # TypeScript type definitions
└── vite-env.d.ts # Vite environment typings

## Responsive Preview Modes
You can switch between Desktop / Tablet / Mobile views from the preview section in the builder to test responsiveness.
 
 

