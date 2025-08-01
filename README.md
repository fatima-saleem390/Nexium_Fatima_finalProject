# Nexium — Final Project

**Nexium** is a modern web application built with **Next.js**, designed as my final project. It empowers job seekers with secure authentication, AI-powered resume customization, and a user-friendly dashboard to manage and track job applications easily.

---

## ✨ Features

- **AI Resume Tailoring:** Instantly adapt your resume to match any job description with smart AI suggestions.
- **Secure Login:** Passwordless authentication using magic links via Supabase.
- **Application Tracker:** Organize and monitor all your job applications in one place.

---

## 🚀 Tech Stack

- **Framework:** Next.js 15+
- **Styling:** Tailwind CSS
- **Backend:** Supabase (authentication & database)
- **Language:** TypeScript
- **Deployment:** Vercel (recommended)

---

## ⚙️ Getting Started

Follow these steps to set up and run the project locally:

### 1️⃣ Clone the repository

```bash
git clone https://github.com/fatima-saleem390/Nexium_Fatima_finalProject.git
cd Nexium_Fatima_finalProject
2️⃣ Install dependencies
bash
Copy
Edit
npm install
3️⃣ Set up environment variables
Create a .env.local file in the root directory and add your Supabase credentials:

env
Copy
Edit
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
4️⃣ Run the development server
bash
Copy
Edit
npm run dev
Open http://localhost:3000 in your browser to see the app.

🗂️ Project Structure
ruby
Copy
Edit
/
├── app/             # Next.js App Router directory
├── components/      # Reusable UI components
├── lib/             # Supabase client and helper functions
├── public/          # Static assets
├── styles/          # Global styles
├── .next/           # Next.js build output (ignored)
├── node_modules/    # Installed dependencies (ignored)
└── ...

📄 License
This project is for educational purposes only and not licensed for commercial use.

🤝 Author
Fatima Saleem
