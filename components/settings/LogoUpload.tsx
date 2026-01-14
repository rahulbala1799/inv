'use client'

import { useState, useRef, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

interface LogoUploadProps {
  orgId: string
  currentLogoUrl?: string | null
  onUploadComplete: (logoPath: string) => void
  logoPathInputId?: string
}

export default function LogoUpload({ orgId, currentLogoUrl, onUploadComplete, logoPathInputId = 'logo_storage_path' }: LogoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [logoUrl, setLogoUrlState] = useState<string | null>(currentLogoUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize preview from currentLogoUrl
  useEffect(() => {
    if (currentLogoUrl) {
      setLogoUrlState(currentLogoUrl)
    }
  }, [currentLogoUrl])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB')
      return
    }

    setUploading(true)

    try {
      const supabase = createClient()
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to Supabase Storage
      // Path format: {orgId}/logo.{ext} (bucket name 'logos' is not included in path)
      const fileExt = file.name.split('.').pop()
      const filePath = `${orgId}/logo.${fileExt}`

      // Delete old logo if exists (get path from storage)
      const { data: existingFiles } = await supabase.storage
        .from('logos')
        .list(orgId)
      if (existingFiles && existingFiles.length > 0) {
        const oldPaths = existingFiles.map(f => `${orgId}/${f.name}`)
        await supabase.storage.from('logos').remove(oldPaths)
      }

      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) {
        throw uploadError
      }

      // Update preview with data URL (already set above)
      // Callback with storage path (not public URL)
      onUploadComplete(filePath)
      
      // Update hidden input field
      const hiddenInput = document.getElementById(logoPathInputId) as HTMLInputElement
      if (hiddenInput) {
        hiddenInput.value = filePath
      }
      
      // Update logo URL for display
      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(filePath)
      setLogoUrlState(publicUrl)
    } catch (error) {
      console.error('Error uploading logo:', error)
      alert('Failed to upload logo. Please try again.')
      setPreview(null)
      setLogoUrlState(currentLogoUrl || null)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async () => {
    if (!logoUrl) return

    try {
      const supabase = createClient()
      // List and remove all files in org folder
      const { data: existingFiles } = await supabase.storage
        .from('logos')
        .list(orgId)
      if (existingFiles && existingFiles.length > 0) {
        const oldPaths = existingFiles.map(f => `${orgId}/${f.name}`)
        await supabase.storage.from('logos').remove(oldPaths)
      }
      setPreview(null)
      setLogoUrlState(null)
      onUploadComplete('')
      
      // Update hidden input field
      const hiddenInput = document.getElementById(logoPathInputId) as HTMLInputElement
      if (hiddenInput) {
        hiddenInput.value = ''
      }
    } catch (error) {
      console.error('Error removing logo:', error)
      alert('Failed to remove logo. Please try again.')
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Company Logo
      </label>
      
      <div className="flex items-start gap-4">
        {(logoUrl || preview) && (
          <div className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
            <Image
              src={preview || logoUrl || ''}
              alt="Company logo"
              fill
              className="object-contain"
              sizes="128px"
              unoptimized={preview?.startsWith('data:')}
              onError={(e) => {
                console.error('Failed to load logo image:', e)
              }}
            />
          </div>
        )}
        
        <div className="flex-1 space-y-2">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : (logoUrl || preview) ? 'Change Logo' : 'Upload Logo'}
            </button>
          </div>
          
          {(logoUrl || preview) && (
            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              className="px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Remove Logo
            </button>
          )}
          
          <p className="text-xs text-gray-500">
            Recommended: Square image, max 5MB. PNG, JPG, or SVG format.
          </p>
        </div>
      </div>
    </div>
  )
}
