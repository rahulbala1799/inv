# Vercel Environment Variables Setup

## Required Environment Variables

You need to set these environment variables in your Vercel project:

### 1. Go to Vercel Dashboard
- Visit: https://vercel.com/dashboard
- Select your project: **inv**
- Go to **Settings** → **Environment Variables**

### 2. Add These Variables

#### `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://mgzalgpueyfotjnvgvzz.supabase.co`
- **Environment**: Production, Preview, Development (select all)
- **Description**: Your Supabase project URL

#### `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Get this from Supabase Dashboard
  - Go to: https://supabase.com/dashboard/project/mgzalgpueyfotjnvgvzz/settings/api
  - Copy the **anon/public** key (starts with `eyJ...`)
- **Environment**: Production, Preview, Development (select all)
- **Description**: Supabase anonymous/public key (used for client-side and server-side with RLS)

### 3. Optional (Only for Local Admin Scripts)

#### `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: `sb_secret_RMVHdXEue0G0jbjsBcHq7Q_3VYbDRlH`
- **Environment**: Only add if you need to run admin scripts
- **⚠️ WARNING**: Never use this in API routes or server actions. Only for local migrations/seeding.

## How to Get Your Anon Key

1. Go to: https://supabase.com/dashboard/project/mgzalgpueyfotjnvgvzz/settings/api
2. Under **Project API keys**, find **anon public**
3. Click the copy icon to copy the key
4. Paste it into Vercel environment variables

## After Adding Variables

1. **Redeploy** your Vercel project:
   - Go to **Deployments** tab
   - Click the **⋯** menu on the latest deployment
   - Select **Redeploy**

2. Or push a new commit to trigger automatic deployment

## Local Development Setup

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://mgzalgpueyfotjnvgvzz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Get your anon key from: https://supabase.com/dashboard/project/mgzalgpueyfotjnvgvzz/settings/api

## Verify Setup

After setting up:
1. Visit your Vercel deployment URL
2. Try signing up for a new account
3. You should be redirected to `/app` after successful signup
4. You should be able to create an organization

## Troubleshooting

### Auth not working?
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set correctly
- Verify the keys in Supabase Dashboard match what you entered
- Check Vercel deployment logs for errors

### RLS errors?
- Make sure you're using the **anon key**, not the service role key
- Verify RLS policies are enabled in Supabase (they should be from migrations)
