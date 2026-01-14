# Vercel Chromium Setup - Quick Fix

## The Problem

Vercel's serverless functions have a read-only file system, so Chromium cannot be extracted locally. The error "The input directory does not exist" occurs because Chromium tries to extract to a directory that doesn't exist or isn't writable.

## The Solution

Use a **hosted Chromium binary** by setting the `CHROMIUM_REMOTE_EXEC_PATH` environment variable.

## Quick Setup (5 minutes)

### Step 1: Get Chromium Binary URL

**Option A: Use Public Release (Easiest)**
```
https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar
```

**Option B: Host Your Own**
1. Download from: https://github.com/Sparticuz/chromium/releases
2. Upload to public storage (S3, Cloudflare R2, etc.)
3. Get the public URL

### Step 2: Set Environment Variable in Vercel

1. Go to your Vercel project: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Key**: `CHROMIUM_REMOTE_EXEC_PATH`
   - **Value**: `https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar`
   - **Environment**: Select all (Production, Preview, Development)
6. Click **Save**

### Step 3: Redeploy

1. Go to **Deployments** tab
2. Click the **⋯** menu on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic deployment

## Verify It Works

After redeploying:
1. Go to an invoice in your app
2. Click "Generate PDF"
3. PDF should generate successfully

## Alternative: Use Different PDF Service

If hosting Chromium is not feasible, consider:
- **PDF Service API**: Use a third-party PDF generation service
- **React PDF**: Revert to `@react-pdf/renderer` (but with design limitations)
- **Playwright**: Alternative to Puppeteer (may have similar issues)

## Troubleshooting

### Still Getting Errors?

1. **Check Environment Variable:**
   - Verify `CHROMIUM_REMOTE_EXEC_PATH` is set in Vercel
   - Check it's available in the correct environment (Production/Preview)

2. **Check URL Accessibility:**
   - Ensure the Chromium binary URL is publicly accessible
   - Test the URL in a browser (should download a .tar file)

3. **Check Logs:**
   - Go to Vercel dashboard → Your deployment → Functions tab
   - Check the PDF generation function logs
   - Look for specific error messages

4. **Version Compatibility:**
   - Ensure Chromium version matches `@sparticuz/chromium-min` version
   - Current version: `133.0.0`

## Current Configuration

- **Package**: `@sparticuz/chromium-min@133.0.0`
- **Puppeteer**: `puppeteer-core`
- **Environment Detection**: Automatic (checks for `VERCEL` env var)
- **Fallback**: Clear error message with setup instructions

---

**Status**: ✅ Code updated, requires environment variable setup  
**Next Step**: Set `CHROMIUM_REMOTE_EXEC_PATH` in Vercel and redeploy
