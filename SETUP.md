# Quick Setup Guide

## 1. Get Your Supabase Anon Key

1. Visit: https://supabase.com/dashboard/project/mgzalgpueyfotjnvgvzz/settings/api
2. Under **Project API keys**, copy the **anon public** key
3. It will look like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 2. Local Development

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://mgzalgpueyfotjnvgvzz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
```

Then run:
```bash
npm run dev
```

## 3. Vercel Deployment

### Add Environment Variables in Vercel:

1. Go to: https://vercel.com/dashboard
2. Select project: **inv**
3. Settings → Environment Variables
4. Add:

   **Variable**: `NEXT_PUBLIC_SUPABASE_URL`  
   **Value**: `https://mgzalgpueyfotjnvgvzz.supabase.co`  
   **Environments**: Production, Preview, Development

   **Variable**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
   **Value**: `[Your anon key from step 1]`  
   **Environments**: Production, Preview, Development

5. Redeploy your project

## 4. Test Auth

1. Visit your site
2. Click "Start Free 7-Day Trial"
3. Sign up with email/password
4. You should be redirected to create an organization

## Current Status

✅ Database migrations applied  
✅ Storage bucket created  
✅ RLS policies enabled  
✅ Auth pages ready  
⏳ Need to add environment variables in Vercel
