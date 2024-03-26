import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://vbckrwxglmiisnucxlnf.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiY2tyd3hnbG1paXNudWN4bG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4Mzk5MzksImV4cCI6MjAyNjQxNTkzOX0.f7zlLjk-Z-qd1SrVpKmz-QXEzhnJdKh94i6IcgtF2Rg"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})