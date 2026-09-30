# 🌐 Permanent 24/7 Hosting Guide — Kehinde & Victor Wedding

This guide explains how to keep the wedding guest experience permanently online 24/7, even when your laptop is turned off or sleeping.

---

## Method 1: Local Machine Auto-Healing (Currently Active)

The application is currently running on your local machine with an auto-healing supervisor:
- **Public Guest Link:** Current Cloudflare tunnel link (kept active via supervisor)
- **Safe Updates:** Whenever you or the agent update code, run:
  ```bash
  npm run update-site
  ```
  This rebuilds the app and refreshes the server **without killing or changing the public tunnel URL**.
- **Data Persistence:** All RSVPs, gift bookings, wishes, and settings are saved automatically to `data/store.json` so no guest submission is ever lost during server updates or restarts.

> **Note:** With this method, your laptop must remain powered on and connected to the internet for guests to reach the site.

---

## Method 2: Permanent Cloud Hosting on Vercel (100% Free, Zero Sleep, Permanent URL)

For a wedding website where guests across the globe open the link at all hours, deploying to **Vercel** gives you:
- **A permanent URL that never changes:** e.g., `https://kehinde-victor-wedding.vercel.app` (or your own custom domain like `ayobamidele2026.com`)
- **100% uptime:** Works even when your computer is shut down, closed, or offline.
- **Zero cost:** Free on Vercel Hobby tier.

### Option A: Via GitHub (Recommended)
1. Initialize git and push the project to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Kehinde & Victor Wedding 2026"
   # Create a repository on github.com and push:
   git remote add origin https://github.com/<your-username>/kehinde-victor-wedding.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Add the Environment Variable:
   - `ADMIN_PASSCODE` = `ayobamidele2026`
5. Click **"Deploy"**.
6. Done! You will immediately receive a permanent, live HTTPS URL that never goes down.

### Option B: Via Vercel CLI
Run the following in the project directory:
```bash
npx vercel
```
Follow the interactive prompts to login and deploy in under 60 seconds.
