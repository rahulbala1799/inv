# Puppeteer Browser Launch Troubleshooting

## Error: "Failed to launch the browser process"

This error occurs when Puppeteer cannot find or launch Chrome/Chromium. Here are solutions based on your environment:

---

## 🖥️ Local Development Solutions

### Solution 1: Install Chrome via Puppeteer (Recommended)

```bash
npx puppeteer browsers install chrome
```

This installs Chrome in Puppeteer's cache directory and should work automatically.

### Solution 2: Use System Chrome

If you have Chrome installed system-wide, Puppeteer should find it automatically. Common locations:

- **macOS**: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
- **Linux**: `/usr/bin/google-chrome` or `/usr/bin/chromium-browser`
- **Windows**: `C:\Program Files\Google\Chrome\Application\chrome.exe`

### Solution 3: Set Explicit Chrome Path

If Chrome is installed in a non-standard location, set the environment variable:

```bash
# macOS/Linux
export PUPPETEER_EXECUTABLE_PATH="/path/to/chrome"

# Windows (PowerShell)
$env:PUPPETEER_EXECUTABLE_PATH="C:\path\to\chrome.exe"

# Or add to .env.local file
PUPPETEER_EXECUTABLE_PATH=/path/to/chrome
```

### Solution 4: Install Chromium System-Wide

**macOS (Homebrew):**
```bash
brew install chromium
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install chromium-browser
```

**Linux (Fedora):**
```bash
sudo dnf install chromium
```

---

## ☁️ Serverless/Vercel Solutions

### Solution 1: Set CHROMIUM_REMOTE_EXEC_PATH (Recommended for Vercel)

Vercel's file system is read-only, so Chromium cannot be extracted locally. You must use a remote Chromium binary.

#### Step 1: Add Environment Variable in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name**: `CHROMIUM_REMOTE_EXEC_PATH`
   - **Value**: `https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar`
   - **Environment**: Select all (Production, Preview, Development)

#### Step 2: Redeploy

After setting the environment variable, redeploy your application:

```bash
# Trigger a new deployment
git commit --allow-empty -m "Trigger redeploy for Chromium"
git push
```

Or redeploy from Vercel dashboard.

### Solution 2: Verify Package Installation

Ensure `@sparticuz/chromium-min` is installed:

```bash
npm install @sparticuz/chromium-min
```

Check `package.json`:
```json
{
  "dependencies": {
    "@sparticuz/chromium-min": "^133.0.0",
    "puppeteer-core": "^24.35.0"
  }
}
```

### Solution 3: Use Alternative Chromium Binary

If the default URL doesn't work, you can host your own:

1. Download Chromium from [Sparticuz releases](https://github.com/Sparticuz/chromium/releases)
2. Upload to a public storage (AWS S3, Cloudflare R2, etc.)
3. Set `CHROMIUM_REMOTE_EXEC_PATH` to your hosted URL

---

## 🔍 Debugging Steps

### 1. Check Environment

```bash
# Check if running in serverless
echo $VERCEL  # Should output "1" on Vercel

# Check Node version
node --version

# Check installed packages
npm list @sparticuz/chromium-min puppeteer-core
```

### 2. Check Logs

Look for these log messages in your server logs:

- `"Using remote Chromium binary from: ..."` - Good! Using remote binary
- `"No CHROMIUM_REMOTE_EXEC_PATH set, trying default extraction..."` - May fail on Vercel
- `"Local development: Attempting to find Chrome/Chromium automatically..."` - Local dev mode

### 3. Test Locally First

Before deploying to serverless, test locally:

```bash
# Install Chrome
npx puppeteer browsers install chrome

# Run your app
npm run dev

# Try generating a PDF
# Should work if Chrome is found
```

---

## 📋 Quick Checklist

### For Local Development:
- [ ] Run `npx puppeteer browsers install chrome`
- [ ] Or ensure Chrome is installed system-wide
- [ ] Or set `PUPPETEER_EXECUTABLE_PATH` environment variable
- [ ] Verify Chrome path is correct
- [ ] Check Node.js version (should be >= 18)

### For Vercel/Serverless:
- [ ] Install `@sparticuz/chromium-min` package
- [ ] Set `CHROMIUM_REMOTE_EXEC_PATH` environment variable in Vercel
- [ ] Use the correct Chromium version URL (v133.0.0)
- [ ] Redeploy after setting environment variable
- [ ] Check Vercel function logs for errors

---

## 🚨 Common Error Messages

### "Could not find Chrome"
**Solution**: Install Chrome or set `PUPPETEER_EXECUTABLE_PATH`

### "The input directory does not exist" (Vercel)
**Solution**: Set `CHROMIUM_REMOTE_EXEC_PATH` environment variable

### "chromium.executablePath is not a function"
**Solution**: Reinstall `@sparticuz/chromium-min`: `npm install @sparticuz/chromium-min@latest`

### "Failed to launch the browser process: Code: null"
**Solution**: 
- Local: Install Chrome via `npx puppeteer browsers install chrome`
- Serverless: Set `CHROMIUM_REMOTE_EXEC_PATH` environment variable

---

## 📚 Additional Resources

- [Puppeteer Troubleshooting](https://pptr.dev/troubleshooting)
- [Sparticuz Chromium Releases](https://github.com/Sparticuz/chromium/releases)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## 💡 Pro Tips

1. **Always test locally first** before deploying to serverless
2. **Use the cached browser instance** (`generatePdfFromHtmlCached`) for better performance
3. **Monitor function logs** in Vercel to see detailed error messages
4. **Keep Chromium version updated** - check for newer releases periodically
5. **Use remote Chromium binary** on Vercel - it's more reliable than local extraction

---

## Still Having Issues?

If none of these solutions work:

1. Check the full error message in your server logs
2. Verify all environment variables are set correctly
3. Try a fresh install: `rm -rf node_modules package-lock.json && npm install`
4. Check if there are any Node.js version conflicts
5. Review the [Puppeteer troubleshooting guide](https://pptr.dev/troubleshooting)
