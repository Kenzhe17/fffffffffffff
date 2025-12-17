import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = "your_supabase_url"
const SUPABASE_ANON_KEY = "your_supabase_anon_key"

// Supabase client singleton for browser
let supabaseClient = null

function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  }
  return supabaseClient
}

// Auth helpers
async function getCurrentUser() {
  const client = getSupabaseClient()
  const {
    data: { user },
    error,
  } = await client.auth.getUser()
  return { user, error }
}

async function signUp(email, password, fullName) {
  const client = getSupabaseClient()
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        is_admin: email === "adminsync17@gmail.com",
      },
    },
  })
  return { data, error }
}

async function signIn(email, password) {
  const client = getSupabaseClient()
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

async function signOut() {
  const client = getSupabaseClient()
  const { error } = await client.auth.signOut()
  return { error }
}

async function getProfile(userId) {
  const client = getSupabaseClient()
  const { data, error } = await client.from("profiles").select("*").eq("id", userId).single()
  return { data, error }
}
