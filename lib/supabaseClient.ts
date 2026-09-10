import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// NEXT_PUBLIC_* ถูกฝังตอน build — ถ้าไม่มีค่าใน Vercel ให้ตั้งใน Project Settings
// ใช้ placeholder ตอน build/prerender เพื่อไม่ให้ static generation พัง
const url = supabaseUrl || 'https://placeholder.supabase.co'
const anonKey = supabaseAnonKey || 'public-anon-key'

export const supabase = createClient(url, anonKey)
