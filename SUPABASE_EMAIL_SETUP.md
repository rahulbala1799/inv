# Supabase Email Configuration Guide

## Issue: Email Verification Links Pointing to Localhost

The email verification links need to point to your production URL, not localhost.

## Solution: Configure Supabase Email Settings

### Step 1: Set Site URL in Supabase

1. Go to: https://supabase.com/dashboard/project/mgzalgpueyfotjnvgvzz/auth/url-configuration
2. Under **Site URL**, set your production URL:
   - **Production URL**: `https://inv-silk-omega.vercel.app`
   - Or your custom domain if you have one
3. Under **Redirect URLs**, add:
   - `https://inv-silk-omega.vercel.app/auth/callback`
   - `https://inv-silk-omega.vercel.app/**`
   - `http://localhost:3000/auth/callback` (for local development)
4. Click **Save**

### Step 2: Set Environment Variable in Vercel

Add the production URL as an environment variable:

1. Go to Vercel Dashboard → Project **inv** → Settings → Environment Variables
2. Add:
   - **Name**: `NEXT_PUBLIC_APP_URL`
   - **Value**: `https://inv-silk-omega.vercel.app`
   - **Environments**: Production, Preview, Development
3. Redeploy your project

**Note**: This has already been set via Vercel CLI. The variable is configured for all environments.

### Step 3: Create Custom Email Template

1. Go to: https://supabase.com/dashboard/project/mgzalgpueyfotjnvgvzz/auth/templates
2. Click on **Confirm signup** template
3. Replace the template with the custom template below
4. Click **Save**

## Custom Email Verification Template

Use this template for a professional, branded email:

### Subject:
```
Verify your Invoice App account
```

### Body (HTML):
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Account</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Invoice App</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">The Best Invoice App in the World</p>
  </div>
  
  <div style="background: #ffffff; padding: 40px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
    <h2 style="color: #1f2937; margin-top: 0; font-size: 24px;">Welcome! Verify Your Email</h2>
    
    <p style="color: #4b5563; font-size: 16px; margin: 20px 0;">
      Thank you for signing up for Invoice App! We're excited to have you on board.
    </p>
    
    <p style="color: #4b5563; font-size: 16px; margin: 20px 0;">
      To get started with your <strong>free 7-day trial</strong>, please verify your email address by clicking the button below:
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{ .ConfirmationURL }}" style="display: inline-block; background: #4f46e5; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(79, 70, 229, 0.3);">
        Verify Email Address
      </a>
    </div>
    
    <p style="color: #6b7280; font-size: 14px; margin: 30px 0 20px 0;">
      Or copy and paste this link into your browser:
    </p>
    <p style="color: #4f46e5; font-size: 12px; word-break: break-all; background: #f3f4f6; padding: 12px; border-radius: 6px; margin: 0;">
      {{ .ConfirmationURL }}
    </p>
    
    <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
        <strong>What's next?</strong>
      </p>
      <ul style="color: #6b7280; font-size: 14px; margin: 10px 0; padding-left: 20px;">
        <li>Create your first organization</li>
        <li>Add customers</li>
        <li>Start creating professional invoices</li>
        <li>Download PDFs instantly</li>
      </ul>
    </div>
    
    <p style="color: #9ca3af; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.
    </p>
  </div>
  
  <div style="text-align: center; margin-top: 20px; padding: 20px; color: #6b7280; font-size: 12px;">
    <p style="margin: 5px 0;">Invoice App - Just €5/month after your free trial</p>
    <p style="margin: 5px 0;">© 2024 Invoice App. All rights reserved.</p>
  </div>
</body>
</html>
```

### Plain Text Version:
```
Welcome to Invoice App!

Thank you for signing up! We're excited to have you on board.

To get started with your free 7-day trial, please verify your email address by clicking the link below:

{{ .ConfirmationURL }}

What's next?
- Create your first organization
- Add customers
- Start creating professional invoices
- Download PDFs instantly

This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.

---
Invoice App - Just €5/month after your free trial
© 2024 Invoice App. All rights reserved.
```

## Step 4: Test Email Verification

1. Sign up for a new account
2. Check your email
3. Click the verification link
4. You should be redirected to `/app` and logged in

## Additional Email Templates

You can also customize:
- **Magic Link** - For passwordless login
- **Change Email Address** - When users change their email
- **Reset Password** - For password resets

All templates are available at: https://supabase.com/dashboard/project/mgzalgpueyfotjnvgvzz/auth/templates

## Troubleshooting

### Links still pointing to localhost?
- Check that Site URL is set correctly in Supabase
- Verify `NEXT_PUBLIC_APP_URL` is set in Vercel
- Redeploy your Vercel project after adding the variable

### Emails not sending?
- Check Supabase Auth settings
- Verify email provider is configured
- Check Supabase logs for email delivery errors
