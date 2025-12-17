import { createClient } from "@supabase/supabase-js"

const supabaseConfig = {
  url: "https://rfvquepefupnjkwgkofg.supabase.co",
  anonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmdnF1ZXBlZnVwbmprd2drb2ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3ODczNDgsImV4cCI6MjA3NzM2MzM0OH0.UJJiRTyhVta9WwIL2QOdryacmAqZIuZNq9hsQcAaFvs",
}

let supabaseClient = null

function getSupabase() {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseConfig.url, supabaseConfig.anonKey)
  }
  return supabaseClient
}

async function signUp(email, password, fullName = "") {
  const client = getSupabase()
  const isAdmin = email === "adminsync17@gmail.com"

  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        is_admin: isAdmin,
      },
    },
  })

  return { data, error }
}

async function signIn(email, password) {
  const client = getSupabase()
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

async function signOut() {
  const client = getSupabase()
  const { error } = await client.auth.signOut()
  return { error }
}

async function getCurrentUser() {
  const client = getSupabase()
  const {
    data: { user },
    error,
  } = await client.auth.getUser()
  return { user, error }
}

async function getProfile(userId) {
  const client = getSupabase()
  const { data, error } = await client.from("profiles").select("*").eq("id", userId).single()
  return { data, error }
}

async function getAllRooms() {
  const client = getSupabase()
  const { data, error } = await client
    .from("rooms")
    .select("*")
    .order("block", { ascending: true })
    .order("floor", { ascending: true })
    .order("room_number", { ascending: true })
  return { data, error }
}

async function getRoomSchedules(roomId = null, dayOfWeek = null) {
  const client = getSupabase()
  let query = client.from("room_schedules").select("*, rooms(*)")

  if (roomId) {
    query = query.eq("room_id", roomId)
  }

  if (dayOfWeek) {
    query = query.eq("day_of_week", dayOfWeek)
  }

  const { data, error } = await query
  return { data, error }
}

async function updateRoomSchedule(roomId, dayOfWeek, timeSlot, isAvailable) {
  const client = getSupabase()
  const userId = localStorage.getItem("userId") || localStorage.getItem("adminId")

  const { data, error } = await client.from("room_schedules").upsert(
    {
      room_id: roomId,
      day_of_week: dayOfWeek,
      time_slot: timeSlot,
      is_available: isAvailable,
      updated_by: userId,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "room_id,day_of_week,time_slot",
    },
  )

  return { data, error }
}

async function initializeSampleRoomSchedules() {
  const client = getSupabase()
  const userId = localStorage.getItem("userId") || localStorage.getItem("adminId")

  // Get all rooms
  const { data: rooms, error: roomsError } = await getAllRooms()
  if (roomsError) return { error: roomsError }

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const timeSlots = [
    "08:30-09:20",
    "09:30-10:20",
    "10:30-11:20",
    "11:30-12:20",
    "12:30-13:20",
    "13:30-14:20",
    "14:30-15:20",
    "15:30-16:20",
    "16:30-17:20",
  ]

  const schedules = []
  rooms.forEach((room) => {
    weekDays.forEach((day) => {
      timeSlots.forEach((slot) => {
        schedules.push({
          room_id: room.id,
          day_of_week: day,
          time_slot: slot,
          is_available: Math.random() > 0.5,
          updated_by: userId,
          updated_at: new Date().toISOString(),
        })
      })
    })
  })

  const { data, error } = await client.from("room_schedules").upsert(schedules, {
    onConflict: "room_id,day_of_week,time_slot",
  })

  return { data, error }
}

async function getLostFoundItems(type = null, category = null, status = "active") {
  const client = getSupabase()
  let query = client.from("lost_found_items").select("*").order("created_at", { ascending: false })

  if (type) {
    query = query.eq("type", type)
  }

  if (category && category !== "all") {
    query = query.eq("category", category)
  }

  if (status) {
    query = query.eq("status", status)
  }

  const { data, error } = await query
  return { data, error }
}

async function createLostFoundItem(item) {
  const client = getSupabase()
  const userId = localStorage.getItem("userId")

  const { data, error } = await client
    .from("lost_found_items")
    .insert({
      ...item,
      created_by: userId,
      created_at: new Date().toISOString(),
    })
    .select()

  return { data, error }
}

async function updateLostFoundItem(id, updates) {
  const client = getSupabase()
  const { data, error } = await client.from("lost_found_items").update(updates).eq("id", id).select()

  return { data, error }
}

async function deleteLostFoundItem(id) {
  const client = getSupabase()
  const { data, error } = await client.from("lost_found_items").delete().eq("id", id)

  return { data, error }
}

async function getAnnouncements() {
  const client = getSupabase()
  const { data, error } = await client
    .from("announcements")
    .select("*, profiles(email, full_name)")
    .order("created_at", { ascending: false })

  return { data, error }
}

async function createAnnouncement(announcement) {
  const client = getSupabase()
  const userId = localStorage.getItem("userId") || localStorage.getItem("adminId")

  const { data, error } = await client
    .from("announcements")
    .insert({
      ...announcement,
      created_by: userId,
      created_at: new Date().toISOString(),
    })
    .select()

  return { data, error }
}

async function deleteAnnouncement(id) {
  const client = getSupabase()
  const { data, error } = await client.from("announcements").delete().eq("id", id)

  return { data, error }
}
