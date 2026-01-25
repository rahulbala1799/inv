# Vercel Logs Checker Setup

This guide explains how to set up automatic Vercel log checking when you trigger a git deployment.

## Overview

The system includes:
1. **GitHub Actions Workflow** - Automatically checks Vercel logs after each deployment
2. **Node.js Script** - Can be run manually to check logs anytime

## Setup Instructions

### Step 1: Get Your Vercel API Token

1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Click **Create Token**
3. Give it a name (e.g., "GitHub Actions Log Checker")
4. Set expiration (or leave as "No expiration")
5. Click **Create Token**
6. **Copy the token** - you won't be able to see it again!

### Step 2: Get Your Vercel Project and Organization IDs

#### Option A: From Vercel Dashboard (Easiest)

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Open your project settings
3. The **Project ID** is shown in the project settings
4. The **Organization ID** can be found in the URL or team settings

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login
vercel login

# Link your project (this will show the IDs)
vercel link
```

### Step 3: Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

   **VERCEL_TOKEN**
   - Name: `VERCEL_TOKEN`
   - Value: Your Vercel API token from Step 1

   **VERCEL_PROJECT_ID** (Optional - will auto-detect if not set)
   - Name: `VERCEL_PROJECT_ID`
   - Value: Your Vercel project ID

   **VERCEL_ORG_ID** (Optional - will auto-detect if not set)
   - Name: `VERCEL_ORG_ID`
   - Value: Your Vercel organization/team ID

### Step 4: Test the Setup

#### Test GitHub Actions Workflow

1. Push a commit to your `main` or `master` branch:
   ```bash
   git add .
   git commit -m "test: trigger log checker"
   git push origin main
   ```

2. Go to your GitHub repository → **Actions** tab
3. You should see "Check Vercel Logs on Deployment" workflow running
4. Click on it to see the logs being checked

#### Test Locally (Optional)

You can also run the script locally:

```bash
# Set environment variables
export VERCEL_TOKEN="your_token_here"
export VERCEL_PROJECT_ID="your_project_id"  # Optional
export VERCEL_ORG_ID="your_org_id"          # Optional

# Run the script
npm run check-logs
```

Or use the script directly:

```bash
node scripts/check-vercel-logs.js
```

## How It Works

### GitHub Actions Workflow

The workflow (`.github/workflows/check-vercel-logs.yml`) will:

1. **Trigger** on:
   - Push to `main` or `master` branch
   - Manual trigger via GitHub Actions UI

2. **Wait** 30 seconds for Vercel deployment to start

3. **Fetch** the latest deployment logs from Vercel API

4. **Display** logs in the GitHub Actions output

5. **Save** logs as an artifact (downloadable for 7 days)

6. **Fail** the workflow if errors are detected in logs

### Manual Script

The script (`scripts/check-vercel-logs.js`) can:

- Find your project automatically (by name "inv")
- Get the latest deployment
- Fetch and display logs
- Save logs to a file
- Exit with error code if issues found

## Usage Examples

### Check Logs After Deployment

The workflow runs automatically, but you can also:

1. **Manually trigger** from GitHub Actions tab
2. **Run locally** after pushing:
   ```bash
   npm run check-logs
   ```

### View Saved Logs

Logs are saved as:
- **GitHub Actions**: Download from Actions → Artifacts
- **Local**: `vercel-logs-{timestamp}.txt` in project root

## Troubleshooting

### "VERCEL_TOKEN environment variable is required"

- Make sure you've added `VERCEL_TOKEN` to GitHub Secrets
- For local runs, export it: `export VERCEL_TOKEN="your_token"`

### "Project not found"

- The script looks for a project named "inv" by default
- Set `VERCEL_PROJECT_ID` secret to specify exact project
- Or rename your Vercel project to "inv"

### "No deployments found"

- Wait a bit longer - deployment might still be starting
- Check Vercel dashboard to see if deployment exists
- The script waits 30 seconds, but you might need more time

### "No logs available yet"

- Deployment might still be in progress
- Vercel logs are streamed, so early checks might be empty
- Try running the script again after a minute

### Workflow Not Triggering

- Make sure you're pushing to `main` or `master` branch
- Check that the workflow file is in `.github/workflows/`
- Verify the file is committed and pushed to the repository

## Advanced Configuration

### Custom Wait Time

Edit `.github/workflows/check-vercel-logs.yml`:

```yaml
- name: Wait for Vercel deployment
  run: |
    echo "Waiting 60 seconds for Vercel deployment to start..."
    sleep 60  # Change from 30 to 60 seconds
```

### Check Specific Deployment

Modify the script to accept deployment ID as argument:

```bash
node scripts/check-vercel-logs.js --deployment-id <deployment-id>
```

### Filter Logs

The script can be modified to filter for specific log types:
- Errors only
- Build logs only
- Function logs only

## Security Notes

- **Never commit** your Vercel token to the repository
- Always use GitHub Secrets for sensitive data
- Tokens should have minimal required permissions
- Consider token expiration for better security

## Support

If you encounter issues:

1. Check GitHub Actions logs for detailed error messages
2. Verify all secrets are set correctly
3. Test the script locally first
4. Check Vercel API status: https://www.vercel-status.com/
