# Quick Fix for Vercel PDF Generation Error

## The Error
```
"Could not locate Chromium executable in serverless environment"
```

## The Fix (2 minutes)

### 1. Go to Vercel Dashboard
Open: https://vercel.com/dashboard

### 2. Select Your Project
Click on your "inv" project

### 3. Go to Settings → Environment Variables
- Click **Settings** tab at the top
- Click **Environment Variables** in left sidebar

### 4. Add This Variable

Click **Add New** and enter:

**Name:**
```
CHROMIUM_REMOTE_EXEC_PATH
```

**Value:**
```
https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar
```

**Environments:** Check all boxes
- ☑️ Production
- ☑️ Preview  
- ☑️ Development

Click **Save**

### 5. Redeploy

**Quick way:**
```bash
git commit --allow-empty -m "chore: trigger redeploy for env var"
git push origin main
```

Or manually in Vercel:
- Go to **Deployments** tab
- Click **⋯** on latest deployment
- Click **Redeploy**

### 6. Wait & Test

- Wait 2-3 minutes for deployment
- Go to your app
- Try generating a PDF
- Should work now! ✅

---

## Screenshots Guide

**Step 1: Vercel Dashboard**
- URL: vercel.com/dashboard
- Find your project in the list

**Step 2: Settings Tab**
- Click "Settings" at the top of project page

**Step 3: Environment Variables**
- Left sidebar → "Environment Variables"

**Step 4: Add Variable**
- Click "Add New" button
- Fill in Name, Value, Environments
- Click Save

**Step 5: Redeploy**
- Go to Deployments tab
- Redeploy latest deployment

---

**Expected Result:** PDF generation works without errors

**Time to Fix:** 2 minutes

**Difficulty:** ⭐ Very Easy
