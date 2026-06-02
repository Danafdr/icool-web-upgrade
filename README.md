# iCool Web Application & CRM Platform

A modernized web application and internal CRM platform for **iCool**, a professional HVAC and air conditioning service provider in Indonesia. This application serves as a high-converting company profile, a portfolio showcase, and an advanced AI-powered booking platform for clients ranging from households to multinational corporations.

## 🚀 Enterprise-Grade Tech Stack

- **Backend:** Laravel 11
- **Frontend:** React 18 with Inertia.js (SPA Architecture)
- **Database:** PostgreSQL (powered by Supabase Connection Pooling)
- **Artificial Intelligence:** Google Gemini AI API integration
- **Styling:** Tailwind CSS (v4) with deep dark-mode support
- **UI Components:** Custom glassmorphism design, Lucide Icons, and Radix UI primitives.

## ✨ Key Features

### 🏢 Customer Facing (Landing & Service Pages)
- **Modern UI/UX:** Responsive, dark-themed interface with smooth micro-animations and a premium "glass" aesthetic.
- **Dynamic Service Catalog:** Detailed landing pages for various HVAC services (Cleaning, Maintenance Contracts, Repairs, Installations).
- **Client Portfolio:** An interactive, filterable grid showcasing past projects across different industries.
- **Integrated Booking Engine:** Secure, multi-step contact forms linked directly to the cloud database.
- **Floating Communication:** Sticky WhatsApp integration for immediate real-time customer support routing to regional admins.

### 🔐 Internal Operations (Admin Dashboard)
- **Secure Lead Management:** Internal dashboard for managing customer inquiries, service requests, and technician assignments.
- **🤖 AI-Powered CSV/Excel Imports:** Built-in Gemini AI integration that automatically extracts and parses messy, unstructured client data from Excel files (names, phones, and physical addresses) and standardizes them into the database.
- **Automated Spam Filtering:** AI algorithms that automatically evaluate incoming web inquiries and classify them to prevent CRM clutter.
- **Real-Time Database Sync:** Hosted on Supabase for high availability, utilizing connection pooling for instantaneous data retrieval.

## 💻 Local Development Setup

To run this project locally:

1. **Clone the repository**
2. **Install PHP Dependencies:** `composer install`
3. **Install Node Dependencies:** `npm install`
4. **Environment Setup:** Copy `.env.example` to `.env` and populate with Supabase PostgreSQL and Gemini API credentials.
5. **Run Migrations:** `php artisan migrate`
6. **Start Dev Servers:** 
   - Backend: `php artisan serve`
   - Frontend: `npm run dev`

---
*Developed as a bespoke operational platform to modernize HVAC service delivery in Jabodetabek and beyond.*
