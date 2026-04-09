🖥️ Monis Studio: Pro Workspace Configurator
Monis Studio is a high-end, interactive workspace simulator that allows users to design, arrange, and rent their dream office setups in real-time. Built with a sleek "Apple-Style" aesthetic, the application focuses on precision, fluidity, and a seamless user experience.

✨ Key Features
🛠️ Dynamic Configuration Experience
Extensive Product Catalog: Choose from multiple desk models and ergonomic chair variants.

Modular Add-ons: Beyond office tech, users can add items from specialized categories: Coffee Station, Outdoor Gear, Relax Zone, and Garage Space.

Live Studio Canvas: Instant 2D top-down visualization that updates in real-time as items are added or swapped.

🕹️ Precision & Interactive Controls
Zero-Delay Drag & Drop: Optimized with GPU acceleration (translate3d) for buttery-smooth item movement without lag.

Multi-Select (Ctrl + Click): Select multiple assets simultaneously to move entire arrangement blocks as one unit.

Smart Select All: Instantly select every item on the canvas for rapid restructuring, accompanied by interactive UI notifications.

Dynamic Name Tags: Hover-sensitive labels that float beneath items for easy identification within complex setups.

📱 Premium & Responsive Design
Clean Apple-Style UI: Minimalist interface featuring glassmorphism effects, soft shadows, and a professional "Studio" grid background.

Fully Responsive: A seamless transition from a dual-column desktop layout to a stacked, mobile-optimized experience.

Persistent State: Item positions remain locked even when opening/closing the summary modal, ensuring no progress is lost during the "checkout" phase.

🚀 Business Process (Logic Compliance)
The application fully satisfies the following business requirements:

Desk Selection: At least 2 distinct desk options are available.

Chair Selection: At least 2 distinct ergonomic chair options are available.

Accessory Integration: Capability to add monitors, lamps, plants, and lifestyle equipment.

Visual Synchronization: The workspace preview updates instantly upon any state change.

Setup Summary: A dedicated checkout view providing a detailed breakdown of selected items and the total monthly rental cost.

🛠️ Tech Stack
Framework: Next.js 15+

Styling: Tailwind CSS v4

State Management: React Hooks (useState, useRef, useEffect)

Animations: Framer Motion-style CSS transitions & Tailwind Animate

Deployment: Vercel

💻 Getting Started
Clone the repository:

Bash
git clone https://github.com/yourusername/monis-workspace.git
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Launch the Studio: Open http://localhost:3000 in your browser.
