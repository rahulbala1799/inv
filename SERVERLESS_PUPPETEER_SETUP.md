# Serverless Puppeteer Setup

## Issue Fixed

The error "Could not find Chrome" occurs in serverless environments (Vercel, AWS Lambda) because Puppeteer can't download Chrome automatically.

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

The code automatically works in serverless environments:
- ✅ Vercel - Automatically detected and uses Chromium
- ✅ AWS Lambda - Automatically detected and uses Chromium
- ✅ Other serverless platforms - Should work if they set environment variables

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
- The code should automatically use `@sparticuz/chromium`
- If it still fails, check that `@sparticuz/chromium` is installed
- Verify environment variables are set correctly

### Error: "Chromium executable not found"

1. Check that `@sparticuz/chromium` is in `package.json`
2. Verify the package is installed: `npm list @sparticuz/chromium`
3. Check serverless environment variables are set

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
