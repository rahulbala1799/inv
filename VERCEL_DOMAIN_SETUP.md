# Vercel Domain Setup Guide - GoDaddy

## Error: DNSZoneExternalNameserver

This error occurs when you're trying to add DNS records in Vercel, but your domain's nameservers are still pointing to GoDaddy instead of Vercel.

## Solution: Choose One Approach

You have **two options** to connect your GoDaddy domain to Vercel:

---

## Option 1: Use Vercel's Nameservers (Recommended)

This allows Vercel to manage all DNS records automatically.

### Steps:

1. **In Vercel Dashboard:**
   - Go to your project → **Settings** → **Domains**
   - Add your domain (e.g., `yourdomain.com`)
   - Vercel will show you the nameservers you need to use (usually 4 nameservers like `ns1.vercel-dns.com`, etc.)

2. **In GoDaddy:**
   - Log in to your GoDaddy account
   - Go to **My Products** → **Domains**
   - Click on your domain name
   - Scroll down to **Additional Settings** → **Manage DNS**
   - Find **Nameservers** section
   - Click **Change**
   - Select **Custom** (instead of "GoDaddy Nameservers")
   - Enter the 4 nameservers that Vercel provided
   - Click **Save**

3. **Wait for Propagation:**
   - DNS changes can take 24-48 hours to propagate
   - Usually works within a few hours
   - You can check propagation status at: https://www.whatsmydns.net/

4. **Verify in Vercel:**
   - Once nameservers are updated, go back to Vercel
   - The domain should automatically verify
   - Vercel will now manage all DNS records

---

## Option 2: Keep GoDaddy Nameservers (Manual DNS Records)

If you prefer to keep using GoDaddy's nameservers, you need to add DNS records manually in GoDaddy.

### Steps:

1. **In Vercel Dashboard:**
   - Go to your project → **Settings** → **Domains**
   - Add your domain
   - Vercel will show you the DNS records you need to add
   - You'll typically need:
     - **A Record**: `@` pointing to Vercel's IP (e.g., `76.76.21.21`)
     - **CNAME Record**: `www` pointing to `cname.vercel-dns.com`
     - Or **ALIAS/ANAME Record** for root domain (if GoDaddy supports it)

2. **In GoDaddy:**
   - Go to **My Products** → **Domains**
   - Click on your domain
   - Go to **Additional Settings** → **Manage DNS**
   - **Delete** any existing A records for `@` and `www`
   - **Add** the DNS records that Vercel provided:
     - **Type**: A
     - **Name**: `@` (or leave blank for root domain)
     - **Value**: The IP address Vercel provided
     - **TTL**: 600 (or default)
   
   - **Add CNAME for www:**
     - **Type**: CNAME
     - **Name**: `www`
     - **Value**: `cname.vercel-dns.com` (or what Vercel provided)
     - **TTL**: 600

3. **Wait for Propagation:**
   - DNS changes can take 24-48 hours
   - Usually works within a few hours

4. **Verify in Vercel:**
   - Go back to Vercel dashboard
   - The domain should verify once DNS propagates

---

## Which Option Should You Choose?

### Use Option 1 (Vercel Nameservers) if:
- ✅ You want Vercel to manage all DNS automatically
- ✅ You don't need other DNS records managed elsewhere
- ✅ You want the simplest setup
- ✅ You're okay with Vercel managing your DNS

### Use Option 2 (GoDaddy Nameservers) if:
- ✅ You have other services using DNS records (email, subdomains, etc.)
- ✅ You want to keep DNS management in GoDaddy
- ✅ You need more control over DNS records
- ✅ You're using GoDaddy email or other services

---

## Troubleshooting

### Error Still Appears?

1. **Check Nameservers:**
   - Use https://www.whatsmydns.net/#NS/yourdomain.com
   - Verify nameservers are actually changed

2. **Wait Longer:**
   - DNS propagation can take up to 48 hours
   - Be patient if you just changed nameservers

3. **Clear DNS Cache:**
   - On your computer: `sudo dscacheutil -flushcache` (Mac) or `ipconfig /flushdns` (Windows)
   - Or use a different network/device to test

4. **Check Vercel Status:**
   - Go to Vercel Dashboard → Domains
   - Check if there are any error messages
   - Look for verification status

### Domain Not Working After Setup?

1. **Verify DNS Records:**
   - Use https://www.whatsmydns.net/#A/yourdomain.com
   - Check if A records are pointing to Vercel

2. **Check Vercel Configuration:**
   - Ensure domain is added in Vercel project settings
   - Check if SSL certificate is being generated (can take a few minutes)

3. **Test with curl:**
   ```bash
   curl -I https://yourdomain.com
   ```
   Should return Vercel headers

---

## Quick Reference

### Vercel Nameservers (Example - Use what Vercel shows you):
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### Common DNS Records for Vercel:
- **A Record**: `@` → `76.76.21.21` (or IP Vercel provides)
- **CNAME**: `www` → `cname.vercel-dns.com`

---

## Need Help?

- Vercel DNS Docs: https://vercel.com/docs/concepts/projects/domains
- GoDaddy DNS Help: https://www.godaddy.com/help/manage-dns-680
- Check DNS propagation: https://www.whatsmydns.net/
