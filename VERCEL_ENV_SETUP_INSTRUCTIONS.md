# How to Set Environment Variables in Vercel

## Quick Setup for Chromium

### Step 1: Go to Vercel Dashboard

1. Open your browser and go to: https://vercel.com/dashboard
2. Sign in to your account
3. Find and click on your project (the "inv" project)

### Step 2: Open Environment Variables

1. In your project, click on **Settings** tab (top navigation)
2. In the left sidebar, click on **Environment Variables**

### Step 3: Add Chromium Environment Variable

1. Click **Add New** button (or **Add** if you have no variables yet)
2. Fill in the form:

   **Variable Name:**
   ```
   CHROMIUM_REMOTE_EXEC_PATH
   ```

   **Value (copy this exactly):**
   ```
   https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar
   ```

   **Environments to apply to:**
   - ☑️ Production
   - ☑️ Preview
   - ☑️ Development

3. Click **Save**

### Step 4: Redeploy

After adding the environment variable:

**Option A: Automatic (trigger a new deployment)**
```bash
git commit --allow-empty -m "trigger: Redeploy for Chromium env var"
git push origin main
```

**Option B: Manual (redeploy from Vercel dashboard)**
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **⋯** (three dots) menu
4. Click **Redeploy**
5. Click **Redeploy** again to confirm

### Step 5: Test

After redeployment completes (~2-3 minutes):
1. Go to your app (invozify.com)
2. Navigate to an invoice
3. Click "Generate PDF"
4. PDF should now generate successfully!

## Visual Guide

```
Vercel Dashboard
    ↓
Your Project
    ↓
Settings Tab
    ↓
Environment Variables (left sidebar)
    ↓
Add New Button
    ↓
Fill in:
- Name: CHROMIUM_REMOTE_EXEC_PATH
- Value: https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar
- Environments: All (Production, Preview, Development)
    ↓
Save
    ↓
Redeploy (either push new commit or manual redeploy)
    ↓
Wait for deployment to complete
    ↓
Test PDF generation
```

## Troubleshooting

### Can't Find Environment Variables?

1. Make sure you're in the right project
2. Click **Settings** (not Deployments or Analytics)
3. Look in the left sidebar for **Environment Variables**

### Variable Not Taking Effect?

1. Make sure you saved the variable
2. Ensure all environments are checked (Production, Preview, Development)
3. Redeploy the application (environment variables only apply to new deployments)

### Still Getting Errors?

1. Double-check the URL is exactly:
   ```
   https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar
   ```
2. Make sure there are no extra spaces
3. Wait for deployment to fully complete before testing

## Alternative Chromium Binary URLs

If the above URL doesn't work, try these alternatives:

```
https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar
```

Or check the latest releases: https://github.com/Sparticuz/chromium/releases

---

**Time Required**: 2-3 minutes  
**Difficulty**: Easy  
**Result**: PDF generation will work in Vercel
