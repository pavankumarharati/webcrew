'use client'
import { useEffect } from 'react'
import { captureReferralFromURL } from '@/lib/referral'

export default function ReferralCapture() {
  useEffect(() => { captureReferralFromURL() }, [])
  return null
}
