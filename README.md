Angular Form Builder - Drag & Drop with TailwindCSS

Overview
This project is a dynamic Form Builder built with:

Angular 15+

Tailwind CSS

Angular CDK Drag-and-Drop

Features
Three-pane layout:

Field Groups (Create, Edit, Delete, Select)

Form Elements (Drag & Drop form fields)

Field Properties Panel (Edit properties like placeholder, required)

Functionalities:

Add/Remove form fields dynamically

Drag from "Elements" to "Field Groups"

Edit and Delete fields inside groups

Live Form Preview

Export form structure as JSON

Import JSON to rebuild the form

Local Storage Persistence

Structure
arduino
Copy
Edit
src/
├── app/
│   ├── models/
│   ├── services/
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.module.ts
├── tailwind.config.js
├── index.html
└── styles.css

Setup & Run Locally


Clone the repo:

bash
Copy
Edit
git clone <your-repo-link>
cd <project-folder>
Install dependencies:

bash
Copy
Edit
npm install
Run the project:

bash
Copy
Edit
ng serve
Visit: http://localhost:4200

Usage
Create a Field Group

Drag elements like Text, Dropdown into the selected group

Edit field properties

Live Preview the form

Export JSON to save the config

Import JSON to load a saved config

Export/Import JSON
Export: Click "Export JSON"

Import: Upload a JSON file with valid form group structure

Bonus
Fully responsive

TailwindCSS styled

Local storage save support

