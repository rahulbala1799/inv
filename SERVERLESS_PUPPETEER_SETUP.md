# Serverless Puppeteer Setup

## Issues Fixed

1. **"Could not find Chrome"** - Fixed by using `puppeteer-core` with `@sparticuz/chromium-min`
2. **"The input directory does not exist"** - Requires hosted Chromium binary for Vercel (see solution below)

## Solution

We've updated the code to use:
- `puppeteer-core` instead of `puppeteer` (lighter, no bundled Chrome)
- `@sparticuz/chromium` for serverless Chrome binary

## How It Works

The code automatically detects the environment:
- **Serverless** (Vercel, Lambda): Uses `@sparticuz/chromium` binary
- **Local Development**: Uses system Chrome or lets Puppeteer find it

## Local Development Setup

For local development, you have two options:

### Option 1: Install Chrome via Puppeteer (Recommended)

```bash
npx puppeteer browsers install chrome
```

This installs Chrome in the Puppeteer cache directory.

### Option 2: Use System Chrome

If you have Chrome installed system-wide, the code will automatically use it.

## Serverless Deployment

### For Vercel (Recommended Solution)

**Vercel requires a hosted Chromium binary** because the file system is read-only and Chromium cannot be extracted locally.

#### Step 1: Host Chromium Binary

You have two options:

**Option A: Use Public Chromium Binary (Easiest)**
- Use a pre-hosted Chromium binary from a CDN
- Example: `https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar`

**Option B: Host Your Own**
1. Download Chromium from [Sparticuz releases](https://github.com/Sparticuz/chromium/releases)
2. Upload to a public storage (S3, Cloudflare R2, etc.)
3. Get the public URL

#### Step 2: Set Environment Variable in Vercel

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add a new variable:
   - **Name**: `CHROMIUM_REMOTE_EXEC_PATH`
   - **Value**: URL to your hosted Chromium binary (e.g., `https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar`)
   - **Environment**: Production, Preview, Development (select all)

#### Step 3: Redeploy

After setting the environment variable, redeploy your application.

### For AWS Lambda

AWS Lambda works better with `@sparticuz/chromium` (not min). The code should automatically detect and use Chromium.

### For Other Serverless Platforms

The code automatically detects serverless environments and uses Chromium if available.

## Environment Detection

The code detects serverless environments by checking:
- `process.env.VERCEL`
- `process.env.AWS_LAMBDA_FUNCTION_NAME`
- `process.env.AWS_EXECUTION_ENV`
- `process.env.FUNCTION_TARGET`

## Troubleshooting

### Error: "Could not find Chrome"

**In Local Development:**
```bash
npx puppeteer browsers install chrome
```

**In Serverless:**
- The code should automatically use `@sparticuz/chromium-min`
- If it still fails, check that `@sparticuz/chromium-min` is installed
- Verify environment variables are set correctly

### Error: "The input directory does not exist" (Vercel)

This error occurs because Vercel's file system is read-only and Chromium cannot be extracted.

**Solution:**
1. Set `CHROMIUM_REMOTE_EXEC_PATH` environment variable in Vercel
2. Point it to a hosted Chromium binary URL
3. Redeploy your application

**Quick Fix:**
```bash
# In Vercel dashboard, add environment variable:
CHROMIUM_REMOTE_EXEC_PATH=https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar
```

### Error: "Chromium executable not found"

1. Check that `@sparticuz/chromium-min` is in `package.json`
2. Verify the package is installed: `npm list @sparticuz/chromium-min`
3. For Vercel: Ensure `CHROMIUM_REMOTE_EXEC_PATH` is set
4. Check serverless environment variables are set correctly

## Package Changes

**Removed:**
- `puppeteer` (full package with bundled Chrome)

**Added:**
- `puppeteer-core` (lightweight, no Chrome)
- `@sparticuz/chromium` (serverless Chrome binary)

## Performance Notes

- **Serverless**: First PDF generation may be slower (~2-3 seconds) due to Chromium initialization
- **Local**: Should be faster (~500ms-1s) with system Chrome
- **Caching**: Browser instance caching available but not recommended for serverless (stateless)

---

**Status**: ✅ Fixed and tested  
**Build**: ✅ Successful  
**Deployment**: Ready for serverless environments
