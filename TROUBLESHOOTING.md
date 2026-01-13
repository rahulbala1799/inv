# Troubleshooting Guide

## RLS Policy Error: "new row violates row-level security policy"

### Common Causes:

1. **Email Not Confirmed**: Supabase may require email confirmation before users can create organizations
2. **Session Expired**: User session might have expired after page refresh
3. **Auth Context Missing**: The auth.uid() might not be available in the RLS context

### Solutions:

#### Option 1: Disable Email Confirmation (For Testing)

1. Go to: https://supabase.com/dashboard/project/mgzalgpueyfotjnvgvzz/auth/providers
2. Click on **Email** provider
3. Under **Email Auth**, toggle off **"Confirm email"**
4. Click **Save**

This allows users to use the app immediately after signup without email confirmation.

#### Option 2: Ensure Email is Confirmed

If you want to keep email confirmation:
1. Users must click the verification link in their email
2. After verification, they can create organizations

#### Option 3: Check Session

If the error persists:
1. Sign out completely
2. Clear browser cookies for your domain
3. Sign in again
4. Try creating an organization

### Verify RLS Policies Are Applied

Run this in Supabase SQL Editor to check:

```sql
-- Check if policies exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'organizations';
```

You should see:
- "Users can view organizations they belong to" (SELECT)
- "Authenticated users can create organizations" (INSERT)

### Test the Policy

You can test if auth.uid() is working:

```sql
-- This should return your user ID if you're logged in
SELECT auth.uid();
```

If it returns NULL, the session isn't being read correctly.

## Still Having Issues?

1. Check Supabase logs: https://supabase.com/dashboard/project/mgzalgpueyfotjnvgvzz/logs/explorer
2. Look for errors related to RLS or auth
3. Verify your environment variables are set correctly in Vercel
4. Try signing out and back in
